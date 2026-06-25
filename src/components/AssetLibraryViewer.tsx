import React, { useState, useEffect } from 'react';
import { Layers, Image as ImageIcon, Box, Square, Grid, Tag, CheckCircle, ArrowLeft, Search, Cloud, Download } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  path: string;
}

interface Registry {
  categories: { id: string; label: string }[];
  assets: Record<string, Asset[]>;
}

export default function AssetLibraryViewer({ onBack }: { onBack: () => void }) {
  const [registry, setRegistry] = useState<Registry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('iconify-api');
  
  // Iconify State
  const [searchQuery, setSearchQuery] = useState('business');
  const [iconifyResults, setIconifyResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetch('/assets/registry.json')
      .then((res) => res.json())
      .then((data) => setRegistry(data))
      .catch((err) => console.error("Failed to load registry", err));
  }, []);

  // Iconify Search Effect
  useEffect(() => {
    if (activeCategory === 'iconify-api' && searchQuery.trim() !== '') {
      const delay = setTimeout(() => {
        searchIconify(searchQuery);
      }, 800);
      return () => clearTimeout(delay);
    }
  }, [activeCategory, searchQuery]);

  const searchIconify = async (query: string) => {
    setIsSearching(true);
    try {
      const res = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=48`);
      const data = await res.json();
      if (data && data.icons) {
        setIconifyResults(data.icons);
      } else {
        setIconifyResults([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  if (!registry) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#040408] text-[#8080A0]">
        <div className="flex flex-col items-center gap-3">
          <Layers className="h-8 w-8 animate-pulse text-[#7C6EFA]" />
          <p className="font-syne">Loading Asset System v1...</p>
        </div>
      </div>
    );
  }

  const categories = [
    { id: 'iconify-api', label: 'Cloud API (Iconify)' },
    ...registry.categories
  ];

  const currentAssets = activeCategory === 'iconify-api' ? [] : (registry.assets[activeCategory] || []);

  return (
    <div className="flex h-screen bg-[#040408] text-[#F2F2FF] font-sans">
      {/* Sidebar - Category Navigation */}
      <div className="w-64 bg-[#0A0A12] border-r border-[#1C1C2E] flex flex-col">
        <div className="p-6 border-b border-[#1C1C2E]">
          <button 
            onClick={onBack}
            className="text-[#8080A0] hover:text-white flex items-center gap-2 text-sm font-bold mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Generator
          </button>
          <h1 className="font-syne text-xl font-bold flex items-center gap-2 text-white">
            <Box className="h-6 w-6 text-[#7C6EFA]" />
            Asset Library
          </h1>
          <p className="text-xs text-[#8080A0] mt-1 tracking-wider uppercase">v1.0 Core Engine</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-[#28283E] scrollbar-track-transparent">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat.id 
                  ? cat.id === 'iconify-api' 
                    ? 'bg-gradient-to-r from-[#7C6EFA]/20 to-purple-500/20 text-[#A89EFF] border border-[#7C6EFA]/50'
                    : 'bg-[#12121E] text-[#A89EFF] border border-[#28283E]' 
                  : 'text-[#8080A0] hover:bg-[#12121E]/50 hover:text-white border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {getCategoryIcon(cat.id)}
                {cat.label}
              </div>
              {cat.id !== 'iconify-api' && (
                <span className="text-[10px] bg-black/40 py-0.5 px-2 rounded-full border border-[#1C1C2E] text-[#8080A0] font-bold">
                  {registry.assets[cat.id]?.length || 0}
                </span>
              )}
              {cat.id === 'iconify-api' && (
                <span className="text-[10px] bg-[#7C6EFA] py-0.5 px-2 rounded-full text-white font-bold animate-pulse">
                  LIVE
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Asset Grid */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[#0A0A12] border-b border-[#1C1C2E] px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shrink-0 gap-4">
          <div>
            <h2 className="font-syne text-2xl font-bold text-white capitalize flex items-center gap-2">
              {categories.find(c => c.id === activeCategory)?.label}
            </h2>
            <p className="text-sm text-[#8080A0] mt-1">
              {activeCategory === 'iconify-api' 
                ? 'Search 200,000+ open source vector icons dynamically.'
                : 'Select and manage scalable SVG assets for the Frame Engine.'}
            </p>
          </div>
          
          {activeCategory === 'iconify-api' ? (
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8080A0]" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live icons (e.g. 'rocket')"
                className="w-full bg-[#12121E] border border-[#28283E] rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#7C6EFA] transition-colors"
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-500/20 uppercase tracking-widest">
                <CheckCircle className="w-3.5 h-3.5" />
                System Active
              </div>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-8 bg-[#040408]">
          {activeCategory === 'iconify-api' ? (
            <>
              {isSearching ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-[#7C6EFA] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : iconifyResults.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                  <div className="w-16 h-16 bg-[#12121E] rounded-full flex items-center justify-center mb-4 border border-[#28283E]">
                    <Search className="h-8 w-8 text-[#8080A0]" />
                  </div>
                  <h3 className="font-syne text-lg font-bold text-white mb-1">No Results</h3>
                  <p className="text-[#8080A0] text-sm leading-relaxed">
                    Try searching for different keywords to fetch SVG vectors dynamically from the cloud API.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
                  {iconifyResults.map((icon) => (
                    <div key={icon} className="group relative bg-[#0A0A12] rounded-xl border border-[#1C1C2E] shadow-sm hover:border-[#7C6EFA] hover:shadow-[0_0_20px_rgba(124,110,250,0.15)] transition-all duration-200 flex flex-col overflow-hidden cursor-pointer">
                      <div className="aspect-square p-4 flex items-center justify-center relative bg-black/40 border-b border-[#1C1C2E]">
                        <img 
                          src={`https://api.iconify.design/${icon}.svg?color=%23F2F2FF`} 
                          alt={icon} 
                          className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-125" 
                        />
                      </div>
                      <div className="p-2 bg-[#0A0A12]">
                        <p className="text-[9px] text-[#8080A0] font-mono truncate text-center" title={icon}>
                          {icon.split(':')[1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : currentAssets.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-[#12121E] rounded-full flex items-center justify-center mb-4 border border-[#28283E]">
                <ImageIcon className="h-8 w-8 text-[#8080A0]" />
              </div>
              <h3 className="font-syne text-lg font-bold text-white mb-1">No Assets Yet</h3>
              <p className="text-[#8080A0] text-sm leading-relaxed">
                The "{activeCategory}" category is currently empty. We will populate this with high-quality SVGs as we build the library.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {currentAssets.map((asset) => (
                <div key={asset.id} className="group relative bg-[#0A0A12] rounded-xl border border-[#1C1C2E] shadow-sm hover:border-[#7C6EFA] hover:shadow-[0_0_20px_rgba(124,110,250,0.15)] transition-all duration-200 flex flex-col overflow-hidden">
                  <div className="aspect-square p-4 flex items-center justify-center relative overflow-hidden bg-black/40 border-b border-[#1C1C2E]">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                    <img 
                      src={asset.path} 
                      alt={asset.name} 
                      className={`max-w-full max-h-full object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 ${activeCategory === 'patterns' ? 'w-full h-full object-cover' : ''} ${asset.id.includes('border') ? 'p-2' : ''}`} 
                    />
                  </div>
                  <div className="p-3 bg-[#0A0A12]">
                    <h4 className="text-xs font-bold text-white truncate" title={asset.name}>{asset.name}</h4>
                    <p className="text-[10px] text-[#8080A0] font-mono mt-0.5 truncate uppercase tracking-wider">.svg</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case 'iconify-api': return <Cloud className="h-4 w-4 text-[#7C6EFA]" />;
    case 'borders': return <Square className="h-4 w-4" />;
    case 'patterns': return <Grid className="h-4 w-4" />;
    case 'stickers': return <Tag className="h-4 w-4" />;
    case 'corners': return <Box className="h-4 w-4" />;
    case 'backgrounds': return <ImageIcon className="h-4 w-4" />;
    default: return <Layers className="h-4 w-4" />;
  }
}

