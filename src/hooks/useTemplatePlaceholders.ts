import { useMemo } from 'react';
import { TOOL_PLACEHOLDERS } from '../data/template-schema';
import type { PlaceholderDef } from '../data/template-schema';
import type { QRTool } from '../data/tools';

/**
 * Get placeholder definitions for a tool
 */
export function getPlaceholdersForTool(toolId: string): PlaceholderDef[] {
  if (!toolId) return [];
  
  const id = toolId.toLowerCase();
  if (id.includes('wifi')) return TOOL_PLACEHOLDERS.wifi || [];
  if (id.includes('vcard') || id.includes('contact') || id.includes('mecard')) return TOOL_PLACEHOLDERS.vcard || [];
  if (id.includes('upi') || id.includes('payment')) return TOOL_PLACEHOLDERS.upi || [];
  if (id.includes('url') || id.includes('link') || id.includes('website')) return TOOL_PLACEHOLDERS.url || [];
  
  return [];
}

/**
 * Hook: map form values to placeholder values for template engine
 */
export function useTemplatePlaceholders(tool: QRTool | null, formValues: Record<string, string>) {
  return useMemo(() => {
    if (!tool) return {};
    
    const placeholders = getPlaceholdersForTool(tool.id);
    const mapped: Record<string, string> = {};
    
    for (const ph of placeholders) {
      // Try to auto-map from form values
      if (ph.toolFieldId && formValues[ph.toolFieldId]) {
        mapped[ph.key] = formValues[ph.toolFieldId];
      } else {
        mapped[ph.key] = ph.defaultValue;
      }
    }
    
    return mapped;
  }, [tool, formValues]);
}
