import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Plus, Layers, Image as ImageIcon, Wand2, Loader2, Sparkles, Check, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '../design-system';
import { UserStats } from '../lib/firebase';
import { LayerPanel } from './TemplateEditor/LayerPanel';
import { AlignmentToolbar } from './TemplateEditor/AlignmentToolbar';
import { PropertyPanel } from './TemplateEditor/PropertyPanel';
import { TemplateEngine } from '../lib/template-engine';
import { migrateToLayers } from '../lib/firebase';
import type { AnyLayer, TextLayer, TemplateDocument, LayerType } from '../data/template-schema';
import { useTemplatePlaceholders } from '../hooks/useTemplatePlaceholders';
import type { QRTool } from '../data/tools';

interface TemplateEditorProps {
  template: any;
  tool?: QRTool;
  formValues?: Record<string, string>;
  user: UserStats | null;
  onOpenPayModal: () => void;
  onBack: () => void;
}

export default function TemplateEditor({ 
  template, tool, formValues, user, onOpenPayModal, onBack 
}: TemplateEditorProps) {
  const [templateDoc, setTemplateDoc] = useState<TemplateDocument>(() => {
    if (template.layers) return template as TemplateDocument;
    return migrateToLayers(template);
  });

  const [sidebarTab, setSidebarTab] = useState<'layers' | 'assets' | 'ai'>('layers');
  const [registryAssets, setRegistryAssets] = useState<any>(null);

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [activeArtProfile, setActiveArtProfile] = useState<any>(null);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Batch Queue States
  const [batchCount, setBatchCount] = useState(5);
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  const handleBatchGenerate = async () => {
    if (!tool) return;
    setIsBatchGenerating(true);
    // Simulation for batch API call
    setTimeout(() => {
      setIsBatchGenerating(false);
      alert(`Successfully generated ${batchCount} templates for ${tool.name}. They are available in the templates library.`);
    }, 3000);
  };

  const handleGenerateAI = async () => {
    if (!tool) return;
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai-factory/suggest-styles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolData: tool,
          industry: 'tech' // We can expand this later
        })
      });
      const data = await res.json();
      if (data.suggestions) {
        setAiSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error(e);
    }
    setIsGeneratingAI(false);
  };

  const handleApplyArtProfile = (profile: any) => {
    setActiveArtProfile(profile);
    // In a full implementation, we'd update the QR code layer with these specific settings.
    // We are simulating this now by updating state.
  };

  useEffect(() => {
    fetch('/assets/registry.json')
      .then(r => r.json())
      .then(d => setRegistryAssets(d.assets))
      .catch(e => console.error(e));
  }, []);

  const handleApplyAsset = (asset: any) => {
    const id = `layer-${Date.now()}`;
    const newLayer = {
      id,
      type: asset.category === 'backgrounds' ? 'shape' : asset.type === 'svg' ? 'shape' : 'image',
      name: asset.name,
      visible: true,
      locked: false,
      opacity: 1,
      zIndex: templateDoc.layers.length * 10,
      blendMode: 'normal',
      x: 0, y: 0,
      width: asset.width || 100, height: asset.height || 100,
      rotation: 0,
    } as AnyLayer;

    if (asset.category === 'backgrounds') {
      newLayer.type = 'shape';
      (newLayer as any).fill = asset.path;
      (newLayer as any).width = templateDoc.canvasWidth;
      (newLayer as any).height = templateDoc.canvasHeight;
      newLayer.zIndex = 0;
    } else if (asset.type === 'svg') {
      newLayer.type = 'shape'; // Can also add svg handling in the engine
    }

    setTemplateDoc(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer],
    }));
    setSelectedLayerId(id);
    setSidebarTab('layers');
  };

  const placeholderValues = useTemplatePlaceholders(tool || null, formValues || {});
  const engineRef = useRef<TemplateEngine | null>(null);

  useEffect(() => {
    const engine = new TemplateEngine(templateDoc);
    engine.setPlaceholderValues(placeholderValues);
    engineRef.current = engine;
  }, [templateDoc, placeholderValues]);

  useEffect(() => {
    if (!engineRef.current || !canvasRef.current) return;
    
    const render = async () => {
      const canvas = await engineRef.current!.renderToCanvas(
        templateDoc.canvasWidth,
        templateDoc.canvasHeight,
        150
      );
      canvasRef.current!.innerHTML = '';
      canvasRef.current!.appendChild(canvas);
    };
    render();
  }, [templateDoc, placeholderValues]);

  const handleAddLayer = (type: LayerType) => {
    const id = `layer-${Date.now()}`;
    const newLayer = {
      id,
      type,
      name: `New ${type}`,
      visible: true,
      locked: false,
      opacity: 1,
      zIndex: templateDoc.layers.length * 10,
      blendMode: 'normal',
      x: 25, y: 25,
      width: 50, height: 10,
      rotation: 0,
      ...(type === 'text' ? {
        content: 'New Text',
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 24,
        lineHeight: 1.2,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#000000',
        autoWrap: true,
        maxLines: 2,
      } : {})
    } as AnyLayer;

    setTemplateDoc(prev => ({
      ...prev,
      layers: [...prev.layers, newLayer],
    }));
    setSelectedLayerId(id);
  };

  const handleToggleVisibility = (id: string) => {
    setTemplateDoc(prev => ({
      ...prev,
      layers: prev.layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l),
    }));
  };

  const handleToggleLock = (id: string) => {
    setTemplateDoc(prev => ({
      ...prev,
      layers: prev.layers.map(l => l.id === id ? { ...l, locked: !l.locked } : l),
    }));
  };

  const handleDeleteLayer = (id: string) => {
    setTemplateDoc(prev => ({
      ...prev,
      layers: prev.layers.filter(l => l.id !== id),
    }));
    if (selectedLayerId === id) setSelectedLayerId(null);
  };

  const handleReorderLayers = (fromIdx: number, toIdx: number) => {
    setTemplateDoc(prev => {
      const layers = [...prev.layers];
      const [moved] = layers.splice(fromIdx, 1);
      layers.splice(toIdx, 0, moved);
      return {
        ...prev,
        layers: layers.map((l, i) => ({ ...l, zIndex: i * 10 })),
      };
    });
  };

  const updateLayer = (id: string, updates: Partial<AnyLayer>) => {
    setTemplateDoc(prev => ({
      ...prev,
      layers: prev.layers.map(l => l.id === id ? { ...l, ...updates } : l),
    }));
  };

  const alignSelected = (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (!selectedLayerId || !engineRef.current) return;
    engineRef.current.alignLayer(selectedLayerId, 
      ['left', 'center', 'right'].includes(align) ? align as any : 'center', 
      ['top', 'middle', 'bottom'].includes(align) ? align as any : 'middle');
    // We must trigger re-render by updating state
    setTemplateDoc(engineRef.current.exportJSON() ? JSON.parse(engineRef.current.exportJSON()) : templateDoc);
  };

  const distributeSelected = (direction: 'horizontal' | 'vertical') => {
    // Requires multiple selection, simplified for now
  };

  const exportPNG = async () => {
    if (!user?.isPro) { onOpenPayModal(); return; }
    if (!engineRef.current) return;
    const blob = await engineRef.current.exportPNG(300);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateDoc.title}-print.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportJSON = () => {
    if (!engineRef.current) return;
    const json = engineRef.current.exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${templateDoc.title}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedLayer = templateDoc.layers.find(l => l.id === selectedLayerId);

  return (
    <div className="bg-[#05050A] min-h-screen text-white pt-24 pb-20">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 hover:bg-[#1C1C2E] rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-[#8080A0]" />
            </button>
            <div>
              <h1 className="text-xl font-bold tracking-tight">{templateDoc.title}</h1>
              <p className="text-sm text-[#8080A0]">{templateDoc.category} Template</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={exportJSON}>
              Save Template
            </Button>
            <Button variant="gradient" onClick={exportPNG} icon={<Download className="w-4 h-4" />}>
              Export High-Res
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-72 shrink-0 space-y-4">
            
            {/* Tabs */}
            <div className="flex bg-[#040408] border border-[#1C1C2E] p-1 rounded-xl">
              <button 
                onClick={() => setSidebarTab('layers')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${sidebarTab === 'layers' ? 'bg-[#1C1C2E] text-white' : 'text-[#8080A0] hover:text-white'}`}
              >
                Layers
              </button>
              <button 
                onClick={() => setSidebarTab('assets')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${sidebarTab === 'assets' ? 'bg-[#1C1C2E] text-[#7C6EFA]' : 'text-[#8080A0] hover:text-white'}`}
              >
                Assets
              </button>
              <button 
                onClick={() => setSidebarTab('ai')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors flex justify-center items-center gap-1 ${sidebarTab === 'ai' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-[#8080A0] hover:text-white'}`}
              >
                <Wand2 className="w-3.5 h-3.5" /> AI
              </button>
            </div>

            {sidebarTab === 'layers' && (
              <>
                <LayerPanel
                  layers={templateDoc.layers}
                  selectedLayerId={selectedLayerId}
                  onSelectLayer={setSelectedLayerId}
                  onToggleVisibility={handleToggleVisibility}
                  onToggleLock={handleToggleLock}
                  onDeleteLayer={handleDeleteLayer}
                  onReorderLayers={handleReorderLayers}
                  onAddLayer={handleAddLayer}
                />
                
                <PropertyPanel layer={selectedLayer} onUpdate={updateLayer} />
                
                {templateDoc.placeholders && templateDoc.placeholders.length > 0 && (
                  <div className="p-3 bg-[#040408] border border-[#1C1C2E] rounded-xl">
                    <h4 className="text-[11px] font-bold text-[#8080A0] uppercase tracking-wider mb-3">
                      Dynamic Fields
                    </h4>
                    {templateDoc.placeholders.map(ph => (
                      <div key={ph.key} className="flex items-center justify-between py-1.5 text-[11px]">
                        <span className="text-[#8080A0]">{ph.label}</span>
                        <code className="text-[#7C6EFA] bg-[#12121E] px-1.5 py-0.5 rounded text-[10px]">
                          {'{'}{'{'}{ph.key}{'}'}{'}'}
                        </code>
                      </div>
                    ))}
                    <p className="text-[10px] text-[#4E4E6E] mt-2">
                      These auto-fill from form data. Use {'{key}'} in text layers.
                    </p>
                  </div>
                )}
              </>
            )}

            {sidebarTab === 'assets' && (
              <div className="bg-[#0A0A12] border border-[#1C1C2E] rounded-xl p-3 flex flex-col h-[600px] overflow-hidden">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#7C6EFA]" /> Asset Library
                </h4>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                  {registryAssets && Object.entries(registryAssets).map(([cat, assets]) => (
                    <div key={cat} className="space-y-2">
                      <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">{cat}</span>
                      <div className="grid grid-cols-2 gap-2">
                        {(assets as any[]).map(a => (
                          <button 
                            key={a.id} 
                            onClick={() => handleApplyAsset(a)}
                            className="bg-[#12121E] border border-[#28283E] hover:border-[#7C6EFA] rounded-lg p-2 flex flex-col items-center justify-center aspect-square transition-all group"
                          >
                            <span className="text-[24px] group-hover:scale-110 transition-transform">
                              {a.path.startsWith('#') ? <div className="w-8 h-8 rounded-full border border-slate-700" style={{background: a.path}}></div> : a.path.startsWith('/') ? <ImageIcon className="w-6 h-6 text-slate-500" /> : a.path}
                            </span>
                            <span className="text-[9px] font-bold text-slate-400 mt-2 truncate w-full">{a.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sidebarTab === 'ai' && (
              <div className="bg-[#0A0A12] border border-[#1C1C2E] rounded-xl p-4 flex flex-col h-[600px] overflow-hidden">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" /> AI Art Factory
                </h4>
                
                <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-1 pb-4">
                  
                  {/* Style Generator */}
                  <div className="bg-[#12121E] border border-[#28283E] rounded-xl p-3">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide mb-2">Style Recommendations</h5>
                    <Button 
                      variant="gradient" 
                      onClick={handleGenerateAI} 
                      disabled={isGeneratingAI}
                      className="w-full mb-3 py-1.5 text-xs"
                    >
                      {isGeneratingAI ? <Loader2 className="w-3 h-3 animate-spin" /> : "Generate Style Ideas"}
                    </Button>
                    
                    <div className="space-y-3">
                      {aiSuggestions.map((sug, i) => (
                        <div key={i} className="bg-[#0A0A12] border border-[#1C1C2E] p-2 rounded-lg group hover:border-purple-500/50 transition-colors">
                          <h6 className="text-[11px] font-bold text-white mb-1">{sug.name}</h6>
                          <p className="text-[9px] text-[#8080A0] mb-2 line-clamp-2">{sug.description}</p>
                          
                          {sug.previewSvg && (
                            <div 
                              className="bg-[#05050A] rounded p-1 flex justify-center mb-2"
                              dangerouslySetInnerHTML={{ __html: sug.previewSvg }}
                            />
                          )}
                          
                          <button 
                            onClick={() => handleApplyArtProfile(sug.artProfile)}
                            className="w-full py-1 bg-[#1C1C2E] hover:bg-purple-600 text-[10px] font-bold rounded transition-colors flex items-center justify-center gap-1 text-white"
                          >
                            <Check className="w-3 h-3" /> Apply Style
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Art Customizer */}
                  <div className="bg-[#12121E] border border-[#28283E] rounded-xl p-3">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide mb-2">Art Customizer</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#8080A0]">Dots Shape</span>
                        <select className="bg-[#05050A] border border-[#1C1C2E] text-white rounded px-2 py-1 outline-none">
                          <option>Circle</option><option>Square</option><option>Diamond</option><option>Star</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#8080A0]">Eyes Style</span>
                        <select className="bg-[#05050A] border border-[#1C1C2E] text-white rounded px-2 py-1 outline-none">
                          <option>Standard</option><option>Modern</option><option>Leaf</option><option>Shield</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#8080A0]">Frame</span>
                        <select className="bg-[#05050A] border border-[#1C1C2E] text-white rounded px-2 py-1 outline-none">
                          <option>None</option><option>Thin Border</option><option>Rounded</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-[#8080A0]">Logo</span>
                        <select className="bg-[#05050A] border border-[#1C1C2E] text-white rounded px-2 py-1 outline-none">
                          <option>Center</option><option>Bottom Right</option><option>None</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Batch Queue */}
                  <div className="bg-[#12121E] border border-[#28283E] rounded-xl p-3">
                    <h5 className="text-[11px] font-bold text-white uppercase tracking-wide mb-2">Batch Queue Generator</h5>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#8080A0]">Target Tool</span>
                        <span className="text-white bg-[#05050A] px-2 py-1 rounded">{tool?.name || 'Selected Tool'}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-[#8080A0]">Quantity</span>
                        <input 
                          type="number" 
                          min={1} max={20} 
                          value={batchCount}
                          onChange={(e) => setBatchCount(Number(e.target.value))}
                          className="bg-[#05050A] border border-[#1C1C2E] text-white rounded px-2 py-1 w-16 outline-none text-center" 
                        />
                      </div>
                      <Button 
                        variant="primary" 
                        onClick={handleBatchGenerate} 
                        disabled={isBatchGenerating}
                        className="w-full mt-2 py-1.5 text-xs bg-[#1C1C2E] hover:bg-indigo-600"
                      >
                        {isBatchGenerating ? <Loader2 className="w-3 h-3 animate-spin" /> : `Generate ${batchCount} Templates`}
                      </Button>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
          
          {/* Canvas Center */}
          <div className="flex-1 flex flex-col">
            <AlignmentToolbar 
              onAlign={alignSelected}
              safeZoneGuides={templateDoc.safeZone?.showGuides || false}
              onToggleSafeZone={(show) => setTemplateDoc(prev => ({ ...prev, safeZone: { ...prev.safeZone, showGuides: show } }))}
            />
            
            <div className="flex-1 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl p-8 flex items-center justify-center overflow-auto shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]">
              <div ref={canvasRef} className="shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
