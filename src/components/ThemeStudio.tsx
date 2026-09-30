/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Copy, Check, Sparkles, Moon, Sun, RefreshCw } from 'lucide-react';

interface ThemePreset {
  name: string;
  primary: string; // HSL
  radius: string;
  accent: string;
}

const PRESETS: Record<string, ThemePreset> = {
  indigo: { name: 'Indigo Default', primary: '243 75% 59%', radius: '0.5rem', accent: '210 40% 96%' },
  zinc: { name: 'Zinc Monokai', primary: '240 5.9% 10%', radius: '0.375rem', accent: '240 4.8% 95.9%' },
  emerald: { name: 'Emerald Forest', primary: '142.1 76.2% 36.3%', radius: '0.5rem', accent: '138 76% 97%' },
  rose: { name: 'Rose Velvet', primary: '346.8 77.2% 49.8%', radius: '0.75rem', accent: '355 100% 97%' },
  violet: { name: 'Electric Violet', primary: '262.1 83.3% 57.8%', radius: '0.625rem', accent: '269 100% 98%' },
  amber: { name: 'Amber Sunset', primary: '37.7 92.1% 50.2%', radius: '0.5rem', accent: '48 100% 96%' },
};

export default function ThemeStudio({
  themeMode,
  setThemeMode,
}: {
  themeMode: 'dark' | 'light';
  setThemeMode: (mode: 'dark' | 'light') => void;
}) {
  const [selectedPreset, setSelectedPreset] = useState<string>('indigo');
  const [primaryHsl, setPrimaryHsl] = useState<string>(PRESETS.indigo.primary);
  const [borderRadius, setBorderRadius] = useState<string>('0.5rem');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const applyPreset = (key: string) => {
    setSelectedPreset(key);
    setPrimaryHsl(PRESETS[key].primary);
    setBorderRadius(PRESETS[key].radius);
  };

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generatedCss = `/* Custom Design Tokens for Angular UI Library */
:root {
  --background: ${themeMode === 'light' ? '0 0% 100%' : '222.2 84% 4.9%'};
  --foreground: ${themeMode === 'light' ? '222.2 84% 4.9%' : '210 40% 98%'};
  --card: ${themeMode === 'light' ? '0 0% 100%' : '222.2 84% 4.9%'};
  --card-foreground: ${themeMode === 'light' ? '222.2 84% 4.9%' : '210 40% 98%'};
  --primary: ${primaryHsl};
  --primary-foreground: ${themeMode === 'light' ? '210 40% 98%' : '222.2 47.4% 11.2%'};
  --secondary: ${themeMode === 'light' ? '210 40% 96.1%' : '217.2 32.6% 17.5%'};
  --secondary-foreground: ${themeMode === 'light' ? '222.2 47.4% 11.2%' : '210 40% 98%'};
  --muted: ${themeMode === 'light' ? '210 40% 96.1%' : '217.2 32.6% 17.5%'};
  --muted-foreground: ${themeMode === 'light' ? '215.4 16.3% 46.9%' : '215 20.2% 65.1%'};
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: ${themeMode === 'light' ? '214.3 31.8% 91.4%' : '217.2 32.6% 17.5%'};
  --input: ${themeMode === 'light' ? '214.3 31.8% 91.4%' : '217.2 32.6% 17.5%'};
  --ring: ${primaryHsl};
  --radius: ${borderRadius};
}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Controls */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-indigo-400" />
              <span>Theme Studio &amp; Token Customizer</span>
            </h3>

            {/* Dark/Light toggle */}
            <button
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white"
            >
              {themeMode === 'dark' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              )}
            </button>
          </div>

          {/* Preset buttons */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Color Presets
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center gap-2 transition-all ${
                      selectedPreset === key
                        ? 'bg-slate-800 border-indigo-500 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: `hsl(${preset.primary})` }}
                    />
                    <span className="truncate">{preset.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary HSL Token Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Primary Color Token (<code className="text-indigo-300 font-mono">--primary</code>)
              </label>
              <input
                type="text"
                value={primaryHsl}
                onChange={(e) => setPrimaryHsl(e.target.value)}
                placeholder="243 75% 59%"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-indigo-500"
              />
              <p className="text-[11px] text-slate-500 mt-1">Specify HSL values without hsl() wrapper for opacity modulation (e.g. <code className="text-slate-400">bg-primary/90</code>).</p>
            </div>

            {/* Border Radius */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                Border Radius (<code className="text-indigo-300 font-mono">--radius</code>)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['0rem', '0.375rem', '0.5rem', '0.75rem'].map((rad) => (
                  <button
                    key={rad}
                    onClick={() => setBorderRadius(rad)}
                    className={`py-2 px-2 rounded-lg border text-xs font-mono transition-all ${
                      borderRadius === rad
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {rad === '0rem' ? 'None' : rad}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live CSS Export Box */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Exportable tokens.css</span>
            <button
              onClick={() => copyCode(generatedCss, 'css')}
              className="text-xs text-indigo-300 hover:text-white flex items-center gap-1.5 bg-indigo-600/20 px-2.5 py-1 rounded-md border border-indigo-500/30"
            >
              {copiedKey === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'css' ? 'Copied!' : 'Copy CSS'}</span>
            </button>
          </div>
          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-indigo-200 overflow-x-auto max-h-48 leading-relaxed">
            {generatedCss}
          </pre>
        </div>
      </div>

      {/* Real-time Theme Preview */}
      <div className="lg:col-span-7 space-y-6">
        <div 
          className="rounded-2xl border p-6 transition-all shadow-xl"
          style={{
            backgroundColor: themeMode === 'light' ? '#ffffff' : '#0b0f19',
            borderColor: themeMode === 'light' ? '#e2e8f0' : '#1e293b',
            color: themeMode === 'light' ? '#0f172a' : '#f8fafc',
            borderRadius: borderRadius
          }}
        >
          <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: themeMode === 'light' ? '#e2e8f0' : '#1e293b' }}>
            <div>
              <h4 className="font-bold text-base">Live Theme Applied Preview</h4>
              <p className="text-xs opacity-70">Components reacting to modified CSS variable tokens</p>
            </div>
            <span 
              className="text-xs px-2.5 py-1 rounded-full font-semibold text-white shadow-sm"
              style={{ backgroundColor: `hsl(${primaryHsl})`, borderRadius: borderRadius }}
            >
              Active Brand
            </span>
          </div>

          <div className="mt-6 space-y-6">
            {/* Buttons */}
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider opacity-60 block mb-2.5">
                Buttons
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  className="px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all active:scale-95"
                  style={{ backgroundColor: `hsl(${primaryHsl})`, borderRadius: borderRadius }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold border transition-all"
                  style={{ 
                    borderColor: themeMode === 'light' ? '#cbd5e1' : '#334155',
                    borderRadius: borderRadius,
                    backgroundColor: themeMode === 'light' ? '#f1f5f9' : '#1e293b'
                  }}
                >
                  Secondary
                </button>
                <button
                  className="px-4 py-2 text-sm font-semibold border transition-all"
                  style={{ 
                    borderColor: `hsl(${primaryHsl})`,
                    color: `hsl(${primaryHsl})`,
                    borderRadius: borderRadius
                  }}
                >
                  Outline
                </button>
              </div>
            </div>

            {/* Inputs & Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider opacity-60 block mb-2.5">
                  Form Input
                </span>
                <input
                  type="text"
                  readOnly
                  value="user@acme-corp.com"
                  className="w-full px-3.5 py-2 text-sm border focus:outline-none"
                  style={{ 
                    borderRadius: borderRadius,
                    borderColor: themeMode === 'light' ? '#cbd5e1' : '#334155',
                    backgroundColor: themeMode === 'light' ? '#ffffff' : '#020617',
                    color: themeMode === 'light' ? '#0f172a' : '#f8fafc'
                  }}
                />
              </div>

              <div>
                <span className="text-xs uppercase font-semibold tracking-wider opacity-60 block mb-2.5">
                  Badges
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span 
                    className="px-2.5 py-0.5 text-xs font-semibold text-white shadow-xs"
                    style={{ backgroundColor: `hsl(${primaryHsl})`, borderRadius: borderRadius }}
                  >
                    Active
                  </span>
                  <span 
                    className="px-2.5 py-0.5 text-xs font-semibold border"
                    style={{ 
                      borderRadius: borderRadius,
                      borderColor: themeMode === 'light' ? '#cbd5e1' : '#334155'
                    }}
                  >
                    Default
                  </span>
                  <span 
                    className="px-2.5 py-0.5 text-xs font-semibold bg-rose-600 text-white"
                    style={{ borderRadius: borderRadius }}
                  >
                    Destructive
                  </span>
                </div>
              </div>
            </div>

            {/* Card preview */}
            <div 
              className="p-5 border shadow-sm transition-all"
              style={{ 
                borderRadius: borderRadius,
                borderColor: themeMode === 'light' ? '#e2e8f0' : '#1e293b',
                backgroundColor: themeMode === 'light' ? '#f8fafc' : '#0f172a'
              }}
            >
              <h5 className="font-bold text-sm mb-1">Card Container Component</h5>
              <p className="text-xs opacity-75 mb-3 leading-relaxed">
                Notice how the card border radius and inner accents dynamically follow your token choices.
              </p>
              <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: themeMode === 'light' ? '#e2e8f0' : '#1e293b' }}>
                <span className="text-xs opacity-60">Angular Standalone UI</span>
                <button
                  className="text-xs font-semibold"
                  style={{ color: `hsl(${primaryHsl})` }}
                >
                  Explore Documentation &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
