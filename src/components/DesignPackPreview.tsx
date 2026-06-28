import React from 'react';
import { Download, Eye } from 'lucide-react';

interface Props {
  designType: { id: string; name: string; icon: string; desc: string };
  templateId: string;
}

export default function DesignPackPreview({ designType, templateId }: Props) {
  return (
    <div className="bg-[#0A0A12] border border-[#1C1C2E] rounded-xl p-4
                    hover:border-[#7C6EFA]/40 transition-all group">
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-gradient-to-br from-[#1C1C2E] to-[#0A0A12] 
                      rounded-lg mb-3 flex items-center justify-center
                      border border-[#1C1C2E] group-hover:border-[#7C6EFA]/20 transition-colors">
        <span className="text-4xl opacity-50">{designType.icon}</span>
      </div>
      
      {/* Info */}
      <h4 className="text-sm font-bold text-white">{designType.name}</h4>
      <p className="text-[10px] text-[#8080A0] mt-0.5">{designType.desc}</p>
      <p className="text-[10px] text-[#4E4E6E] mt-1 font-mono">{templateId}</p>
      
      {/* Actions */}
      <div className="flex gap-2 mt-3">
        <button className="flex-1 py-1.5 bg-[#1C1C2E] hover:bg-[#28283E] text-xs text-white 
                        rounded-lg flex items-center justify-center gap-1 transition-colors">
          <Eye className="w-3 h-3" /> Preview
        </button>
        <button className="flex-1 py-1.5 bg-[#7C6EFA] hover:bg-[#6C63FF] text-xs text-white 
                        rounded-lg flex items-center justify-center gap-1 transition-colors">
          <Download className="w-3 h-3" /> Download
        </button>
      </div>
    </div>
  );
}
