import React from 'react';
import { cn } from '../../lib/utils';
import { Select, Input } from '../../design-system';
import { AVAILABLE_FONTS } from '../../data/template-schema';
import type { TextLayer } from '../../data/template-schema';

export interface TypographyControlsProps {
  layer: TextLayer;
  onChange: (updates: Partial<TextLayer>) => void;
}

const FONT_OPTIONS = AVAILABLE_FONTS.map(f => ({
  value: f.family,
  label: `${f.family} (${f.category})` + (f.supportsHindi ? ' — हिंदी' : ''),
}));

const FONT_WEIGHT_OPTIONS = [
  { value: '400', label: 'Regular (400)' },
  { value: '500', label: 'Medium (500)' },
  { value: '600', label: 'Semi Bold (600)' },
  { value: '700', label: 'Bold (700)' },
  { value: '800', label: 'Extra Bold (800)' },
];

const TEXT_ALIGN_OPTIONS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
  { value: 'justify', label: 'Justify' },
];

export function TypographyControls({ layer, onChange }: TypographyControlsProps) {
  const selectedFont = AVAILABLE_FONTS.find(f => f.family === layer.fontFamily);

  // Load web font if not already loaded
  React.useEffect(() => {
    if (selectedFont && !document.fonts.check(`1em "${layer.fontFamily}"`)) {
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.googleFontName}:wght@${selectedFont.weights.join(';')}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, [layer.fontFamily, selectedFont]);

  return (
    <div className="space-y-4">
      <h4 className="text-[11px] font-bold text-[#8080A0] uppercase tracking-wider">
        Typography
      </h4>

      <Select
        label="Font Family"
        options={FONT_OPTIONS}
        value={layer.fontFamily}
        onChange={(e) => onChange({ fontFamily: e.target.value })}
      />

      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Weight"
          options={FONT_WEIGHT_OPTIONS}
          value={String(layer.fontWeight)}
          onChange={(e) => onChange({ fontWeight: Number(e.target.value) })}
        />
        <Input
          label="Font Size (px)"
          type="number"
          value={String(layer.fontSize)}
          onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
          min={8}
          max={200}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Line Height"
          type="number"
          value={String(layer.lineHeight)}
          onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
          step={0.1}
          min={0.5}
          max={3}
        />
        <Input
          label="Letter Spacing (px)"
          type="number"
          value={String(layer.letterSpacing)}
          onChange={(e) => onChange({ letterSpacing: Number(e.target.value) })}
          step={0.5}
          min={-5}
          max={20}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Color"
          type="color"
          value={layer.color}
          onChange={(e) => onChange({ color: e.target.value })}
          className="h-10"
        />
        <Select
          label="Text Alignment"
          options={TEXT_ALIGN_OPTIONS}
          value={layer.textAlign}
          onChange={(e) => onChange({ textAlign: e.target.value as any })}
        />
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={layer.autoWrap} onChange={(e) => onChange({ autoWrap: e.target.checked })}
            className="rounded border-[#28283E]" />
          <span className="text-[11px] font-medium text-white">Auto Wrap</span>
        </label>
        {layer.autoWrap && (
          <Input label="Max Lines" type="number" value={String(layer.maxLines)} onChange={(e) => onChange({ maxLines: Number(e.target.value) })} min={0} max={20} className="w-20" />
        )}
      </div>

      {/* Preview of selected font */}
      <div className="p-3 rounded-lg border border-[#1C1C2E] bg-[#0A0A12] mt-2">
        <p className="text-[10px] text-[#4E4E6E] mb-1">Preview:</p>
        <p style={{
          fontFamily: `"${layer.fontFamily}", sans-serif`,
          fontWeight: layer.fontWeight,
          fontSize: `${Math.min(layer.fontSize, 28)}px`,
          lineHeight: layer.lineHeight,
          letterSpacing: `${layer.letterSpacing}px`,
          textAlign: layer.textAlign,
          color: layer.color || 'white',
        }}>
          {layer.content || 'The quick brown fox jumps over the lazy dog. अ आ क ख ग घ'}
        </p>
      </div>
    </div>
  );
}
