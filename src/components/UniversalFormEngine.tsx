// ═══════════════════════════════════════════════════════════════════
//  UNIVERSAL FORM ENGINE — 4-Step Wizard
//  Props: fields (required + optional), qrType, onGenerate
//  Renders: Step 1→2→3→4 with timer + validation
// ═══════════════════════════════════════════════════════════════════

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ArrowLeft, Download, Eye, Sparkles, Loader2, Clock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ToolField, ToolJSON } from '../types/tool-json';
import { validateFieldValue } from '../data/tool-validation';
import { generateQRData } from '../lib/qr-generators';
import { ToolTimer } from '../lib/tool-timer';

interface Props {
  tool: ToolJSON;
  onStepChange?: (step: number) => void;
  onComplete?: (qrData: string, time: number) => void;
  onValuesChange?: (values: Record<string, string>, qrData: string) => void;
  renderPreview?: (qrData: string) => React.ReactNode;
  renderDownload?: () => React.ReactNode;
}

export default function UniversalFormEngine({ tool, onStepChange, onComplete, onValuesChange, renderPreview, renderDownload }: Props) {
  const [step, setStep] = useState(1);  // 1=Required, 2=Optional, 3=Preview, 4=Download
  const [qrData, setQrData] = useState('');
  const [timer] = useState(() => new ToolTimer());
  const [elapsed, setElapsed] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  // All fields combined
  const allFields = [...tool.fields.required, ...tool.fields.optional];
  
  // Build dynamic Zod schema from fields
  const schemaObj: Record<string, any> = {};
  tool.fields.required.forEach(f => {
    const rule = f.validation?.type;
    switch(rule) {
      case 'url': schemaObj[f.id] = z.string().url(f.validation?.message || 'Invalid URL'); break;
      case 'email': schemaObj[f.id] = z.string().email(f.validation?.message || 'Invalid email'); break;
      case 'phone': schemaObj[f.id] = z.string().min(10, f.validation?.message || 'Invalid phone'); break;
      case 'number': schemaObj[f.id] = z.string().regex(/^\d+$/, f.validation?.message || 'Must be a number'); break;
      default: schemaObj[f.id] = z.string().min(1, f.label + ' is required');
    }
  });
  // Optional fields — no validation (empty allowed)
  tool.fields.optional.forEach(f => {
    schemaObj[f.id] = z.string().optional();
  });

  const formSchema = z.object(schemaObj);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: Object.fromEntries(allFields.map(f => [f.id, f.defaultValue || '']))
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const watchedValues = watch();

  useEffect(() => {
    const allValues = { ...watchedValues };
    const qr = generateQRData(tool.qrType, allValues);
    setQrData(qr);
    onValuesChange?.(allValues, qr);
  }, [watchedValues, tool.qrType]);

  // Timer update effect
  useEffect(() => {
    if (step >= 1 && step <= 3) {
      timer.start();
      const interval = setInterval(() => {
        const e = timer.getElapsed();
        setElapsed(e);
        if (e >= 25) setShowWarning(true);
      }, 500);
      return () => clearInterval(interval);
    }
  }, []);

  // Step 1 → Step 2
  const handleRequiredSubmit = (data: any) => {
    setStep(2);
    onStepChange?.(2);
    timer.markStep('optional');
  };

  // Step 2 → Step 3 (skip allowed)
  const handleOptionalNext = () => {
    setStep(3);
    onStepChange?.(3);
    timer.markStep('preview');
    
    // Generate QR data
    const allValues = { ...watchedValues };
    const qr = generateQRData(tool.qrType, allValues);
    setQrData(qr);
  };

  // Step 3 → Step 4
  const handleConfirm = () => {
    setStep(4);
    onStepChange?.(4);
    timer.markStep('download');
    const total = timer.complete();
    onComplete?.(qrData, total);
  };

  // Render field based on type
  const renderField = (field: ToolField) => {
    const baseClass = "w-full bg-[#06060F] border border-[#28283E] text-sm rounded-xl px-3 py-2.5 text-white focus:border-[#7C6EFA] focus:outline-none transition-colors";
    const errorClass = "border-red-500/50";

    switch(field.type) {
      case 'select':
        return (
          <select {...register(field.id)} className={baseClass + (errors[field.id] ? ' ' + errorClass : '')}>
            <option value="">Select...</option>
            {field.options?.map(o => (
              <option key={o.value} value={o.value} className="bg-[#06060F]">{o.label}</option>
            ))}
          </select>
        );
      case 'textarea':
        return <textarea {...register(field.id)} rows={3} placeholder={field.placeholder} className={baseClass + (errors[field.id] ? ' ' + errorClass : '')} />;
      case 'color':
        return (
          <div className="flex gap-2">
            <input type="color" {...register(field.id)} className="w-10 h-10 rounded-lg border border-[#28283E] cursor-pointer bg-transparent" />
            <input type="text" {...register(field.id)} placeholder="#HEX" className={baseClass + (errors[field.id] ? ' ' + errorClass : '')} />
          </div>
        );
      default:
        return (
          <input
            type={field.type === 'password' ? 'password' : field.type || 'text'}
            {...register(field.id)}
            placeholder={field.placeholder}
            className={baseClass + (errors[field.id] ? ' ' + errorClass : '')}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ── Step Indicator ── */}
      <div className="flex items-center gap-1 mb-8 px-1">
        {[
          { num: 1, label: 'Required', icon: '📝' },
          { num: 2, label: 'Optional', icon: '✨' },
          { num: 3, label: 'Preview', icon: '👁️' },
          { num: 4, label: 'Download', icon: '⬇️' }
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className={`flex items-center gap-2 ${step === s.num ? 'text-[#7C6EFA]' : step > s.num ? 'text-green-400' : 'text-[#4E4E6E]'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                ${step === s.num ? 'bg-[#7C6EFA]/20 border border-[#7C6EFA]' : 
                  step > s.num ? 'bg-green-500/20 border border-green-500' : 
                  'bg-[#1C1C2E] border border-[#28283E]'}`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="text-xs font-bold hidden sm:block">{s.label}</span>
            </div>
            {i < 3 && <div className={`flex-1 h-px ${step > s.num ? 'bg-green-500' : 'bg-[#28283E]'}`} />}
          </React.Fragment>
        ))}
      </div>

      {/* ── Timer Display ── */}
      {step < 4 && (
        <div className="flex items-center justify-end gap-2 mb-4 text-xs">
          <Clock className={`w-3.5 h-3.5 ${elapsed > 25 ? 'text-red-400' : 'text-[#8080A0]'}`} />
          <span className={`font-mono ${elapsed > 25 ? 'text-red-400' : 'text-[#8080A0]'}`}>
            {Math.max(0, 30 - Math.floor(elapsed))}s remaining
          </span>
          <div className="w-24 h-1.5 bg-[#1C1C2E] rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${elapsed > 25 ? 'bg-red-500' : 'bg-[#7C6EFA]'}`} 
                 style={{ width: `${Math.min(100, (elapsed / 30) * 100)}%` }} />
          </div>
        </div>
      )}

      {/* ── Warning Banner ── */}
      {showWarning && step < 4 && (
        <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-center gap-2">
          <span className="text-yellow-400 text-xs">⏰ Almost there! Complete this step to stay under 30 seconds.</span>
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* STEP 1 — Required Fields */}
      {/* ════════════════════════════════════════════════ */}
      {step === 1 && (
        <form onSubmit={handleSubmit(handleRequiredSubmit)} className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Basic Information</h2>
            <p className="text-xs text-[#8080A0] mt-1">Fill these required fields to generate your QR code</p>
          </div>

          {tool.fields.required.map(field => (
            <div key={field.id}>
              <label className="block text-[10px] font-bold text-[#8080A0] uppercase tracking-wide mb-1.5">
                {field.label} <span className="text-red-400">*</span>
              </label>
              {renderField(field)}
              {errors[field.id] && (
                <p className="text-[10px] text-red-400 mt-1">{errors[field.id]?.message as string}</p>
              )}
              {field.helpText && (
                <p className="text-[10px] text-[#4E4E6E] mt-1">{field.helpText}</p>
              )}
            </div>
          ))}

          <button type="submit" className="w-full py-3 bg-[#7C6EFA] hover:bg-[#6C63FF] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* STEP 2 — Optional Fields */}
      {/* ════════════════════════════════════════════════ */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Customize (Optional)</h2>
            <p className="text-xs text-[#8080A0] mt-1">Add extra details — or skip to use defaults</p>
          </div>

          {tool.fields.optional.length === 0 ? (
            <p className="text-sm text-[#8080A0] py-4 text-center">No optional fields for this tool</p>
          ) : (
            tool.fields.optional.map(field => (
              <div key={field.id}>
                <label className="block text-[10px] font-bold text-[#8080A0] uppercase tracking-wide mb-1.5">
                  {field.label}
                </label>
                {renderField(field)}
                {field.helpText && <p className="text-[10px] text-[#4E4E6E] mt-1">{field.helpText}</p>}
              </div>
            ))
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 py-3 bg-[#1C1C2E] hover:bg-[#28283E] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <button onClick={handleOptionalNext} className="flex-1 py-3 bg-[#7C6EFA] hover:bg-[#6C63FF] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              Preview <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
{/* ════════════════════════════════════════════════ */}
      {/* STEP 3 — Preview */}
      {/* ════════════════════════════════════════════════ */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white">Preview</h2>
            <p className="text-xs text-[#8080A0] mt-1">Review your QR code data before generating</p>
          </div>

          {/* QR Data Display */}
          <div className="p-4 bg-[#0A0A12] border border-[#1C1C2E] rounded-xl">
            <p className="text-[10px] text-[#8080A0] uppercase font-bold mb-2">QR Data</p>
            <p className="text-sm text-white font-mono break-all bg-[#06060F] p-3 rounded-lg">{qrData || 'No data generated'}</p>
          </div>

          {renderPreview ? renderPreview(qrData) : (
            <div className="aspect-square max-w-[300px] mx-auto bg-white rounded-xl p-4">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                QR Code Preview
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setStep(2)} className="flex-1 py-3 bg-[#1C1C2E] hover:bg-[#28283E] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Customize
            </button>
            <button onClick={handleConfirm} className="flex-1 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
              Confirm & Download <Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════ */}
      {/* STEP 4 — Download */}
      {/* ════════════════════════════════════════════════ */}
      {step === 4 && (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto">
            <span className="text-2xl">✓</span>
          </div>
          
          <h2 className="text-xl font-bold text-white">Ready!</h2>
          <p className="text-sm text-[#8080A0]">
            Generated in <span className="text-green-400 font-bold">{elapsed.toFixed(1)}s</span> — under 30s ✅
          </p>

          {renderDownload ? renderDownload() : (
            <div className="flex gap-3 justify-center mt-4">
              <button className="px-6 py-3 bg-[#7C6EFA] hover:bg-[#6C63FF] text-white font-bold rounded-xl transition-colors">
                Download PNG
              </button>
              <button className="px-6 py-3 bg-[#1C1C2E] hover:bg-[#28283E] text-white font-bold rounded-xl transition-colors">
                Download SVG
              </button>
              <button className="px-6 py-3 bg-[#1C1C2E] hover:bg-[#28283E] text-white font-bold rounded-xl transition-colors">
                Download PDF
              </button>
            </div>
          )}

          <button onClick={() => setStep(1)} className="text-sm text-[#8080A0] hover:text-white transition-colors mt-4 block mx-auto">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
