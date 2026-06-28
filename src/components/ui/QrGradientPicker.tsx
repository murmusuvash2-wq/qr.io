import React from "react";
import { cn } from "../../lib/utils";
import { Input } from "../../design-system";

export interface GradientConfig {
  from: string;
  to: string;
  angle: number; // 0-360 degrees
}

export interface QrGradientPickerProps {
  value?: GradientConfig;
  onChange: (gradient: GradientConfig | undefined) => void;
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const PRESET_GRADIENTS: GradientConfig[] = [
  { from: '#7C6EFA', to: '#C084FC', angle: 135 },  // Purple to Pink
  { from: '#F59E0B', to: '#EF4444', angle: 135 },    // Amber to Red
  { from: '#10B981', to: '#3B82F6', angle: 135 },    // Emerald to Blue
  { from: '#EC4899', to: '#8B5CF6', angle: 135 },    // Pink to Violet
  { from: '#F97316', to: '#F59E0B', angle: 135 },    // Orange to Amber
  { from: '#06B6D4', to: '#8B5CF6', angle: 135 },    // Cyan to Violet
];

export function QrGradientPicker({ value, onChange, enabled, onToggle }: QrGradientPickerProps) {
  return (
    <div className="space-y-3">
      {/* Toggle */}
      <label className="flex items-center gap-3 cursor-pointer">
        <div className={cn(
          "w-9 h-5 rounded-full transition-all",
          enabled ? "bg-[var(--ez-border-focus)]" : "bg-[var(--ez-bg-inset)]",
          "relative"
        )}>
          <input
            type="checkbox"
            className="sr-only peer"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
          />
          <div className={cn(
            "absolute top-[2px] left-[2px] w-3.5 h-3.5 rounded-full bg-white transition-all",
            enabled && "translate-x-4"
          )} />
        </div>
        <span className="text-[var(--ez-text-xs)] font-bold text-[var(--ez-text-primary)]">
          Enable Gradient
        </span>
      </label>

      {enabled && (
        <>
          {/* Presets */}
          <div className="flex flex-wrap gap-2 mt-2">
            {PRESET_GRADIENTS.map((g, i) => (
              <button
                key={i}
                onClick={() => onChange(g)}
                className={cn(
                  "w-8 h-8 rounded-full border-2 transition-all",
                  value?.from === g.from && value?.to === g.to
                    ? "border-[var(--ez-border-focus)] scale-110"
                    : "border-transparent hover:scale-110"
                )}
                style={{ background: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})` }}
                title={`${g.from} → ${g.to}`}
              />
            ))}
          </div>

          {/* Custom */}
          <div className="grid grid-cols-2 gap-3 mt-2">
            <Input
              label="From Color"
              type="color"
              value={value?.from || '#7C6EFA'}
              onChange={(e) => onChange({ ...value!, from: e.target.value, angle: value?.angle || 135 })}
            />
            <Input
              label="To Color"
              type="color"
              value={value?.to || '#C084FC'}
              onChange={(e) => onChange({ ...value!, to: e.target.value, angle: value?.angle || 135 })}
            />
          </div>
        </>
      )}
    </div>
  );
}
