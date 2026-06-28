import React from 'react';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { getPackById } from '../data/design-packs';
import DesignPackPreview from './DesignPackPreview';

interface Props {
  packId: string;
  onBack: () => void;
}

const DESIGN_TYPES = [
  { id: 'poster', name: 'Poster', icon: '🖼️', desc: '800×600 stand design' },
  { id: 'sticker', name: 'Sticker', icon: '🏷️', desc: '400×400 table sticker' },
  { id: 'flyer', name: 'Flyer', icon: '📄', desc: '600×800 handout' },
  { id: 'table_tent', name: 'Table Tent', icon: '🪧', desc: '400×600 folded card' },
  { id: 'standee', name: 'Standee', icon: '🪨', desc: '300×1200 vertical' },
  { id: 'window_sticker', name: 'Window Sticker', icon: '🪟', desc: '400×400 decal' },
  { id: 'card', name: 'Card', icon: '💳', desc: '300×500 contact card' },
  { id: 'background_pack', name: 'Background Pack', icon: '🎨', desc: '5 matching backgrounds' }
];

export default function DesignPackDetail({ packId, onBack }: Props) {
  const pack = getPackById(packId);
  if (!pack) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 hover:bg-[#1C1C2E] rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-[#8080A0]" />
        </button>
        <span className="text-3xl">{pack.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-white">{pack.name}</h1>
          <p className="text-sm text-[#8080A0]">{pack.description}</p>
        </div>
        {pack.isPremium && (
          <span className="ml-auto px-3 py-1.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] 
                         text-black text-xs font-extrabold rounded-lg uppercase">
            Premium Pack
          </span>
        )}
      </div>

      {/* Design DNA Display */}
      <div className="mb-8 p-4 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl">
        <h3 className="text-sm font-bold text-[#8080A0] uppercase mb-3">Design DNA</h3>
        <div className="flex gap-6 flex-wrap">
          {/* Colors */}
          <div>
            <span className="text-xs text-[#8080A0] block mb-1">Colors</span>
            <div className="flex gap-1">
              {Object.values(pack.designTokens.colors).map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border border-white/10" 
                     style={{ backgroundColor: color }} title={color} />
              ))}
            </div>
          </div>
          {/* Typography */}
          <div>
            <span className="text-xs text-[#8080A0] block mb-1">Typography</span>
            <span className="text-sm text-white">{pack.designTokens.typography.heading}</span>
            <span className="text-xs text-[#8080A0] mx-1">+</span>
            <span className="text-sm text-white">{pack.designTokens.typography.body}</span>
          </div>
          {/* QR Art */}
          <div>
            <span className="text-xs text-[#8080A0] block mb-1">QR Style</span>
            <span className="text-sm text-white capitalize">{pack.designTokens.qrArt.dots} dots</span>
            <span className="text-xs text-[#8080A0] mx-1">|</span>
            <span className="text-sm text-white capitalize">{pack.designTokens.qrArt.frame} frame</span>
          </div>
        </div>
      </div>

      {/* 8 Design Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {DESIGN_TYPES.map(type => (
          <DesignPackPreview
            key={type.id}
            designType={type}
            templateId={pack.templates[type.id as keyof typeof pack.templates]}
          />
        ))}
      </div>

      {/* Tools in this pack */}
      <div className="mt-8 p-4 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl">
        <h3 className="text-sm font-bold text-[#8080A0] uppercase mb-3">
          Tools in this Pack ({pack.tools.length})
        </h3>
        <div className="flex flex-wrap gap-2">
          {pack.tools.map(toolId => (
            <span key={toolId} className="px-3 py-1.5 bg-[#1C1C2E] text-xs text-[#A89EFF] rounded-lg">
              {toolId.replace(/-/g, ' ')}
            </span>
          ))}
        </div>
      </div>

      {/* Download All Button */}
      <button className="mt-8 w-full py-3 bg-gradient-to-r from-[#7C6EFA] to-[#6C63FF] 
                        text-white font-bold rounded-xl hover:opacity-90 transition-opacity
                        flex items-center justify-center gap-2">
        <Download className="w-5 h-5" />
        Download Full Pack ({DESIGN_TYPES.length} designs)
      </button>
    </div>
  );
}
