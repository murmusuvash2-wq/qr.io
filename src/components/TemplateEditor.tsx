import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, Download, Type, MousePointer2, Lock, Unlock, Sparkles, 
  Plus, Trash2, Globe, HelpCircle, CheckCircle2, Sliders, Crown, Settings2
} from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import { UserStats } from '../lib/firebase';

interface TemplateEditorProps {
  template: any;
  user: UserStats | null;
  onOpenPayModal: () => void;
  onBack: () => void;
}

export default function TemplateEditor({ 
  template, 
  user, 
  onOpenPayModal, 
  onBack 
}: TemplateEditorProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);
  
  // Tracking whether we are in Simple Personalize Form mode or Advanced Drag-&-Drop Canvas mode
  const [isFullCustomizeMode, setIsFullCustomizeMode] = useState(false);
  
  // QR code target input data
  const [qrData, setQrData] = useState('https://ezqr.io');

  // Dynamic text elements state
  const [elements, setElements] = useState(() => {
    if (template.textElements && template.textElements.length > 0) {
      return template.textElements.map((el: any, i: number) => ({
        id: `el-${i}`,
        type: 'text',
        content: el.content,
        x: el.x || 50,
        y: el.y || 80 + (i * 40),
        color: el.color || '#ffffff',
        fontSize: el.fontSize || 22,
        isEditing: false
      }));
    }
    return [
      { id: '1', type: 'text', content: 'SCAN TO CONNECT', x: 80, y: 80, color: '#ffffff', fontSize: 22, isEditing: false },
      { id: '2', type: 'text', content: template.title, x: 50, y: 120, color: '#A89EFF', fontSize: 26, isEditing: false }
    ];
  });
  
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Initialize and update the QR Code on input/template styling change
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      
      const qrColor = template.qrConfig?.fgColor || '#A89EFF';
      const qrBg = template.qrConfig?.bgColor || '#FFFFFF';
      const dotsStyle = template.qrConfig?.dotsStyle || 'rounded';
      const cornersStyle = template.qrConfig?.cornersStyle || 'extra-rounded';

      const qrCode = new QRCodeStyling({
        width: 170,
        height: 170,
        data: qrData,
        dotsOptions: {
          color: qrColor,
          type: dotsStyle as any
        },
        backgroundOptions: {
          color: qrBg === 'transparent' ? '#FFFFFF' : qrBg
        },
        cornersSquareOptions: {
          color: qrColor,
          type: cornersStyle as any
        }
      });
      
      qrCode.append(qrRef.current);
      qrCodeInstance.current = qrCode;
    }
  }, [template, qrData]);

  // Handle Drag & Drop logic (Active ONLY in Pro Full Customize Mode)
  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    if (!isFullCustomizeMode) return; // Prevent drag-drop if not in Pro mode
    if (elements.find(el => el.id === id)?.isEditing) return;
    
    setSelectedId(id);
    setIsDragging(true);
    
    const el = document.getElementById(`element-${id}`);
    if (el && canvasRef.current) {
      const rect = el.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedId && canvasRef.current && isFullCustomizeMode) {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      
      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;
      
      setElements(prev => prev.map(el => 
        el.id === selectedId 
          ? { ...el, x: Math.max(0, Math.min(320, newX)), y: Math.max(0, Math.min(560, newY)) }
          : el
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = (id: string) => {
    if (!isFullCustomizeMode) return; // Block double click edit if not in Pro mode
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
    if (!isFullCustomizeMode) return;
    setElements([...elements, {
      id: Date.now().toString(),
      type: 'text',
      content: 'Custom Text',
      x: 100,
      y: 160,
      color: '#ffffff',
      fontSize: 24,
      isEditing: false
    }]);
  };

  const deleteElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handleDownload = () => {
    if (template.type === 'Pro' && !user?.isPro) {
      onOpenPayModal();
      return;
    }
    alert('Success: Preparing your personalized high-DPI creative poster frame for secure download!');
  };

  // Build the background style based on template parameters
  const canvasStyle: React.CSSProperties = {
    width: '400px',
    height: '600px',
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  if (template.bgType === 'gradient' && template.gradient) {
    const { from, to, via, angle = '135deg' } = template.gradient;
    canvasStyle.background = `linear-gradient(${angle}, ${from}, ${via ? via + ', ' : ''}${to})`;
  } else {
    const bgImgUrl = template.imgUrl || (template.imageSearchTerm 
      ? `https://images.unsplash.com/featured/400x600/?${encodeURIComponent(template.imageSearchTerm)}`
      : 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400');
    canvasStyle.backgroundImage = `url(${bgImgUrl})`;
  }

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
            <h1 className="font-syne text-sm sm:text-base font-bold text-white flex items-center gap-2">
              Editing: {template.title}
              {template.type === 'Pro' && (
                <span className="text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5" /> PRO
                </span>
              )}
            </h1>
            <p className="text-[10px] text-[#8080A0] uppercase tracking-wider font-bold mt-0.5">
              {template.category} • {isFullCustomizeMode ? "👑 Advanced Canvas Mode" : "✏️ Simple Personalize Mode"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownload}
            className="bg-gradient-to-r from-[#7C6EFA] to-[#C084FC] text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Download className="w-4 h-4" /> Export Design
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Toolbar - Drag and drop status */}
        <div className="w-16 bg-[#0A0A12] border-r border-[#1C1C2E] flex flex-col items-center py-5 gap-4">
          <button 
            disabled={!isFullCustomizeMode}
            onClick={() => setSelectedId(null)}
            className={`p-3 rounded-xl transition-all relative ${
              isFullCustomizeMode 
                ? 'bg-[#7C6EFA]/10 text-[#7C6EFA] border border-[#7C6EFA]/30 hover:bg-[#1C1C2E]' 
                : 'text-[#4E4E6E] cursor-not-allowed'
            }`}
            title={isFullCustomizeMode ? "Select Tool" : "Canvas Pointer (Locked - Upgrade to Customize)"}
          >
            <MousePointer2 className="w-5 h-5" />
            {!isFullCustomizeMode && (
              <span className="absolute -bottom-1 -right-1 bg-[#121226] border border-[#28283E] text-amber-500 p-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" />
              </span>
            )}
          </button>

          <button 
            disabled={!isFullCustomizeMode}
            onClick={addTextElement}
            className={`p-3 rounded-xl transition-all relative ${
              isFullCustomizeMode 
                ? 'text-[#8080A0] hover:text-white hover:bg-[#12121E] border border-transparent' 
                : 'text-[#4E4E6E] cursor-not-allowed'
            }`}
            title={isFullCustomizeMode ? "Add Text Layer" : "Add Text Layer (Locked - Upgrade to Customize)"}
          >
            <Type className="w-5 h-5" />
            {!isFullCustomizeMode && (
              <span className="absolute -bottom-1 -right-1 bg-[#121226] border border-[#28283E] text-amber-500 p-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" />
              </span>
            )}
          </button>
        </div>

        {/* Canvas Workspace Area */}
        <div 
          className="flex-1 bg-[#040408] flex flex-col items-center justify-center p-6 sm:p-12 overflow-auto relative"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Helpful user banner */}
          <div className="mb-4 text-center select-none">
            <span className="inline-block bg-[#0B0B18]/80 text-[#8080A0] text-[10px] sm:text-xs font-bold border border-[#1F1F35] px-4 py-1.5 rounded-full shadow-md">
              {isFullCustomizeMode 
                ? "💡 Drag and drop text elements anywhere on the card canvas freely!" 
                : "✏️ Preview updates live below. Edit card texts and URL instantly in the form!"
              }
            </span>
          </div>

          {/* Actual Canvas Card Frame */}
          <div 
            ref={canvasRef}
            className={`relative shadow-2xl overflow-hidden border rounded-3xl transition-all duration-300 ${
              isFullCustomizeMode 
                ? 'border-[#7C6EFA]/40 shadow-[0_15px_50px_rgba(124,110,250,0.15)]' 
                : 'border-[#28283E]'
            }`}
            style={canvasStyle}
            onClick={(e) => {
              if (e.target === canvasRef.current) setSelectedId(null);
            }}
          >
            {/* Dark glass backdrop overlay for visual pop (except for artistic sketch) */}
            {template.layoutType !== 'artistic_portrait' && (
              <div className="absolute inset-0 bg-black/10 pointer-events-none z-0"></div>
            )}

            {/* =======================================================
                LAYOUT ARTWORK 1: KAWAII PASTEL DOODLE CARD (Free)
                ======================================================= */}
            {template.layoutType === 'kawaii_pastel' && (
              <>
                {/* Checkered/grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: "radial-gradient(#881B1B 1.5px, transparent 1.5px)", backgroundSize: '16px 16px' }}></div>
                
                {/* Floating stickers and illustrations */}
                <div className="absolute top-[20px] left-[20px] text-4xl animate-bounce pointer-events-none z-10" style={{ animationDuration: '3s' }} title="Cherry">🍒</div>
                <div className="absolute top-[35px] right-[25px] text-4xl animate-pulse pointer-events-none z-10" style={{ animationDuration: '4s' }} title="Strawberry">🍓</div>
                <div className="absolute top-[130px] left-[15px] text-3.5xl rotate-12 pointer-events-none z-10" title="Boba">🧋</div>
                <div className="absolute top-[150px] right-[20px] text-3.5xl -rotate-12 pointer-events-none z-10" title="Tulip">🌷</div>
                
                {/* Stars & Ribbons */}
                <div className="absolute top-[105px] left-[130px] text-lg text-amber-500 animate-spin pointer-events-none z-10" style={{ animationDuration: '10s' }}>✨</div>
                <div className="absolute top-[105px] right-[130px] text-lg text-amber-500 animate-spin pointer-events-none z-10" style={{ animationDuration: '8s' }}>✨</div>
                <div className="absolute top-[425px] left-[60px] text-xl text-pink-400 animate-pulse pointer-events-none z-10">💖</div>
                <div className="absolute top-[425px] right-[60px] text-xl text-pink-400 animate-pulse pointer-events-none z-10">💖</div>

                <div className="absolute bottom-[90px] left-[25px] text-4xl pointer-events-none z-10" title="Cupcake">🧁</div>
                <div className="absolute bottom-[85px] right-[20px] text-4xl pointer-events-none z-10" title="Bear">🐻</div>
                
                {/* Outer frame border */}
                <div className="absolute inset-4 border-2 border-dashed border-[#881B1B]/20 rounded-2xl pointer-events-none"></div>
              </>
            )}

            {/* =======================================================
                LAYOUT ARTWORK 2: MASCOT BEAR SIGNBOARD (Pro)
                ======================================================= */}
            {template.layoutType === 'mascot_bear' && (
              <>
                {/* Wood floor shadow at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-28 bg-[#78350F]/20 blur-lg pointer-events-none"></div>

                {/* Left & Right Ears */}
                <div className="absolute left-[125px] top-[145px] w-14 h-14 bg-[#B45309] rounded-full border-4 border-[#78350F] flex items-center justify-center shadow-inner z-0 pointer-events-none">
                  <div className="w-6 h-6 bg-[#F59E0B] rounded-full"></div>
                </div>
                <div className="absolute right-[125px] top-[145px] w-14 h-14 bg-[#B45309] rounded-full border-4 border-[#78350F] flex items-center justify-center shadow-inner z-0 pointer-events-none">
                  <div className="w-6 h-6 bg-[#F59E0B] rounded-full"></div>
                </div>

                {/* Bear head behind the signboard */}
                <div className="absolute left-[130px] top-[150px] w-[140px] h-[115px] bg-[#D97706] rounded-full border-4 border-[#78350F] flex flex-col items-center justify-start pt-3 shadow-md z-0 pointer-events-none">
                  {/* Eyes with white shiny highlights */}
                  <div className="flex gap-7 mt-2">
                    <div className="w-3.5 h-3.5 bg-slate-950 rounded-full relative">
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="w-3.5 h-3.5 bg-slate-950 rounded-full relative">
                      <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  {/* Snout with nose and smile */}
                  <div className="w-14 h-11 bg-amber-100 rounded-full border border-[#D97706] mt-1 relative flex flex-col items-center justify-center">
                    <div className="w-5 h-3 bg-stone-900 rounded-full"></div>
                    <div className="w-4 h-1 bg-amber-800/40 rounded-full mt-0.5"></div>
                  </div>
                </div>

                {/* Left paw clutching the signboard frame */}
                <div className="absolute left-[55px] top-[280px] w-16 h-12 bg-[#B45309] rounded-full border-4 border-[#78350F] flex items-center justify-center shadow-lg z-10 pointer-events-none">
                  <div className="flex gap-0.5">
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                  </div>
                </div>
                {/* Right paw clutching the signboard frame */}
                <div className="absolute right-[55px] top-[280px] w-16 h-12 bg-[#B45309] rounded-full border-4 border-[#78350F] flex items-center justify-center shadow-lg z-10 pointer-events-none">
                  <div className="flex gap-0.5">
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                    <div className="w-2.5 h-2 bg-amber-950 rounded-full"></div>
                  </div>
                </div>
              </>
            )}

            {/* =======================================================
                LAYOUT ARTWORK 3: ARTISTIC SKETCH PORTRAIT (Pro)
                ======================================================= */}
            {template.layoutType === 'artistic_portrait' && (
              <>
                {/* Textured paper grain background */}
                <div className="absolute inset-0 mix-blend-multiply opacity-[0.22] pointer-events-none z-1" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cartographer.png')" }}></div>
                
                {/* Woman Portrait Sketch Outline - Placed precisely above the QR code */}
                <div className="absolute left-[100px] top-[90px] w-[200px] h-[200px] pointer-events-none z-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-800 opacity-[0.9] drop-shadow-md">
                    {/* Artistic Line Art Face sketch */}
                    <path d="M45,20 C30,20 22,35 25,50 C27,60 35,68 45,72 C55,75 62,68 64,55 C65,45 60,20 45,20 Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    {/* Hair flows */}
                    <path d="M45,20 C55,10 75,25 78,45 C80,60 75,85 70,95" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M38,20 C25,12 15,30 18,55 C20,70 30,85 35,95" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
                    {/* Face features */}
                    <path d="M38,45 C41,43 45,45 45,48" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M54,45 C57,43 61,45 61,48" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M48,50 L48,58 L45,60" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M43,65 C46,68 50,68 53,65" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    {/* Shoulders merging into QR */}
                    <path d="M30,80 C32,85 36,92 40,98" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M68,80 C66,85 62,92 58,98" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </div>

                {/* Elegant thick charcoal border frame */}
                <div className="absolute inset-5 border-[12px] border-[#1A1A1A] rounded-2xl pointer-events-none z-10"></div>
                <div className="absolute inset-8 border border-[#1A1A1A]/20 pointer-events-none z-10"></div>
              </>
            )}

            {/* =======================================================
                LAYOUT ARTWORK 4: KYOTO SAKURA TRAVEL MAP (Pro)
                ======================================================= */}
            {template.layoutType === 'japan_travel' && (
              <>
                {/* Rising sun backdrop right behind the QR */}
                <div className="absolute left-[110px] top-[210px] w-[180px] h-[180px] bg-red-600 rounded-full opacity-[0.75] blur-[2px] pointer-events-none z-0"></div>

                {/* Floating Mount Fuji peak at the top behind elements */}
                <div className="absolute top-[130px] inset-x-0 flex justify-center opacity-30 z-0 pointer-events-none">
                  <div className="w-56 h-28 bg-blue-900/40 relative" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}>
                    {/* Snow cap peak overlay */}
                    <div className="absolute top-0 inset-x-0 h-10 bg-white" style={{ clipPath: 'polygon(50% 0%, 25% 100%, 75% 100%)' }}></div>
                  </div>
                </div>

                {/* Drift cherry blossoms 🌸 */}
                <div className="absolute top-[140px] left-[35px] text-2xl animate-pulse pointer-events-none z-10" style={{ animationDuration: '3.5s' }}>🌸</div>
                <div className="absolute top-[170px] right-[45px] text-2xl animate-pulse pointer-events-none z-10" style={{ animationDuration: '4s' }}>🌸</div>
                <div className="absolute bottom-[130px] left-[50px] text-xl animate-bounce pointer-events-none z-10" style={{ animationDuration: '5s' }}>🌸</div>
                <div className="absolute bottom-[170px] right-[30px] text-xl animate-bounce pointer-events-none z-10" style={{ animationDuration: '6s' }}>🌸</div>

                {/* Japanese Traditional Landmarks */}
                <div className="absolute bottom-[80px] left-[35px] text-4.5xl drop-shadow-md select-none pointer-events-none z-10" title="Torii Gate">⛩️</div>
                <div className="absolute bottom-[80px] right-[35px] text-4.5xl drop-shadow-md select-none pointer-events-none z-10" title="Pagoda Temple">🛕</div>

                {/* Waves at bottom */}
                <div className="absolute bottom-16 inset-x-0 h-4 bg-blue-400/20 backdrop-blur-3xs rounded-full pointer-events-none z-0"></div>
              </>
            )}

            {/* Live QR Code precisely aligned inside card (x=105, y=215) */}
            <div 
              className="absolute left-[105px] top-[215px] w-[190px] h-[190px] rounded-2xl flex items-center justify-center p-2.5 shadow-2xl transition-transform"
              style={{ 
                backgroundColor: template.qrConfig?.bgColor || '#FFFFFF',
                boxShadow: template.layoutType === 'mascot_bear' 
                  ? '0 30px 70px rgba(0, 0, 0, 0.75), inset 0 0 10px rgba(0,0,0,0.1)' 
                  : '0 25px 60px rgba(0, 0, 0, 0.55)',
                border: template.layoutType === 'kawaii_pastel' 
                  ? '4px solid #FFA6C9' 
                  : template.layoutType === 'mascot_bear'
                  ? '8px solid #92400E'
                  : '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <div ref={qrRef} className="w-[170px] h-[170px] flex items-center justify-center overflow-hidden rounded-xl" />
            </div>

            {/* Card Text Layers */}
            {elements.map(el => (
              <div
                key={el.id}
                id={`element-${el.id}`}
                className={`absolute transition-all ${
                  isFullCustomizeMode 
                    ? 'cursor-move hover:ring-2 hover:ring-[#7C6EFA]/40 p-1 rounded-lg' 
                    : 'cursor-default p-1'
                } ${selectedId === el.id && isFullCustomizeMode ? 'ring-2 ring-[#7C6EFA] ring-offset-2 ring-offset-[#12121E]' : ''}`}
                style={{
                  left: el.x,
                  top: el.y,
                  color: el.color,
                  fontSize: `${el.fontSize}px`,
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 'bold',
                  textShadow: '0 2px 10px rgba(0,0,0,0.85)',
                  userSelect: 'none',
                  whiteSpace: 'nowrap'
                }}
                onMouseDown={(e) => handleMouseDown(e, el.id)}
                onDoubleClick={() => handleDoubleClick(el.id)}
              >
                {el.isEditing && isFullCustomizeMode ? (
                  <input
                    type="text"
                    value={el.content}
                    autoFocus
                    className="bg-black/60 border border-[#7C6EFA]/60 outline-none focus:ring-0 p-1 rounded font-bold text-white text-center"
                    style={{ color: el.color, fontSize: `${el.fontSize}px`, width: `${Math.max(5, el.content.length + 1)}ch` }}
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
        
        {/* Right Sidebar Form & Properties Control Center */}
        <div className="w-[380px] bg-[#0A0A12] border-l border-[#1C1C2E] p-6 flex flex-col justify-between overflow-y-auto shrink-0 select-none">
          
          <div className="space-y-6">
            
            {/* Mode Selector Toggle */}
            <div className="space-y-2">
              <label className="text-[10px] text-[#8080A0] uppercase tracking-wider font-extrabold block">
                Editor Mode Controls
              </label>
              <div className="grid grid-cols-2 bg-[#12121E] p-1 rounded-xl border border-[#28283E]">
                <button 
                  type="button"
                  onClick={() => setIsFullCustomizeMode(false)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    !isFullCustomizeMode 
                      ? 'bg-[#7C6EFA] text-white shadow-md' 
                      : 'text-[#8080A0] hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" /> Simple Form
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (user?.isPro) {
                      setIsFullCustomizeMode(true);
                    } else {
                      onOpenPayModal();
                    }
                  }}
                  className={`py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative ${
                    isFullCustomizeMode 
                      ? 'bg-[#7C6EFA] text-white shadow-md' 
                      : 'text-[#8080A0] hover:text-white'
                  }`}
                >
                  <Crown className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
                  <span>Full Customize</span>
                  {!user?.isPro && (
                    <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                  )}
                </button>
              </div>
            </div>

            {/* Mode-Specific Sidebar Layout */}
            {!isFullCustomizeMode ? (
              
              /* SIMPLE FORM PERSONALIZATION MODE (Direct Form on selection) */
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-[#1C1C2E] pb-3">
                  <h3 className="font-syne text-base font-extrabold text-white">
                    ✏️ Personalization Form
                  </h3>
                  <p className="text-[11px] text-[#8080A0] mt-0.5 leading-relaxed">
                    Fill the readymade layout fields to configure your brand code.
                  </p>
                </div>

                {/* QR Destination URL Field */}
                <div className="space-y-1.5">
                  <label className="text-xs text-white font-bold block flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#A89EFF]" />
                    <span>QR Target URL / Text Content</span>
                  </label>
                  <input
                    type="text"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="https://suvash-design.com"
                    className="w-full bg-[#06060F] border border-[#28283E] focus:border-[#7C6EFA] focus:ring-1 focus:ring-[#7C6EFA] text-xs font-semibold rounded-xl px-4 py-3 text-white outline-none transition-all placeholder-[#4E4E6E]"
                  />
                </div>

                {/* Loop text layers inputs */}
                <div className="space-y-4 pt-2 border-t border-[#1C1C2E]">
                  <span className="text-[10px] text-[#8080A0] uppercase tracking-wider font-extrabold block">
                    Card Text Labels
                  </span>
                  
                  {elements.map((el, index) => (
                    <div key={el.id} className="space-y-1.5">
                      <label className="text-[11px] text-[#8080A0] font-bold block">
                        Line {index + 1} Content:
                      </label>
                      <input
                        type="text"
                        value={el.content}
                        onChange={(e) => handleTextChange(el.id, e.target.value)}
                        placeholder="Write content..."
                        className="w-full bg-[#06060F] border border-[#28283E] focus:border-[#7C6EFA] focus:ring-1 focus:ring-[#7C6EFA] text-xs font-semibold rounded-xl px-4 py-3 text-white outline-none transition-all"
                      />
                    </div>
                  ))}
                </div>

                {/* Lock box detailing Pro benefits for full customization */}
                <div className="bg-gradient-to-br from-[#111122] via-[#1E0E32] to-[#250920] border border-[#E11D48]/20 rounded-2xl p-4 space-y-3.5 relative overflow-hidden shadow-xl mt-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E11D48]/5 rounded-full blur-2xl pointer-events-none"></div>
                  
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Pro Customizer locked
                    </span>
                  </div>

                  <p className="text-[11px] text-[#8080A0] leading-relaxed">
                    Unlock the **PRO Canvas Engine** to move text elements anywhere on the card, size fonts, assign specific palette colors, and insert new custom layers!
                  </p>

                  <button
                    type="button"
                    onClick={onOpenPayModal}
                    className="w-full py-2.5 bg-gradient-to-r from-rose-500 via-[#7C6EFA] to-[#C084FC] hover:brightness-115 text-white font-black text-[10px] tracking-widest rounded-xl transition-all uppercase flex items-center justify-center gap-1.5 shadow-lg"
                  >
                    <Crown className="w-3 h-3 text-yellow-300" /> Unlock Full Customization
                  </button>
                </div>

              </div>
            ) : (
              
              /* ADVANCED DRAG & DROP MODE (Allowed for Pro users) */
              <div className="space-y-5 animate-fade-in">
                <div className="border-b border-[#1C1C2E] pb-3">
                  <h3 className="font-syne text-base font-extrabold text-white flex items-center gap-2">
                    <Crown className="w-4 h-4 text-yellow-400" /> Pro Layout Controls
                  </h3>
                  <p className="text-[11px] text-[#8080A0] mt-0.5 leading-relaxed">
                    You have full layout authority. Drag layers, scale fonts, or append brand labels.
                  </p>
                </div>

                {/* Add new text layer */}
                <button
                  type="button"
                  onClick={addTextElement}
                  className="w-full bg-[#121226] hover:bg-[#1C1C35] border border-[#282845] text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Plus className="w-4 h-4 text-[#A89EFF]" /> Append New Text Layer
                </button>

                {/* Selected Element Properties */}
                {selectedId ? (
                  <div className="p-4 bg-[#121226]/50 border border-[#28283E] rounded-xl space-y-4">
                    <span className="text-[10px] text-[#A89EFF] font-bold uppercase tracking-wider block">
                      Selected Layer Properties
                    </span>
                    
                    {/* Text content */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#8080A0] block">Layer Content</label>
                      <input
                        type="text"
                        value={elements.find(e => e.id === selectedId)?.content || ''}
                        onChange={(e) => handleTextChange(selectedId, e.target.value)}
                        className="w-full bg-[#06060F] border border-[#28283E] text-xs rounded-lg px-3 py-2 text-white outline-none"
                      />
                    </div>

                    {/* Color picker */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-[#8080A0] block">Font Swatch Color</label>
                      <div className="flex gap-2">
                        <input 
                          type="color" 
                          value={elements.find(e => e.id === selectedId)?.color || '#ffffff'}
                          onChange={(e) => {
                            setElements(prev => prev.map(el => 
                              el.id === selectedId ? { ...el, color: e.target.value } : el
                            ));
                          }}
                          className="w-10 h-8 bg-transparent cursor-pointer rounded border border-[#28283E]"
                        />
                        <input
                          type="text"
                          value={elements.find(e => e.id === selectedId)?.color || '#ffffff'}
                          onChange={(e) => {
                            setElements(prev => prev.map(el => 
                              el.id === selectedId ? { ...el, color: e.target.value } : el
                            ));
                          }}
                          className="flex-1 bg-[#06060F] border border-[#28283E] text-xs font-mono rounded-lg px-3 py-2 text-white outline-none"
                        />
                      </div>
                    </div>

                    {/* Font size */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-[#8080A0]">
                        <span>Font Size</span>
                        <span className="font-bold text-white">{elements.find(e => e.id === selectedId)?.fontSize}px</span>
                      </div>
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

                    {/* Delete layer button */}
                    <button
                      type="button"
                      onClick={() => deleteElement(selectedId)}
                      className="w-full mt-2 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-red-500/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete Active Layer
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#8080A0] text-xs border border-dashed border-[#28283E] rounded-xl px-4 leading-relaxed bg-[#06060F]/40">
                    💡 Click on any text block directly on the canvas to customize its positioning, font size, layer colors, or remove it.
                  </div>
                )}
              </div>

            )}

          </div>

          {/* Footer security badge inside form */}
          <div className="mt-8 pt-4 border-t border-[#1C1C2E] flex items-center gap-2 justify-center text-[10px] text-[#42425A]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Secure HD Vector Generation Active</span>
          </div>

        </div>

      </div>
    </div>
  );
}
