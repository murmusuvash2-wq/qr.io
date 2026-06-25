import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Save, Download, Type, Image as ImageIcon, MousePointer2, Move, ZoomIn, ZoomOut, Maximize, RotateCcw } from 'lucide-react';

export default function TemplateEditor({ template, onBack }: { template: any, onBack: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Very basic state for some elements we might want to edit
  const [elements, setElements] = useState([
    { id: '1', type: 'text', content: 'Double Click to Edit', x: 50, y: 50, color: '#ffffff', fontSize: 24, isEditing: false },
    { id: '2', type: 'text', content: template.title, x: 50, y: 100, color: '#A89EFF', fontSize: 32, isEditing: false }
  ]);
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (elements.find(el => el.id === id)?.isEditing) return;
    
    setSelectedId(id);
    setIsDragging(true);
    
    const el = document.getElementById(`element-${id}`);
    if (el && canvasRef.current) {
      const rect = el.getBoundingClientRect();
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      // Calculate offset relative to the element's top-left corner
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedId && canvasRef.current) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      // Calculate new position relative to canvas
      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;
      
      setElements(prev => prev.map(el => 
        el.id === selectedId 
          ? { ...el, x: newX, y: newY }
          : el
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, isEditing: true } : el
    ));
  };

  const handleTextChange = (id: string, newText: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, content: newText } : el
    ));
  };

  const handleBlur = (id: string) => {
    setElements(prev => prev.map(el => 
      el.id === id ? { ...el, isEditing: false } : el
    ));
  };

  const addTextElement = () => {
    setElements([...elements, {
      id: Date.now().toString(),
      type: 'text',
      content: 'New Text',
      x: 100,
      y: 100,
      color: '#ffffff',
      fontSize: 24,
      isEditing: false
    }]);
  };

  const handleDownload = () => {
    // Basic placeholder for download functionality
    alert('In a production environment, this would render the canvas to a blob or data URL using html2canvas or similar, and trigger a download.');
  };

  return (
    <div className="flex flex-col h-screen bg-[#040408] text-[#F2F2FF] font-sans">
      
      {/* Header */}
      <header className="bg-[#0A0A12] border-b border-[#1C1C2E] px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-[#8080A0] hover:text-white flex items-center gap-2 text-sm font-bold transition-colors bg-[#12121E] px-3 py-1.5 rounded-lg border border-[#28283E]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Gallery
          </button>
          <div className="h-6 w-px bg-[#1C1C2E]"></div>
          <div>
            <h1 className="font-syne text-lg font-bold text-white flex items-center gap-2">
              Editing: {template.title}
            </h1>
            <p className="text-[10px] text-[#8080A0] uppercase tracking-wider font-bold">
              Pro Template Canvas
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            className="bg-gradient-to-r from-[#7C6EFA] to-[#C084FC] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Download className="w-4 h-4" /> Export Design
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-16 bg-[#0A0A12] border-r border-[#1C1C2E] flex flex-col items-center py-4 gap-4">
          <button className="p-3 rounded-xl bg-[#12121E] text-[#7C6EFA] border border-[#7C6EFA]/30 hover:bg-[#1C1C2E] transition-colors group relative" title="Select">
            <MousePointer2 className="w-5 h-5" />
          </button>
          <button 
            onClick={addTextElement}
            className="p-3 rounded-xl text-[#8080A0] hover:text-white hover:bg-[#12121E] transition-colors group relative" title="Add Text"
          >
            <Type className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-xl text-[#8080A0] hover:text-white hover:bg-[#12121E] transition-colors group relative" title="Add Image">
            <ImageIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas Area */}
        <div 
          className="flex-1 bg-[#040408] flex items-center justify-center p-8 overflow-auto relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Canvas Board */}
          <div 
            ref={canvasRef}
            className="relative bg-[#12121E] shadow-2xl overflow-hidden border border-[#28283E]"
            style={{
              width: '400px',
              height: '600px',
              backgroundImage: `url(${template.imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={(e) => {
              if (e.target === canvasRef.current) setSelectedId(null);
            }}
          >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

            {/* Elements */}
            {elements.map(el => (
              <div
                key={el.id}
                id={`element-${el.id}`}
                className={`absolute cursor-move ${selectedId === el.id ? 'ring-2 ring-[#7C6EFA] ring-offset-2 ring-offset-[#12121E]' : ''}`}
                style={{
                  left: el.x,
                  top: el.y,
                  color: el.color,
                  fontSize: `${el.fontSize}px`,
                  userSelect: 'none'
                }}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                onDoubleClick={() => handleDoubleClick(el.id)}
              >
                {el.isEditing ? (
                  <input
                    type="text"
                    value={el.content}
                    autoFocus
                    className="bg-transparent border-none outline-none focus:ring-0 p-0 m-0"
                    style={{ color: el.color, fontSize: `${el.fontSize}px`, width: `${el.content.length + 1}ch` }}
                    onChange={(e) => handleTextChange(el.id, e.target.value)}
                    onBlur={() => handleBlur(el.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleBlur(el.id);
                    }}
                  />
                ) : (
                  el.content
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Properties Panel */}
        {selectedId && (
          <div className="w-64 bg-[#0A0A12] border-l border-[#1C1C2E] p-4 flex flex-col">
            <h3 className="text-xs font-bold text-[#8080A0] uppercase tracking-wider mb-4 border-b border-[#1C1C2E] pb-2">
              Properties
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#8080A0] mb-1.5 block">Text Color</label>
                <input 
                  type="color" 
                  value={elements.find(e => e.id === selectedId)?.color || '#ffffff'}
                  onChange={(e) => {
                    setElements(prev => prev.map(el => 
                      el.id === selectedId ? { ...el, color: e.target.value } : el
                    ));
                  }}
                  className="w-full h-8 bg-transparent cursor-pointer rounded-lg border border-[#28283E]"
                />
              </div>
              
              <div>
                <label className="text-xs text-[#8080A0] mb-1.5 block">Font Size</label>
                <input 
                  type="range" 
                  min="12" 
                  max="72"
                  value={elements.find(e => e.id === selectedId)?.fontSize || 24}
                  onChange={(e) => {
                    setElements(prev => prev.map(el => 
                      el.id === selectedId ? { ...el, fontSize: parseInt(e.target.value) } : el
                    ));
                  }}
                  className="w-full accent-[#7C6EFA]"
                />
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
