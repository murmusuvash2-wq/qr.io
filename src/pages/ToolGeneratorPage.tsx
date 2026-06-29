// src/pages/ToolGeneratorPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QR_TOOLS, QRTool } from '../data/tools-database';
import QRCodeGenerator from '../components/QRCodeGenerator';
import { useAppContext } from '../contexts/AppContext';
import { getToolIcon, getToolContent, getToolFAQs, getRelatedToolsItems, UI_CATEGORIES } from '../utils/tool-helpers';
import { ChevronDown, ChevronUp, CheckCircle2, LayoutGrid, Sparkles } from 'lucide-react';
import { Footer, ToolCard, Button, Badge, Card } from '../design-system';

export default function ToolGeneratorPage() {
  const navigate = useNavigate();
  const { user, isPayModalOpen, setPayModalOpen, scans } = useAppContext();
  const [activeTool, setActiveTool] = useState<QRTool>(QR_TOOLS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  
  const toolContent = getToolContent(activeTool);
  const toolFAQs = getToolFAQs(activeTool.id);
  const relatedTools = getRelatedToolsItems(activeTool.id, QR_TOOLS);

  const filteredTools = QR_TOOLS.filter(t => 
    UI_CATEGORIES.find(c => c.label === activeCategory)?.filter(t)
  );

  return (
    <div className="min-h-screen bg-[#040408] text-[#F2F2FF] font-sans flex flex-col pt-16">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 max-w-4xl mx-auto">
        <Badge variant="success" className="mb-6 mx-auto">
          <Sparkles className="w-3.5 h-3.5 mr-2" /> Free Permanent QR Codes
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          {toolContent.heroTitle}
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          {toolContent.heroSubtitle}
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> No Sign Up Required</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Never Expires</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Commercial Use</div>
        </div>
      </section>

      {/* Main Generator Section */}
      <section className="max-w-4xl mx-auto px-4 w-full mb-24">
        <QRCodeGenerator tool={activeTool} user={user} onOpenPayModal={() => setPayModalOpen(true)} />
      </section>

      {/* Features & Content */}
      <section className="bg-slate-900/50 py-24 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Use Cases</h3>
              <ul className="space-y-3">
                {toolContent.useCases?.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Benefits</h3>
              <ul className="space-y-3">
                {toolContent.benefits?.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white">Best Practices</h3>
              <ul className="space-y-3">
                {toolContent.bestPractices?.map((item: string, i: number) => (
                  <li key={i} className="flex gap-3 text-slate-400">
                    <Sparkles className="w-5 h-5 text-purple-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-24 max-w-[1400px] mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore More Tools</h2>
          <p className="text-slate-400">Over 100+ specialized QR generators for every need</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {UI_CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.label 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.slice(0, 16).map(t => (
            <ToolCard
              key={t.id}
              title={t.name}
              description={t.description}
              icon={getToolIcon(t.type)}
              onClick={() => {
                setActiveTool(t);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4 w-full">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {toolFAQs.map((faq: any) => (
            <Card key={faq.id} className="bg-slate-900 border-slate-800">
              <button 
                className="w-full text-left px-6 py-4 font-medium flex justify-between items-center"
                onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
              >
                {faq.question}
                {expandedFaqId === faq.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {expandedFaqId === faq.id && (
                <div className="px-6 pb-4 text-slate-400">
                  {faq.answer}
                </div>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
