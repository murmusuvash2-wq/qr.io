import React from 'react';
import type { AnyLayer } from '../../data/template-schema';
import { TypographyControls } from './TypographyControls';

interface PropertyPanelProps {
  layer: AnyLayer | undefined;
  onUpdate: (id: string, updates: Partial<AnyLayer>) => void;
}

export function PropertyPanel({ layer, onUpdate }: PropertyPanelProps) {
  if (!layer) return null;

  return (
    <div className="space-y-4">
      {layer.type === 'text' && (
        <div className="p-3 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl">
          <TypographyControls
            layer={layer as any}
            onChange={(updates) => onUpdate(layer.id, updates)}
          />
        </div>
      )}
      
      {layer.type === 'qr' && (
        <div className="p-3 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl text-[11px] text-[#8080A0]">
          QR Code properties (color, style) would go here.
        </div>
      )}

      {layer.type === 'background' && (
        <div className="p-3 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl text-[11px] text-[#8080A0]">
          Background properties (image, gradient) would go here.
        </div>
      )}
    </div>
  );
}
