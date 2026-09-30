/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ComponentDoc } from '../types/component';
import { 
  Code2, 
  Eye, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Check, 
  ChevronRight,
  Terminal,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';

interface ComponentViewerProps {
  components: ComponentDoc[];
  selectedComponent: ComponentDoc;
  onSelectComponent: (comp: ComponentDoc) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export default function ComponentViewer({
  components,
  selectedComponent,
  onSelectComponent,
  activeCategory,
  onSelectCategory
}: ComponentViewerProps) {
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live state simulations
  const [btnLoading, setBtnLoading] = useState(false);
  const [inputValue, setInputValue] = useState('shadcn@angular.dev');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [sliderVal, setSliderVal] = useState(70);
  const [activeTabVal, setActiveTabVal] = useState('account');
  const [accordionItem, setAccordionItem] = useState<number | null>(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState<Array<{ id: string; title: string; desc?: string }>>([]);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const triggerToast = () => {
    const id = Math.random().toString(36).substring(7);
    setToastQueue(prev => [...prev, { id, title: 'Event Saved', desc: 'Your settings were synchronized.' }]);
    setTimeout(() => {
      setToastQueue(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const categories = ['All', 'Form', 'Feedback & Overlay', 'Layout & Structure', 'Navigation', 'Data Display'];

  const filteredComponents = activeCategory === 'All'
    ? components
    : components.filter(c => c.category === activeCategory);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar: Components Directory */}
      <div className="lg:col-span-3 space-y-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Component List */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-1.5 space-y-0.5 max-h-[640px] overflow-y-auto">
          {filteredComponents.map((comp) => {
            const isSelected = selectedComponent.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => onSelectComponent(comp)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                <span className="truncate">{comp.name}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isSelected ? 'bg-zinc-200 text-zinc-950' : 'text-zinc-500'
                }`}>
                  {comp.category.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Canvas: shadcn/ui Component Presentation */}
      <div className="lg:col-span-9 space-y-8">
        
        {/* Component Title & Metadata */}
        <div className="space-y-2 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">{selectedComponent.name}</h1>
            <span className="text-xs px-2 py-0.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 font-mono">
              shadcn/{selectedComponent.shadcnEquivalent}
            </span>
            {selectedComponent.cdkPrimitive && (
              <span className="text-xs px-2 py-0.5 rounded-full border border-emerald-900/50 bg-emerald-950/40 text-emerald-400 font-mono">
                Angular CDK
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {selectedComponent.description}
          </p>
        </div>

        {/* Tabbed Canvas: Preview vs Code */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('preview')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'preview'
                    ? 'bg-zinc-800 text-zinc-100 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveView('code')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'code'
                    ? 'bg-zinc-800 text-zinc-100 shadow-xs'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Angular Code</span>
              </button>
            </div>

            <button
              onClick={() => copyCode(selectedComponent.angularCode, 'comp-code')}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1.5 rounded-md border border-zinc-800 transition-colors"
            >
              {copiedKey === 'comp-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'comp-code' ? 'Copied Full Code!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* VIEW 1: AUTHENTIC SHADCN CANVAS PREVIEW */}
          {activeView === 'preview' && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-10 min-h-[350px] flex flex-col items-center justify-center relative overflow-hidden">
              
              {/* Subtle grid background pattern */}
              <div 
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #71717a 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}
              ></div>

              <div className="relative z-10 w-full flex items-center justify-center">
                
                {/* 1. BUTTON */}
                {selectedComponent.id === 'button' && (
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => { setBtnLoading(true); setTimeout(() => setBtnLoading(false), 1500); }}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-zinc-100 text-zinc-900 shadow hover:bg-zinc-200 active:scale-[0.98] transition-all cursor-pointer font-sans"
                      >
                        {btnLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-zinc-900" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>Loading...</span>
                          </>
                        ) : (
                          <span>Default Button</span>
                        )}
                      </button>

                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-zinc-800 text-zinc-100 hover:bg-zinc-700 transition-colors shadow-xs">
                        Secondary
                      </button>

                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900 transition-colors shadow-xs">
                        Outline
                      </button>

                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors">
                        Ghost
                      </button>

                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-red-900/80 text-red-100 hover:bg-red-800 transition-colors shadow-xs">
                        Destructive
                      </button>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">
                      &lt;ui-button variant="default" (clicked)="onSave()"&gt;Click me&lt;/ui-button&gt;
                    </span>
                  </div>
                )}

                {/* 2. INPUT */}
                {selectedComponent.id === 'input' && (
                  <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-200">Email Address</label>
                      <input
                        type="email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="name@example.com"
                        className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1 text-sm text-zinc-100 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <p className="text-xs text-zinc-500 font-mono">
                      Reactive Signal Value: <span className="text-zinc-200 font-bold">{inputValue}</span>
                    </p>
                  </div>
                )}

                {/* 3. DIALOG */}
                {selectedComponent.id === 'dialog' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => setDialogOpen(true)}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 shadow-xs transition-colors"
                    >
                      Open Dialog
                    </button>
                    <span className="text-xs text-zinc-500">Supports ESC key &amp; focus trap</span>

                    {dialogOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div 
                          className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
                          onClick={() => setDialogOpen(false)}
                        ></div>
                        <div className="relative w-full max-w-lg rounded-lg border border-zinc-800 bg-zinc-950 p-6 shadow-2xl z-10 animate-in zoom-in-95 space-y-4">
                          <div className="space-y-1.5">
                            <h3 className="text-lg font-semibold leading-none tracking-tight text-zinc-100">
                              Edit profile
                            </h3>
                            <p className="text-sm text-zinc-400">
                              Make changes to your profile here. Click save when you're done.
                            </p>
                          </div>
                          <div className="space-y-3 py-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right text-xs font-medium text-zinc-400">Name</label>
                              <input 
                                defaultValue="Pedro Duarte" 
                                className="col-span-3 flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className="text-right text-xs font-medium text-zinc-400">Username</label>
                              <input 
                                defaultValue="@peduarte" 
                                className="col-span-3 flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                              />
                            </div>
                          </div>
                          <div className="flex justify-end gap-2 pt-2 border-t border-zinc-800">
                            <button
                              onClick={() => setDialogOpen(false)}
                              className="px-3 py-1.5 rounded-md border border-zinc-800 text-xs font-medium text-zinc-300 hover:bg-zinc-900"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setDialogOpen(false)}
                              className="px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-950 text-xs font-bold hover:bg-white"
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. SWITCH */}
                {selectedComponent.id === 'switch' && (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={switchState}
                      onClick={() => setSwitchState(!switchState)}
                      className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 ${
                        switchState ? 'bg-zinc-100' : 'bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform ${
                          switchState ? 'translate-x-4 bg-zinc-950' : 'translate-x-0 bg-zinc-400'
                        }`}
                      ></span>
                    </button>
                    <label className="text-sm font-medium text-zinc-200 cursor-pointer" onClick={() => setSwitchState(!switchState)}>
                      Airplane Mode ({switchState ? 'On' : 'Off'})
                    </label>
                  </div>
                )}

                {/* 5. CARD */}
                {selectedComponent.id === 'card' && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-100 shadow-xs max-w-sm w-full p-6 space-y-4">
                    <div className="space-y-1.5">
                      <h4 className="font-semibold leading-none tracking-tight text-base">Create an account</h4>
                      <p className="text-xs text-zinc-400">Enter your email below to create your account</p>
                    </div>
                    <div className="space-y-2">
                      <input 
                        placeholder="m@example.com" 
                        className="flex h-9 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-1 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      />
                      <button className="w-full h-9 rounded-md bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs transition-colors">
                        Sign In with Email
                      </button>
                    </div>
                  </div>
                )}

                {/* 6. BADGE */}
                {selectedComponent.id === 'badge' && (
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-md border border-transparent bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-950 shadow hover:bg-zinc-200">
                      Default
                    </span>
                    <span className="inline-flex items-center rounded-md border border-transparent bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-100 hover:bg-zinc-700">
                      Secondary
                    </span>
                    <span className="inline-flex items-center rounded-md border border-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-100">
                      Outline
                    </span>
                    <span className="inline-flex items-center rounded-md border border-transparent bg-red-900/60 px-2.5 py-0.5 text-xs font-semibold text-red-200 shadow">
                      Destructive
                    </span>
                  </div>
                )}

                {/* 7. TABS */}
                {selectedComponent.id === 'tabs' && (
                  <div className="w-full max-w-md space-y-3">
                    <div className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 p-1 text-zinc-400 border border-zinc-800 w-full">
                      {['account', 'password'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTabVal(t)}
                          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium ring-offset-background transition-all flex-1 capitalize ${
                            activeTabVal === t ? 'bg-zinc-950 text-zinc-100 shadow-xs' : 'hover:text-zinc-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-300">
                      {activeTabVal === 'account' ? (
                        <p>Make changes to your account settings here.</p>
                      ) : (
                        <p>Change your password here. After saving, you will be logged out.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 8. ACCORDION */}
                {selectedComponent.id === 'accordion' && (
                  <div className="w-full max-w-md divide-y divide-zinc-800 border-y border-zinc-800 text-xs">
                    {[
                      { q: 'Is it accessible?', a: 'Yes. It adheres to the WAI-ARIA disclosure pattern.' },
                      { q: 'Is it styled?', a: 'Yes. It comes with default styles that match the other components.' },
                      { q: 'Is it animated?', a: 'Yes. It is animated by default with Tailwind animation utilities.' }
                    ].map((item, idx) => (
                      <div key={idx} className="py-2.5">
                        <button
                          onClick={() => setAccordionItem(accordionItem === idx ? null : idx)}
                          className="flex flex-1 items-center justify-between w-full font-medium transition-all hover:underline text-left text-zinc-100 cursor-pointer"
                        >
                          <span>{item.q}</span>
                          <span className="text-zinc-500 font-mono text-sm">{accordionItem === idx ? '−' : '+'}</span>
                        </button>
                        {accordionItem === idx && (
                          <div className="pb-2 pt-1 text-zinc-400 text-xs leading-relaxed animate-in fade-in">
                            {item.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 9. SHEET */}
                {selectedComponent.id === 'sheet' && (
                  <div>
                    <button
                      onClick={() => setSheetOpen(true)}
                      className="px-4 py-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 text-xs font-semibold"
                    >
                      Open Sheet
                    </button>
                    {sheetOpen && (
                      <div className="fixed inset-0 z-50">
                        <div className="fixed inset-0 bg-black/80" onClick={() => setSheetOpen(false)}></div>
                        <div className="fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l border-zinc-800 bg-zinc-950 p-6 shadow-lg sm:max-w-sm animate-in slide-in-from-right duration-300 flex flex-col justify-between">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                              <h4 className="text-base font-semibold text-zinc-100">Edit Profile</h4>
                              <button onClick={() => setSheetOpen(false)} className="text-zinc-400 hover:text-zinc-100">✕</button>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              This panel slides out from the edge of the screen, just like shadcn's Sheet primitive.
                            </p>
                          </div>
                          <button
                            onClick={() => setSheetOpen(false)}
                            className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-md border border-zinc-800"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 10. TOAST */}
                {selectedComponent.id === 'toast' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={triggerToast}
                      className="px-4 py-2 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800 text-xs font-semibold"
                    >
                      Add to Calendar (Show Toast)
                    </button>
                    {toastQueue.map((t) => (
                      <div key={t.id} className="fixed bottom-6 right-6 z-50 p-4 rounded-lg border border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold">{t.title}</div>
                          <div className="text-[11px] text-zinc-400">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 11. AVATAR */}
                {selectedComponent.id === 'avatar' && (
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-800">
                      <span className="flex h-full w-full items-center justify-center bg-zinc-800 text-xs font-bold text-zinc-200">
                        CN
                      </span>
                    </span>
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-800">
                      <span className="flex h-full w-full items-center justify-center bg-zinc-900 text-xs font-bold text-zinc-300">
                        NG
                      </span>
                    </span>
                  </div>
                )}

                {/* 12. SLIDER */}
                {selectedComponent.id === 'slider' && (
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>Volume</span>
                      <span className="font-mono text-zinc-200">{sliderVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-100"
                    />
                  </div>
                )}

                {/* 13. SEPARATOR */}
                {selectedComponent.id === 'separator' && (
                  <div className="w-full max-w-sm space-y-3">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-none text-zinc-100">Radix Primitives</h4>
                      <p className="text-xs text-zinc-400">An open-source UI component library for Angular.</p>
                    </div>
                    <div className="shrink-0 bg-zinc-800 h-[1px] w-full"></div>
                    <div className="flex h-5 items-center space-x-4 text-xs text-zinc-400">
                      <div>Blog</div>
                      <div className="shrink-0 bg-zinc-800 h-full w-[1px]"></div>
                      <div>Docs</div>
                      <div className="shrink-0 bg-zinc-800 h-full w-[1px]"></div>
                      <div>Source</div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* VIEW 2: PRODUCTION ANGULAR SOURCE CODE */}
          {activeView === 'code' && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
              <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>src/app/components/ui/{selectedComponent.id}.component.ts</span>
                <span className="text-[10px] text-zinc-500">Standalone &bull; Signals &bull; OnPush</span>
              </div>
              <pre className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto max-h-[500px]">
                {selectedComponent.angularCode}
              </pre>
            </div>
          )}
        </div>

        {/* Template Usage Example */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>Usage in your Angular templates</span>
            </h3>
            <button
              onClick={() => copyCode(selectedComponent.consumerUsage, 'usage-block')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-900 px-2 py-1 rounded border border-zinc-800"
            >
              {copiedKey === 'usage-block' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'usage-block' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
            {selectedComponent.consumerUsage}
          </pre>
        </div>

        {/* API Reference Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            API Reference (@Input Signals)
          </h3>
          <div className="rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-left text-xs text-zinc-300">
              <thead className="bg-zinc-900/80 text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800">
                <tr>
                  <th className="py-2.5 px-4 font-mono">Property</th>
                  <th className="py-2.5 px-4 font-mono">Type</th>
                  <th className="py-2.5 px-4 font-mono">Default</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 font-mono bg-zinc-950/40">
                {selectedComponent.inputs.map((inp) => (
                  <tr key={inp.name}>
                    <td className="py-2.5 px-4 text-zinc-100 font-bold">{inp.name}</td>
                    <td className="py-2.5 px-4 text-cyan-400">{inp.type}</td>
                    <td className="py-2.5 px-4 text-zinc-500">{inp.default || '-'}</td>
                    <td className="py-2.5 px-4 font-sans text-zinc-400">{inp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
