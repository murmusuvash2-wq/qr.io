import React from 'react';
import { Button } from '../../design-system';

interface AlignmentToolbarProps {
  onAlign: (align: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  safeZoneGuides: boolean;
  onToggleSafeZone: (show: boolean) => void;
}

export function AlignmentToolbar({ onAlign, safeZoneGuides, onToggleSafeZone }: AlignmentToolbarProps) {
  return (
    <div className="flex items-center gap-2 mb-3 p-2 bg-[#040408] border border-[#1C1C2E] rounded-xl">
      <Button variant="ghost" size="sm" onClick={() => onAlign('left')}>Left</Button>
      <Button variant="ghost" size="sm" onClick={() => onAlign('center')}>Center</Button>
      <Button variant="ghost" size="sm" onClick={() => onAlign('right')}>Right</Button>
      <div className="w-px h-4 bg-[#1C1C2E] mx-1" />
      <label className="flex items-center gap-1.5 text-[11px] font-medium text-[#8080A0] cursor-pointer pl-2">
        <input 
          type="checkbox" 
          checked={safeZoneGuides}
          onChange={(e) => onToggleSafeZone(e.target.checked)} 
          className="rounded border-[#28283E]" 
        />
        Safe Zone Guides
      </label>
    </div>
  );
}
