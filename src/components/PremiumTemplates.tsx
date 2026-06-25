import React, { useState } from 'react';
import { Sparkles, Palette, Crown, Box, LayoutGrid, Image as ImageIcon, Download, ArrowLeft } from 'lucide-react';
import TemplateEditor from './TemplateEditor';

const CATEGORIES = ['All', 'Posters', 'vCards', 'Social Media', 'Badges', 'Events'];

const DUMMY_TEMPLATES = [
  {
    id: 1,
    title: 'Luxury Gold vCard',
    category: 'vCards',
    type: 'Pro',
    imgUrl: 'https://images.unsplash.com/photo-1594897030264-ab7d87efc473?auto=format&fit=crop&q=80&w=400',
    description: 'A stunning dark and gold layout for premium business contacts.'
  },
  {
    id: 2,
    title: 'Minimalist Cafe Menu',
    category: 'Posters',
    type: 'Free',
    imgUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400',
    description: 'Clean scan-to-view menu poster with natural aesthetic.'
  },
  {
    id: 3,
    title: 'Cyberpunk Event Pass',
    category: 'Events',
    type: 'Pro',
    imgUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=400',
    description: 'Neon styled entrance pass for modern tech events.'
  },
  {
    id: 4,
    title: 'Wedding RSVP Frame',
    category: 'Posters',
    type: 'Pro',
    imgUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400',
    description: 'Elegant floral border design for quick guest responses.'
  },
  {
    id: 5,
    title: 'Real Estate Signage',
    category: 'Posters',
    type: 'Free',
    imgUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=400',
    description: 'High visibility outdoor sign for property viewings.'
  },
  {
    id: 6,
    title: 'Instagram Follow Badge',
    category: 'Social Media',
    type: 'Free',
    imgUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=400',
    description: 'Bold gradient badge to grow your social audience.'
  },
  {
    id: 7,
    title: 'Scan Me Sticker Pack',
    category: 'Badges',
    type: 'Free',
    imgUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=400',
    description: 'High contrast circular stickers for product packaging.'
  },
  {
    id: 8,
    title: 'Corporate ID Card',
    category: 'vCards',
    type: 'Pro',
    imgUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
    description: 'Secure, professional identification badge layout.'
  }
];

export default function PremiumTemplates({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<any | null>(null);

  const filteredTemplates = activeTab === 'All' 
    ? DUMMY_TEMPLATES 
    : DUMMY_TEMPLATES.filter(t => t.category === activeTab);

  if (selectedTemplate) {
    return <TemplateEditor template={selectedTemplate} onBack={() => setSelectedTemplate(null)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#040408] text-[#F2F2FF] font-sans">
      
      {/* Header */}
      <header className="bg-[#0A0A12] border-b border-[#1C1C2E] px-8 py-5 flex items-center justify-between shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="text-[#8080A0] hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="h-6 w-px bg-[#1C1C2E]"></div>
          <div>
            <h1 className="font-syne text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#A89EFF]" />
              Premium Templates Gallery
            </h1>
            <p className="text-[11px] text-[#8080A0] mt-1 tracking-widest uppercase font-bold">
              AI-Generated Layouts & Posters
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-[#7C6EFA]/10 text-[#A89EFF] px-4 py-2 rounded-lg text-xs font-bold border border-[#7C6EFA]/20 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4" />
            Template Engine Active
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto flex">
        
        {/* Sidebar Filters */}
        <div className="w-56 bg-[#0A0A12]/50 border-r border-[#1C1C2E] p-6 hidden md:block">
          <h3 className="text-xs font-bold text-[#8080A0] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Palette className="w-3.5 h-3.5" /> Categories
          </h3>
          <div className="space-y-1.5">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === category 
                    ? 'bg-[#12121E] text-white border border-[#28283E]' 
                    : 'text-[#8080A0] hover:text-white hover:bg-[#12121E]/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.map(template => (
              <div 
                key={template.id} 
                className="group relative bg-[#0A0A12] border border-[#1C1C2E] rounded-2xl overflow-hidden hover:border-[#7C6EFA]/50 transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(124,110,250,0.15)] flex flex-col"
              >
                {/* Image Canvas Container */}
                <div className="aspect-[3/4] overflow-hidden relative bg-[#12121E]">
                  <img 
                    src={template.imgUrl} 
                    alt={template.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold tracking-wider text-white border border-white/10 uppercase">
                      {template.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    {template.type === 'Pro' ? (
                      <span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-md text-[10px] font-bold tracking-wider text-white uppercase flex items-center gap-1 shadow-lg">
                        <Crown className="w-3 h-3" /> PRO
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-[#1C1C2E]/80 backdrop-blur-md rounded-md text-[10px] font-bold tracking-wider text-[#A89EFF] border border-[#28283E] uppercase">
                        FREE
                      </span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm">
                    <button 
                      onClick={() => setSelectedTemplate(template)}
                      className="bg-[#7C6EFA] hover:bg-[#6b5ded] text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl"
                    >
                      <LayoutGrid className="w-4 h-4" /> Use Template
                    </button>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="p-4 bg-[#0A0A12] relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-syne text-base font-bold text-white mb-1 group-hover:text-[#A89EFF] transition-colors">
                      {template.title}
                    </h3>
                    <p className="text-xs text-[#8080A0] leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-[#1C1C2E] pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#8080A0] uppercase tracking-wider">
                      <ImageIcon className="w-3.5 h-3.5" /> High-DPI Vector
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
