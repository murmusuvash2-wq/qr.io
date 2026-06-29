// src/utils/tool-helpers.ts
import { Link, Wifi, CreditCard, FileText, MessageCircle, Phone, Globe } from 'lucide-react';
import { TOOLS_DATABASE } from '../data/tools-database';
import type { QRTool } from '../data/tools-database';

export const getToolIcon = (type: string) => {
  switch (type) {
    case 'url': return <Link className="w-5 h-5" />;
    case 'wifi': return <Wifi className="w-5 h-5" />;
    case 'crypto': return <CreditCard className="w-5 h-5" />;
    case 'vcard': return <FileText className="w-5 h-5" />;
    case 'whatsapp': return <MessageCircle className="w-5 h-5" />;
    case 'phone': return <Phone className="w-5 h-5" />;
    default: return <Globe className="w-5 h-5" />;
  }
};

export const UI_CATEGORIES = [
  { label: 'All', filter: () => true },
  { label: '🏢 Business', filter: (t: QRTool) => t.category === 'B2B & Compliance' || t.category === 'Real Estate & Auto' || t.category === 'Crypto & Payments' || t.category === 'Business' },
  { label: '🍽️ Restaurant', filter: (t: QRTool) => t.category === 'Restaurant & Hospitality' },
  { label: '🎉 Events', filter: (t: QRTool) => t.category === 'Education & Events' || t.category === 'Cultural & Festive' },
  { label: '❤️ Personal', filter: (t: QRTool) => t.category === 'Utilities & Daily Life' || t.category === 'Emotional & Safety' || t.category === 'Healthcare & Medical' || t.category === 'India Regional & Civic' },
  { label: '🎨 Art & Math QR', filter: (t: QRTool) => t.category === 'Technical & Math' || t.category === 'Cyber Security & Privacy' },
];

export const getToolContent = (tool: QRTool) => {
  const fullTool = (TOOLS_DATABASE as any)[tool.id];
  if (fullTool?.seo) return fullTool.seo;
  // Dynamic fallback
  return {
    seoTitle: `Free ${tool.name} | EzQR.io`,
    metaDescription: tool.description,
    heroTitle: tool.name,
    heroSubtitle: tool.description,
    useCases: [`Use ${tool.name} for quick access`, `Share with customers`, `Print on materials`],
    benefits: ['Free forever', 'No expiry', 'Privacy first'],
    bestPractices: ['High contrast', 'Test before print', 'Matte finish recommended']
  };
};

export const getToolFAQs = (toolId: string) => {
  const tool = (TOOLS_DATABASE as any)[toolId];
  return tool?.faqs || [
    { id: 'faq-1', question: 'Is it free?', answer: 'Yes, forever.' },
    { id: 'faq-2', question: 'Does it expire?', answer: 'No.' }
  ];
};

export const getRelatedToolsItems = (toolId: string, allTools: QRTool[]) => {
  const tool = (TOOLS_DATABASE as any)[toolId];
  const ids = tool?.relatedTools || ['website-url', 'wifi-password', 'vcard-contact'];
  return allTools.filter(t => ids.some((id: string) => t.id === id || t.slug.includes(id)));
};
