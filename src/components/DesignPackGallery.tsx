import React from 'react';
import { PACK_CATEGORIES } from '../data/design-packs';

interface Props {
  onSelectPack: (packId: string) => void;
  searchQuery?: string;
  filterPremium?: boolean;
}

export default function DesignPackGallery({ onSelectPack, searchQuery = '', filterPremium }: Props) {
  const packs = PACK_CATEGORIES.filter(p => {
    if (filterPremium && !p.isPremium) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {packs.map(pack => (
        <button
          key={pack.id}
          onClick={() => onSelectPack(pack.id)}
          className="group relative bg-[#0A0A12] border border-[#1C1C2E] hover:border-[#7C6EFA]/40 
                     rounded-2xl p-6 text-left transition-all duration-300
                     hover:shadow-[0_0_30px_rgba(124,110,250,0.08)]"
        >
          {/* Industry Icon */}
          <div className="text-4xl mb-4">{pack.icon}</div>
          
          {/* Pack Name */}
          <h3 className="text-lg font-bold text-white group-hover:text-[#7C6EFA] transition-colors">
            {pack.name}
          </h3>
          
          {/* Stats */}
          <div className="flex gap-3 mt-3 text-xs text-[#8080A0]">
            <span>{pack.templateCount} templates</span>
            <span>•</span>
            <span>{pack.toolCount} tools</span>
          </div>
          
          {/* Premium Badge */}
          {pack.isPremium && (
            <span className="absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] 
                           text-black text-[10px] font-extrabold rounded-md uppercase">
              Premium
            </span>
          )}
          
          {/* Hover effect - subtle glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7C6EFA]/0 via-transparent to-[#7C6EFA]/0 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </button>
      ))}
    </div>
  );
}
