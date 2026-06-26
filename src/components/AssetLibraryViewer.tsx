import React, { useState, useEffect } from 'react';
import { 
  Layers, Image as ImageIcon, Box, Square, Grid, Tag, CheckCircle, 
  ArrowLeft, Search, Cloud, Plus, Filter, Code, Trash2, HelpCircle, Sparkles, AlertCircle
} from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  path: string;
  tags: string[];
  category: string;
}

interface Registry {
  categories: { id: string; label: string }[];
  assets: Record<string, Asset[]>;
}

export default function AssetLibraryViewer({ onBack }: { onBack: () => void }) {
  const [registry, setRegistry] = useState<Registry | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  
  // Custom asset registration state
  const [showImportForm, setShowImportForm] = useState(false);
  const [importCategory, setImportCategory] = useState<string>('backgrounds');
  const [importName, setImportName] = useState('');
  const [importPath, setImportPath] = useState('');
  const [importTags, setImportTags] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState<string | null>(null);

  // Load registry and custom assets
  useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = () => {
    fetch('/assets/registry.json')
      .then((res) => res.json())
      .then((data: Registry) => {
        // Merge with custom registered assets stored in localStorage
        const storedCustom = localStorage.getItem('ezqr_custom_assets_v1');
        if (storedCustom) {
          try {
            const customList: Asset[] = JSON.parse(storedCustom);
            const updatedAssets = { ...data.assets };
            
            customList.forEach((asset) => {
              const cat = asset.category || 'backgrounds';
              if (!updatedAssets[cat]) {
                updatedAssets[cat] = [];
              }
              // Prevent duplicates
              if (!updatedAssets[cat].some(a => a.id === asset.id)) {
                updatedAssets[cat].push(asset);
              }
            });
            
            setRegistry({
              ...data,
              assets: updatedAssets
            });
          } catch (e) {
            console.error("Failed to parse custom assets", e);
            setRegistry(data);
          }
        } else {
          setRegistry(data);
        }
      })
      .catch((err) => console.error("Failed to load registry", err));
  };

  if (!registry) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#07070F] text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <Layers className="h-8 w-8 animate-pulse text-[#7C6EFA]" />
          <p className="font-syne text-sm font-bold">Initializing High-Precision Asset Matrix...</p>
        </div>
      </div>
    );
  }

  // Gather all assets
  const allAssetsList: Asset[] = [];
  Object.keys(registry.assets).forEach((cat) => {
    registry.assets[cat].forEach((asset) => {
      allAssetsList.push(asset);
    });
  });

  // Unique tags for filter pills
  const availableTags = Array.from(
    new Set(allAssetsList.flatMap((a) => a.tags || []))
  ).filter(t => t.trim() !== '');

  // Filter assets
  const filteredAssets = allAssetsList.filter((asset) => {
    // Category check
    if (activeCategory !== 'all' && asset.category !== activeCategory) {
      return false;
    }
    // Search query check (name, ID, path, tags)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = asset.name.toLowerCase().includes(q);
      const matchesId = asset.id.toLowerCase().includes(q);
      const matchesPath = asset.path.toLowerCase().includes(q);
      const matchesTags = asset.tags?.some(t => t.toLowerCase().includes(q)) || false;
      if (!matchesName && !matchesId && !matchesPath && !matchesTags) {
        return false;
      }
    }
    // Tag pill check
    if (selectedTag !== 'all' && !asset.tags?.includes(selectedTag)) {
      return false;
    }
    return true;
  });

  // Calculate next Asset ID based on category selected
  const getNextAssetId = (cat: string) => {
    const list = registry.assets[cat] || [];
    const prefix = cat === 'backgrounds' ? 'BG' 
                 : cat === 'borders' ? 'FRAME' 
                 : cat === 'patterns' ? 'PATTERN' 
                 : cat === 'stickers' ? 'STICKER' 
                 : 'ICON';
    
    // Find highest index
    let maxNum = 0;
    list.forEach(item => {
      const parts = item.id.split('-');
      if (parts.length === 2) {
        const num = parseInt(parts[1], 10);
        if (!isNaN(num) && num > maxNum) {
          maxNum = num;
        }
      }
    });
    
    const nextNum = maxNum + 1;
    return `${prefix}-${String(nextNum).padStart(6, '0')}`;
  };

  // Handle register asset form submit
  const handleRegisterAsset = (e: React.FormEvent) => {
    e.preventDefault();
    setImportError(null);
    setImportSuccess(null);

    if (!importName.trim()) {
      setImportError("Please specify an elegant friendly name for this design asset.");
      return;
    }
    if (!importPath.trim()) {
      setImportError("Please specify a source value. Use an SVG file path, HEX color string, or symbol character.");
      return;
    }

    const generatedId = getNextAssetId(importCategory);
    const splitTags = importTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t !== '');

    const newAsset: Asset = {
      id: generatedId,
      name: importName.trim(),
      path: importPath.trim(),
      tags: splitTags.length > 0 ? splitTags : ["custom", "imported"],
      category: importCategory
    };

    // Save to localStorage
    const storedCustom = localStorage.getItem('ezqr_custom_assets_v1');
    let customList: Asset[] = [];
    if (storedCustom) {
      try {
        customList = JSON.parse(storedCustom);
      } catch {}
    }
    customList.push(newAsset);
    localStorage.setItem('ezqr_custom_assets_v1', JSON.stringify(customList));

    // Reload state
    loadRegistry();

    // Reset fields
    setImportName('');
    setImportPath('');
    setImportTags('');
    setImportSuccess(`Successfully registered high-contrast Asset ID: ${generatedId}`);
    
    setTimeout(() => {
      setImportSuccess(null);
    }, 4000);
  };

  const handleDeleteCustomAsset = (assetId: string) => {
    const storedCustom = localStorage.getItem('ezqr_custom_assets_v1');
    if (storedCustom) {
      try {
        const customList: Asset[] = JSON.parse(storedCustom);
        const filtered = customList.filter(a => a.id !== assetId);
        localStorage.setItem('ezqr_custom_assets_v1', JSON.stringify(filtered));
        loadRegistry();
      } catch (e) {
        console.error("Failed to delete asset", e);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07070C] text-[#E0E0FF] font-sans flex flex-col selection:bg-indigo-500/20">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#110B29] to-transparent opacity-40 pointer-events-none" />

      {/* Main Header */}
      <header className="border-b border-[#1C1C2E] bg-[#07070C]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all flex items-center justify-center"
              title="Back to Control Center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="font-syne text-xl font-bold flex items-center gap-2 text-white">
                <Layers className="h-5 w-5 text-[#7C6EFA]" />
                Design Asset Library Registry
              </h1>
              <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest mt-0.5">
                Phase 1 Database Control Hub
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID (e.g. BG-001) or tags..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C6EFA] text-xs text-white pl-9 pr-4 py-2 rounded-xl outline-none transition-all placeholder-slate-600"
              />
            </div>

            {/* Register Trigger */}
            <button 
              onClick={() => setShowImportForm(!showImportForm)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                showImportForm 
                  ? 'bg-red-950 border-red-900/60 text-red-200 hover:bg-red-900/40' 
                  : 'bg-[#7C6EFA] hover:bg-indigo-600 border-[#7C6EFA] text-white hover:shadow-[0_0_15px_rgba(124,110,250,0.3)]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              {showImportForm ? "Close Form" : "Import Asset"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        
        {/* Left column: Categories & Filter Tag pills */}
        <div className="lg:col-span-1 space-y-5">
          {/* Categories card */}
          <div className="bg-[#0D0D19]/60 border border-[#1F1F35] rounded-2xl p-4 space-y-2.5">
            <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block mb-1">
              Asset Categories
            </span>
            
            <button
              onClick={() => setActiveCategory('all')}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                activeCategory === 'all' 
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                  : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className="flex items-center gap-2">
                <Grid className="w-3.5 h-3.5" />
                All Library Assets
              </span>
              <span className="text-[10px] font-mono text-slate-500">{allAssetsList.length}</span>
            </button>

            {registry.categories.map((cat) => {
              const count = registry.assets[cat.id]?.length || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    activeCategory === cat.id 
                      ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' 
                      : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {getCategoryIcon(cat.id)}
                    {cat.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Aesthetic tags filter */}
          <div className="bg-[#0D0D19]/60 border border-[#1F1F35] rounded-2xl p-4 space-y-3">
            <span className="text-[10px] uppercase font-extrabold text-slate-500 tracking-wider block">
              Search Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  selectedTag === 'all'
                    ? 'bg-white text-black'
                    : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                * All
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all flex items-center gap-1 ${
                    selectedTag === tag
                      ? 'bg-[#7C6EFA] text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Form or Asset Grid */}
        <div className="lg:col-span-3 space-y-5">
          {/* Collapsible Admin Import form */}
          {showImportForm && (
            <div className="bg-[#0D0D1A] border border-indigo-950/50 rounded-2xl p-6 space-y-4 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 text-indigo-900 pointer-events-none">
                <Sparkles className="w-12 h-12 opacity-10" />
              </div>
              <div className="border-b border-indigo-950/60 pb-3">
                <h3 className="font-syne text-md font-bold text-white flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-[#7C6EFA]" />
                  Import Custom Design Asset
                </h3>
                <p className="text-[10px] text-slate-500">
                  Instantly register vector components to the ecosystem registry with automatic Asset ID assignments.
                </p>
              </div>

              {importError && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-xl text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {importSuccess && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-900/60 rounded-xl text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{importSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRegisterAsset} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block">
                    1. Asset Class Category
                  </label>
                  <select
                    value={importCategory}
                    onChange={(e) => setImportCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl text-xs text-white p-3 outline-none focus:border-[#7C6EFA]"
                  >
                    <option value="backgrounds">Backgrounds (BG-XXXXXX)</option>
                    <option value="borders">Borders & Frames (FRAME-XXXXXX)</option>
                    <option value="patterns">Patterns & Overlays (PATTERN-XXXXXX)</option>
                    <option value="stickers">Stickers & Badges (STICKER-XXXXXX)</option>
                    <option value="icons">Brand Icons (ICON-XXXXXX)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block">
                    2. Elegant Friendly Name
                  </label>
                  <input
                    type="text"
                    value={importName}
                    onChange={(e) => setImportName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C6EFA] rounded-xl text-xs text-white p-3 outline-none"
                    placeholder="e.g. Royal Velvet Gold Dust"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block">
                    3. Dynamic Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={importTags}
                    onChange={(e) => setImportTags(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C6EFA] rounded-xl text-xs text-white p-3 outline-none"
                    placeholder="e.g. luxury, gold, dark, hospitality"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-extrabold tracking-wider block">
                    4. Asset Source Value / Path
                  </label>
                  <input
                    type="text"
                    value={importPath}
                    onChange={(e) => setImportPath(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-[#7C6EFA] rounded-xl text-xs text-white p-3 outline-none font-mono"
                    placeholder="e.g. #0F0E14, ☕, or /assets/borders/my-frame.svg"
                  />
                </div>

                <div className="md:col-span-2 pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#7C6EFA] hover:bg-indigo-600 border border-[#7C6EFA] hover:shadow-[0_0_15px_rgba(124,110,250,0.4)] text-xs text-white uppercase font-extrabold tracking-wider rounded-xl transition-all"
                  >
                    Register and Sync Asset ID
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid of filtered assets */}
          {filteredAssets.length === 0 ? (
            <div className="bg-[#0D0D19]/40 border border-[#1F1F35] rounded-3xl p-16 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800 mx-auto">
                <Search className="h-6 w-6 text-slate-500" />
              </div>
              <h3 className="font-syne text-md font-bold text-white mb-1">No Assets Match Filters</h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                We couldn't find any library assets matching query "{searchQuery}" or tag filter "{selectedTag}". Try modifying search parameters or import a new asset.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {filteredAssets.map((asset) => {
                const isCustom = asset.id.includes('BG-00000') || asset.id.includes('FRAME-00000') || asset.id.includes('PATTERN-00000') || asset.id.includes('STICKER-00000') || asset.id.includes('ICON-00000') 
                  ? false // static registry
                  : true; // user custom imported

                return (
                  <div 
                    key={asset.id} 
                    className="group relative bg-[#0D0D19]/60 border border-[#1F1F35] hover:border-[#7C6EFA]/40 rounded-2xl p-4 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(124,110,250,0.04)] transition-all duration-200"
                  >
                    {/* Visual Asset Thumbnail Preview */}
                    <div className="aspect-square w-full rounded-xl bg-slate-950 border border-slate-900 relative overflow-hidden flex items-center justify-center p-4">
                      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                      
                      {/* Render based on Asset Category */}
                      {asset.category === 'backgrounds' && (
                        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" style={{ backgroundColor: asset.path.startsWith('#') ? asset.path : '#0F0E14' }} />
                      )}

                      {asset.category === 'borders' && (
                        <div className="absolute inset-2 border-2 border-dashed border-yellow-500/30 rounded-lg flex items-center justify-center text-[10px] text-slate-600 font-mono">
                          {asset.name} Frame Box
                        </div>
                      )}

                      {asset.category === 'patterns' && (
                        <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
                      )}

                      {asset.category === 'stickers' && (
                        <span className="bg-yellow-500 text-black font-extrabold text-[10px] px-3 py-1 rounded-full shadow-lg">
                          {asset.name.split(' ')[0] || '🎀'} Badge
                        </span>
                      )}

                      {asset.category === 'icons' && (
                        <span className="text-4xl filter drop-shadow-[0_4px_10px_rgba(124,110,250,0.3)] transition-transform duration-300 group-hover:scale-125">
                          {asset.path}
                        </span>
                      )}

                      {/* Floating Category Badge */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/95 border border-slate-800 text-[8px] font-extrabold uppercase rounded-md tracking-wider text-slate-400">
                        {asset.category}
                      </span>

                      {/* Delete Custom Asset action */}
                      {isCustom && (
                        <button
                          onClick={() => handleDeleteCustomAsset(asset.id)}
                          className="absolute top-2 right-2 p-1.5 bg-red-950 hover:bg-red-900 border border-red-900 text-red-200 rounded-lg transition-all"
                          title="Delete Custom Asset"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Metadata Details */}
                    <div className="pt-3">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#7C6EFA] transition-colors truncate" title={asset.name}>
                          {asset.name}
                        </h4>
                        <span className="font-mono text-[9px] font-extrabold text-indigo-400 bg-indigo-950/40 border border-indigo-950 px-1.5 py-0.5 rounded">
                          {asset.id}
                        </span>
                      </div>
                      
                      <p className="text-[10px] text-slate-500 font-mono mt-1.5 truncate">
                        Source: <span className="text-slate-400">{asset.path}</span>
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {asset.tags?.map(t => (
                          <span key={t} className="text-[9px] bg-slate-900 text-slate-400 border border-slate-800/60 px-2 py-0.5 rounded-md lowercase">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function getCategoryIcon(categoryId: string) {
  switch (categoryId) {
    case 'backgrounds': return <ImageIcon className="h-3.5 w-3.5" />;
    case 'borders': return <Square className="h-3.5 w-3.5" />;
    case 'patterns': return <Grid className="h-3.5 w-3.5" />;
    case 'stickers': return <Tag className="h-3.5 w-3.5" />;
    case 'icons': return <Box className="h-3.5 w-3.5" />;
    default: return <Layers className="h-3.5 w-3.5" />;
  }
}
