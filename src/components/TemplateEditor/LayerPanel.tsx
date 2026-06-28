import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../../design-system';
import { Eye, EyeOff, Lock, Unlock, GripVertical, Layers, QrCode, Type, Image, Square, Frame, Sticker, SquareStack, Plus } from 'lucide-react';
import type { AnyLayer, LayerType } from '../../data/template-schema';

const LAYER_ICONS: Record<LayerType, React.ReactNode> = {
  qr: <QrCode className="w-3.5 h-3.5" />,
  text: <Type className="w-3.5 h-3.5" />,
  image: <Image className="w-3.5 h-3.5" />,
  shape: <Square className="w-3.5 h-3.5" />,
  frame: <Frame className="w-3.5 h-3.5" />,
  sticker: <Sticker className="w-3.5 h-3.5" />,
  background: <SquareStack className="w-3.5 h-3.5" />,
};

export interface LayerPanelProps {
  layers: AnyLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDeleteLayer: (id: string) => void;
  onReorderLayers: (fromIdx: number, toIdx: number) => void;
  onAddLayer: (type: LayerType) => void;
}

export function LayerPanel({
  layers, selectedLayerId, onSelectLayer,
  onToggleVisibility, onToggleLock, onDeleteLayer,
  onReorderLayers, onAddLayer,
}: LayerPanelProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const sortedLayers = [...layers].sort((a, b) => b.zIndex - a.zIndex); // top layer first

  return (
    <div className="bg-[#040408] border border-[#1C1C2E] rounded-xl p-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-[#8080A0] uppercase tracking-wider flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Layers
        </h3>
        <span className="text-[10px] text-[#4E4E6E]">{layers.length}</span>
      </div>

      {/* Layer List */}
      <div className="flex flex-col gap-0.5 mb-3">
        {sortedLayers.map((layer) => {
          const realIdx = layers.indexOf(layer);
          const isSelected = layer.id === selectedLayerId;
          return (
            <div
              key={layer.id}
              className={cn(
                "flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-all",
                "text-[11px] font-medium",
                "hover:bg-[#12121E]",
                isSelected && "bg-[#12121E] border border-[#7C6EFA]"
              )}
              onClick={() => onSelectLayer(layer.id)}
            >
              {/* Drag handle */}
              <div className="cursor-grab active:cursor-grabbing text-[#4E4E6E] hover:text-[#8080A0]"
                draggable
                onDragStart={() => setDragIdx(realIdx)}
                onDragOver={(e) => { e.preventDefault(); }}
                onDrop={() => { if (dragIdx !== null) { onReorderLayers(dragIdx, realIdx); setDragIdx(null); } }}
              >
                <GripVertical className="w-3 h-3" />
              </div>
              
              {/* Type icon */}
              <span className="text-[#8080A0]">{LAYER_ICONS[layer.type]}</span>
              
              {/* Name */}
              <span className="flex-1 truncate text-white">{layer.name}</span>
              
              {/* Visibility */}
              <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(layer.id); }}
                className={cn("p-0.5 rounded", layer.visible ? "text-[#8080A0]" : "text-[#4E4E6E]")}>
                {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </button>
              
              {/* Lock */}
              <button onClick={(e) => { e.stopPropagation(); onToggleLock(layer.id); }}
                className={cn("p-0.5 rounded", layer.locked ? "text-amber-400" : "text-[#4E4E6E]")}>
                {layer.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Add Layer Button */}
      <Button
        variant="secondary"
        size="sm"
        fullWidth
        icon={<Plus className="w-3 h-3" />}
        className="text-[#8080A0] bg-transparent border border-[#28283E]"
        onClick={() => {
          // Default to text
          onAddLayer('text');
        }}
      >
        Add Layer
      </Button>
    </div>
  );
}
