/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ComponentDoc } from '../types/component';
import { 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  ChevronRight,
  ChevronLeft,
  Terminal,
  Sparkles,
  Zap,
  Info,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sliders,
  ChevronDown
} from 'lucide-react';

interface ComponentViewerProps {
  components: ComponentDoc[];
  selectedComponent: ComponentDoc;
  onSelectComponent: (comp: ComponentDoc) => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  themeMode?: 'dark' | 'light';
}

export default function ComponentViewer({
  components,
  selectedComponent,
  onSelectComponent,
  activeCategory,
  onSelectCategory,
  themeMode = 'dark'
}: ComponentViewerProps) {
  const isDark = themeMode === 'dark';
  const [activeView, setActiveView] = useState<'preview' | 'code'>('preview');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live state simulations
  const [btnLoading, setBtnLoading] = useState(false);
  const [inputValue, setInputValue] = useState('user@lumina.dev');
  const [textareaValue, setTextareaValue] = useState('Type your message or feedback here...');
  const [checkboxState, setCheckboxState] = useState(true);
  const [radioState, setRadioState] = useState('comfortable');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [sliderVal, setSliderVal] = useState(70);
  const [selectVal, setSelectVal] = useState('angular19');
  const [activeTabVal, setActiveTabVal] = useState('account');
  const [accordionItem, setAccordionItem] = useState<number | null>(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState<Array<{ id: string; title: string; desc?: string }>>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(2);
  const [progressVal, setProgressVal] = useState(65);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toggleVal, setToggleVal] = useState<'left' | 'center' | 'right'>('center');
  const [otpVal, setOtpVal] = useState(['4', '8', '2', '9', '1', '5']);
  const [starRating, setStarRating] = useState(4);
  const [carouselSlide, setCarouselSlide] = useState(0);
  const [carouselSlidesToScroll, setCarouselSlidesToScroll] = useState<number>(1);
  const [carouselSlidesPerView, setCarouselSlidesPerView] = useState<number>(1);
  const [carouselLoop, setCarouselLoop] = useState<boolean>(true);
  const [carouselSlideCount, setCarouselSlideCount] = useState<number>(6);
  const [carouselTimingMs, setCarouselTimingMs] = useState<number>(650);
  const [carouselEasing, setCarouselEasing] = useState<'spring' | 'natural' | 'material' | 'linear'>('spring');
  const [carouselBtnPosition, setCarouselBtnPosition] = useState<'outer' | 'sides'>('outer');
  const [datePickerDate, setDatePickerDate] = useState('Oct 24, 2026');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const triggerToast = () => {
    const id = Math.random().toString(36).substring(7);
    setToastQueue(prev => [...prev, { id, title: 'Event Synchronized', desc: 'Signal model state updated.' }]);
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
        {/* Category Filter Pills */}
        <div className={`flex flex-wrap gap-1 p-1 border rounded-xl transition-colors ${
          isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                activeCategory === cat
                  ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'bg-white text-zinc-950 font-bold shadow-xs'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Component List */}
        <div className={`border rounded-xl p-1.5 space-y-0.5 max-h-[680px] overflow-y-auto transition-colors ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
        }`}>
          <div className="px-2 py-1 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
            <span>Components</span>
            <span className="font-mono text-[10px]">{filteredComponents.length} items</span>
          </div>
          {filteredComponents.map((comp) => {
            const isSelected = selectedComponent.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => onSelectComponent(comp)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-all ${
                  isSelected
                    ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'bg-zinc-900 text-white font-bold shadow-xs'
                    : isDark ? 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                <span className="truncate">{comp.name}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${
                  isSelected 
                    ? isDark ? 'bg-zinc-200 text-zinc-950' : 'bg-zinc-800 text-white' 
                    : isDark ? 'text-zinc-500' : 'text-zinc-400'
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
        <div className="space-y-3 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
              {selectedComponent.name}
            </h1>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${
              isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400' : 'border-zinc-200 bg-zinc-100 text-zinc-600'
            }`}>
              shadcn/{selectedComponent.shadcnEquivalent}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium flex items-center gap-1 ${
              isDark ? 'border-emerald-900/50 bg-emerald-950/40 text-emerald-400' : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}>
              <Zap className="w-3 h-3 text-emerald-500" />
              <span>Pure Angular Signals (Zoneless Native)</span>
            </span>
          </div>

          <p className={`text-sm max-w-2xl leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {selectedComponent.description}
          </p>

          {/* Zoneless Signals Highlight Badge */}
          <div className={`p-3 rounded-lg border text-xs flex items-center justify-between gap-4 transition-colors ${
            isDark ? 'bg-zinc-900/50 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
          }`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">Reactive Model:</span>
              <span className="opacity-90">Uses Angular 18/19 <code className="font-mono text-indigo-500 font-bold">input()</code>, <code className="font-mono text-indigo-500 font-bold">model()</code>, &amp; <code className="font-mono text-indigo-500 font-bold">output()</code>. No Zone.js dirty-checking loops or manual OnPush change detector references needed.</span>
            </div>
          </div>
        </div>

        {/* Tabbed Canvas: Preview vs Code */}
        <div className="space-y-4">
          <div className={`flex items-center justify-between border-b pb-2 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('preview')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'preview'
                    ? isDark ? 'bg-zinc-800 text-zinc-100 shadow-xs' : 'bg-zinc-100 text-zinc-950 shadow-xs'
                    : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Interactive Preview</span>
              </button>
              <button
                onClick={() => setActiveView('code')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeView === 'code'
                    ? isDark ? 'bg-zinc-800 text-zinc-100 shadow-xs' : 'bg-zinc-100 text-zinc-950 shadow-xs'
                    : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Angular Signals Source Code</span>
              </button>
            </div>

            <button
              onClick={() => copyCode(selectedComponent.angularCode, 'comp-code')}
              className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md border transition-colors ${
                isDark 
                  ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white' 
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200 hover:text-zinc-900'
              }`}
            >
              {copiedKey === 'comp-code' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'comp-code' ? 'Copied Full Code!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* VIEW 1: AUTHENTIC SHADCN CANVAS PREVIEW */}
          {activeView === 'preview' && (
            <div className={`rounded-xl border p-10 min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden transition-colors ${
              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50/70 shadow-xs'
            }`}>
              
              {/* Subtle grid background pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, ${isDark ? '#71717a' : '#a1a1aa'} 1px, transparent 0)`,
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
                        className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 shadow-xs transition-all active:scale-[0.98] cursor-pointer font-sans ${
                          isDark 
                            ? 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200' 
                            : 'bg-zinc-900 text-white hover:bg-zinc-800'
                        }`}
                      >
                        {btnLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>Loading...</span>
                          </>
                        ) : (
                          <span>Default Button</span>
                        )}
                      </button>

                      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 transition-colors shadow-xs ${
                        isDark 
                          ? 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700' 
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-900 hover:bg-zinc-200'
                      }`}>
                        Secondary
                      </button>

                      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border shadow-xs transition-colors ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900' 
                          : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                      }`}>
                        Outline
                      </button>

                      <button className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 transition-colors ${
                        isDark 
                          ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900' 
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                      }`}>
                        Ghost
                      </button>

                      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors shadow-xs">
                        Destructive
                      </button>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">
                      &lt;ui-button variant="default" (clicked)="onSave()"&gt;Click me&lt;/ui-button&gt;
                    </span>
                  </div>
                )}

                {/* 2. INPUT */}
                {selectedComponent.id === 'input' && (
                  <div className="w-full max-w-sm space-y-4">
                    <div className="space-y-1.5">
                      <label className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Email Address</label>
                      <input
                        type="email"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="name@example.com"
                        className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                          isDark 
                            ? 'border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-500' 
                            : 'border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400'
                        }`}
                      />
                    </div>
                    <p className="text-xs font-mono text-zinc-500">
                      Reactive Signal: <span className={`font-bold ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>{inputValue}</span>
                    </p>
                  </div>
                )}

                {/* 3. TEXTAREA */}
                {selectedComponent.id === 'textarea' && (
                  <div className="w-full max-w-sm space-y-2">
                    <label className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Your Message</label>
                    <textarea
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                      rows={4}
                      className={`w-full rounded-md border p-3 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    />
                    <span className="text-[11px] text-zinc-500 font-mono">Length: {textareaValue.length} chars</span>
                  </div>
                )}

                {/* 4. LABEL & FORM */}
                {(selectedComponent.id === 'label' || selectedComponent.id === 'form') && (
                  <div className="w-full max-w-sm space-y-3">
                    <div className="space-y-1">
                      <label className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Username</label>
                      <input
                        defaultValue="shadcn_fan"
                        className={`h-9 w-full rounded-md border px-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                          isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                        }`}
                      />
                      <p className="text-[11px] text-zinc-500">This is your public display username.</p>
                    </div>
                    <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                      Signal Error: Username already taken.
                    </div>
                  </div>
                )}

                {/* 5. CHECKBOX */}
                {selectedComponent.id === 'checkbox' && (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setCheckboxState(!checkboxState)}
                      className={`h-4 w-4 rounded border transition-colors flex items-center justify-center cursor-pointer ${
                        checkboxState
                          ? isDark ? 'bg-zinc-100 border-zinc-100 text-zinc-900' : 'bg-zinc-900 border-zinc-900 text-white'
                          : isDark ? 'border-zinc-700 bg-zinc-900' : 'border-zinc-300 bg-white'
                      }`}
                    >
                      {checkboxState && <span className="text-[10px] font-bold">✓</span>}
                    </button>
                    <label 
                      onClick={() => setCheckboxState(!checkboxState)}
                      className={`text-xs font-medium cursor-pointer ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}
                    >
                      Accept terms and privacy policy ({checkboxState ? 'Checked' : 'Unchecked'})
                    </label>
                  </div>
                )}

                {/* 6. RADIO GROUP */}
                {selectedComponent.id === 'radio-group' && (
                  <div className="space-y-2 w-full max-w-xs">
                    {['default', 'comfortable', 'compact'].map((opt) => (
                      <div 
                        key={opt}
                        onClick={() => setRadioState(opt)}
                        className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                          radioState === opt 
                            ? isDark ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-100 border-zinc-300'
                            : isDark ? 'border-zinc-800/80 hover:bg-zinc-900/40' : 'border-zinc-200 hover:bg-zinc-50'
                        }`}
                      >
                        <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          radioState === opt ? 'border-indigo-500' : 'border-zinc-400'
                        }`}>
                          {radioState === opt && <div className="h-2 w-2 rounded-full bg-indigo-500" />}
                        </div>
                        <span className={`text-xs capitalize ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>{opt} spacing</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* 7. SELECT */}
                {selectedComponent.id === 'select' && (
                  <div className="w-full max-w-xs space-y-1.5">
                    <label className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Framework Engine</label>
                    <select
                      value={selectVal}
                      onChange={(e) => setSelectVal(e.target.value)}
                      className={`h-9 w-full rounded-md border px-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      <option value="angular19">Angular 19 (Zoneless Native)</option>
                      <option value="angular18">Angular 18 (Signals Core)</option>
                      <option value="tailwind4">Tailwind CSS v4</option>
                    </select>
                    <span className="text-[11px] text-zinc-500 font-mono">Selected: {selectVal}</span>
                  </div>
                )}

                {/* 8. SWITCH */}
                {selectedComponent.id === 'switch' && (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={switchState}
                      onClick={() => setSwitchState(!switchState)}
                      className={`peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-none ${
                        switchState 
                          ? isDark ? 'bg-zinc-100' : 'bg-zinc-900' 
                          : isDark ? 'bg-zinc-800' : 'bg-zinc-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform ${
                          switchState 
                            ? isDark ? 'translate-x-4 bg-zinc-950' : 'translate-x-4 bg-white' 
                            : isDark ? 'translate-x-0 bg-zinc-400' : 'translate-x-0 bg-white'
                        }`}
                      ></span>
                    </button>
                    <label className={`text-sm font-medium cursor-pointer ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`} onClick={() => setSwitchState(!switchState)}>
                      Airplane Mode ({switchState ? 'On' : 'Off'})
                    </label>
                  </div>
                )}

                {/* 9. SLIDER */}
                {selectedComponent.id === 'slider' && (
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between text-xs opacity-75">
                      <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>Volume</span>
                      <span className="font-mono font-bold">{sliderVal}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100 bg-zinc-200 dark:bg-zinc-800"
                    />
                  </div>
                )}

                {/* 10. INPUT OTP */}
                {selectedComponent.id === 'input-otp' && (
                  <div className="space-y-3 flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      {otpVal.map((digit, i) => (
                        <input
                          key={i}
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const copy = [...otpVal];
                            copy[i] = e.target.value;
                            setOtpVal(copy);
                          }}
                          className={`w-10 h-12 text-center text-lg font-bold rounded-lg border ${
                            isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">One-time security code input</span>
                  </div>
                )}

                {/* 11. COMBOBOX */}
                {selectedComponent.id === 'combobox' && (
                  <div className="w-full max-w-xs space-y-2">
                    <label className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Select Framework</label>
                    <div className={`p-2.5 rounded-md border flex items-center justify-between text-xs cursor-pointer ${
                      isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                    }`}>
                      <span>Angular 19 (Signals)</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </div>
                  </div>
                )}

                {/* 12. TOGGLE & TOGGLE GROUP */}
                {(selectedComponent.id === 'toggle' || selectedComponent.id === 'toggle-group') && (
                  <div className="space-y-3 flex flex-col items-center">
                    <div className={`inline-flex items-center p-1 rounded-md border gap-1 ${
                      isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-100'
                    }`}>
                      {(['left', 'center', 'right'] as const).map((a) => (
                        <button
                          key={a}
                          onClick={() => setToggleVal(a)}
                          className={`px-3 py-1 rounded text-xs capitalize font-medium transition-all ${
                            toggleVal === a
                              ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold' : 'bg-white text-zinc-950 font-bold shadow-xs'
                              : isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
                          }`}
                        >
                          {a}
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-zinc-500 font-mono">Selected: {toggleVal}</span>
                  </div>
                )}

                {/* 13. FILE DROPZONE */}
                {selectedComponent.id === 'file-dropzone' && (
                  <div className={`border-2 border-dashed rounded-xl p-8 max-w-md w-full text-center transition-colors cursor-pointer ${
                    isDark ? 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30' : 'border-zinc-300 hover:border-zinc-400 bg-white'
                  }`}>
                    <div className="mx-auto w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <h5 className={`text-xs font-semibold ${isDark ? 'text-zinc-200' : 'text-zinc-800'}`}>Click or drag files here to upload</h5>
                    <p className="text-[11px] text-zinc-500 mt-1">SVG, PNG, JPG, or PDF up to 10MB</p>
                  </div>
                )}

                {/* 14. DIALOG */}
                {selectedComponent.id === 'dialog' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => setDialogOpen(true)}
                      className={`inline-flex items-center justify-center rounded-md text-sm font-medium h-9 px-4 py-2 border shadow-xs transition-colors ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800' 
                          : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      Open Dialog Simulation
                    </button>
                    <span className="text-xs text-zinc-500">Supports ESC key &amp; focus trap</span>

                    {dialogOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div 
                          className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
                          onClick={() => setDialogOpen(false)}
                        ></div>
                        <div className={`relative w-full max-w-lg rounded-lg border p-6 shadow-2xl z-10 animate-in zoom-in-95 space-y-4 ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                        }`}>
                          <div className="space-y-1.5">
                            <h3 className={`text-lg font-semibold leading-none tracking-tight ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                              Edit profile
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                              Make changes to your profile here. Click save when you're done.
                            </p>
                          </div>
                          <div className="space-y-3 py-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <label className={`text-right text-xs font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Name</label>
                              <input 
                                defaultValue="Pedro Duarte" 
                                className={`col-span-3 flex h-9 w-full rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                                  isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                                }`}
                              />
                            </div>
                          </div>
                          <div className={`flex justify-end gap-2 pt-2 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                            <button
                              onClick={() => setDialogOpen(false)}
                              className={`px-3 py-1.5 rounded-md border text-xs font-medium ${
                                isDark ? 'border-zinc-800 text-zinc-300 hover:bg-zinc-900' : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                              }`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setDialogOpen(false)}
                              className={`px-3 py-1.5 rounded-md text-xs font-bold ${
                                isDark ? 'bg-zinc-100 text-zinc-950 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
                              }`}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 15. ALERT DIALOG */}
                {selectedComponent.id === 'alert-dialog' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => setAlertDialogOpen(true)}
                      className="px-4 py-2 rounded-md bg-red-600 text-white text-xs font-semibold shadow-xs"
                    >
                      Delete Account (Alert Dialog)
                    </button>
                    {alertDialogOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/80" onClick={() => setAlertDialogOpen(false)}></div>
                        <div className={`relative max-w-md w-full rounded-xl border p-6 space-y-4 z-10 ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                        }`}>
                          <h4 className="text-base font-bold">Are you absolutely sure?</h4>
                          <p className="text-xs text-zinc-500">This action cannot be undone. This will permanently delete your account and remove data from our servers.</p>
                          <div className="flex justify-end gap-2 pt-2">
                            <button onClick={() => setAlertDialogOpen(false)} className="px-3 py-1.5 rounded border text-xs">Cancel</button>
                            <button onClick={() => setAlertDialogOpen(false)} className="px-3 py-1.5 rounded bg-red-600 text-white text-xs font-bold">Continue</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 16. SHEET */}
                {selectedComponent.id === 'sheet' && (
                  <div>
                    <button
                      onClick={() => setSheetOpen(true)}
                      className={`px-4 py-2 rounded-md border text-xs font-semibold ${
                        isDark 
                          ? 'border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800' 
                          : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      Open Sheet Simulation
                    </button>
                    {sheetOpen && (
                      <div className="fixed inset-0 z-50">
                        <div className="fixed inset-0 bg-black/80" onClick={() => setSheetOpen(false)}></div>
                        <div className={`fixed inset-y-0 right-0 z-50 h-full w-3/4 border-l p-6 shadow-2xl sm:max-w-sm animate-in slide-in-from-right duration-300 flex flex-col justify-between ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                        }`}>
                          <div className="space-y-4">
                            <div className={`flex items-center justify-between pb-2 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
                              <h4 className="text-base font-semibold">Edit Profile</h4>
                              <button onClick={() => setSheetOpen(false)} className="opacity-60 hover:opacity-100">✕</button>
                            </div>
                            <p className="text-xs text-zinc-500 leading-relaxed">
                              This drawer slides out from the edge with smooth CSS transitions.
                            </p>
                          </div>
                          <button
                            onClick={() => setSheetOpen(false)}
                            className={`w-full py-2 text-xs font-semibold rounded-md border ${
                              isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-zinc-100 border-zinc-300 text-zinc-800 hover:bg-zinc-200'
                            }`}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 17. DRAWER (BOTTOM) */}
                {selectedComponent.id === 'drawer' && (
                  <div>
                    <button
                      onClick={() => setDrawerOpen(true)}
                      className={`px-4 py-2 rounded-md border text-xs font-semibold ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      Open Bottom Drawer
                    </button>
                    {drawerOpen && (
                      <div className="fixed inset-0 z-50">
                        <div className="fixed inset-0 bg-black/80" onClick={() => setDrawerOpen(false)}></div>
                        <div className={`fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-2xl border-t p-6 shadow-2xl max-w-lg mx-auto animate-in slide-in-from-bottom duration-300 ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                        }`}>
                          <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                          <h4 className="font-bold text-sm mb-2">Move Goal</h4>
                          <p className="text-xs text-zinc-500 mb-4">Set your daily activity goal</p>
                          <button onClick={() => setDrawerOpen(false)} className="w-full py-2 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 rounded-lg text-xs font-bold">
                            Submit Goal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 18. TOAST */}
                {selectedComponent.id === 'toast' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={triggerToast}
                      className={`px-4 py-2 rounded-md border text-xs font-semibold ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800' : 'border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      Show Toast Notification
                    </button>
                    {toastQueue.map((t) => (
                      <div key={t.id} className={`fixed bottom-6 right-6 z-50 p-4 rounded-lg border shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-2 ${
                        isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                      }`}>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <div>
                          <div className="text-xs font-bold">{t.title}</div>
                          <div className="text-[11px] text-zinc-500">{t.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 19. POPOVER & TOOLTIP */}
                {(selectedComponent.id === 'popover' || selectedComponent.id === 'tooltip') && (
                  <div className="relative">
                    <button
                      onClick={() => setPopoverOpen(!popoverOpen)}
                      className={`px-3 py-1.5 rounded-md border text-xs font-medium ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      Toggle {selectedComponent.name}
                    </button>
                    {popoverOpen && (
                      <div className={`absolute left-0 top-full mt-2 w-56 rounded-lg border p-3 shadow-xl z-30 text-xs animate-in fade-in ${
                        isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                      }`}>
                        <h5 className="font-bold mb-1">Dimensions</h5>
                        <p className="text-zinc-500 text-[11px]">Set the width and max-height for layer.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 20. DROPDOWN MENU & CONTEXT MENU */}
                {(selectedComponent.id === 'dropdown-menu' || selectedComponent.id === 'context-menu') && (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`px-3 py-1.5 rounded-md border text-xs font-medium flex items-center gap-1.5 ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      <span>Open Menu</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                    {dropdownOpen && (
                      <div className={`absolute left-0 top-full mt-1.5 w-44 rounded-lg border p-1 shadow-xl z-30 text-xs space-y-0.5 animate-in fade-in ${
                        isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                      }`}>
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Profile</button>
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Billing</button>
                        <button className="w-full text-left px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Settings</button>
                        <div className="border-t border-zinc-200 dark:border-zinc-800 my-1"></div>
                        <button className="w-full text-left px-2 py-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">Log out</button>
                      </div>
                    )}
                  </div>
                )}

                {/* 21. ALERT */}
                {selectedComponent.id === 'alert' && (
                  <div className="w-full max-w-md space-y-3">
                    <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                    }`}>
                      <Info className="w-4 h-4 text-indigo-500 mt-0.5" />
                      <div>
                        <h5 className="font-bold text-xs">Heads up!</h5>
                        <p className="text-[11px] text-zinc-500">You can add components to your app using CLI or copy-paste.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 22. HOVER CARD */}
                {selectedComponent.id === 'hover-card' && (
                  <div className={`p-4 rounded-xl border max-w-xs text-xs space-y-2 ${
                    isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                  }`}>
                    <h5 className="font-bold">@angular</h5>
                    <p className="text-zinc-500 text-[11px]">The web framework for modern content-rich and enterprise apps.</p>
                  </div>
                )}

                {/* 23. CARD */}
                {selectedComponent.id === 'card' && (
                  <div className={`rounded-xl border max-w-sm w-full p-6 space-y-4 transition-colors ${
                    isDark ? 'border-zinc-800 bg-zinc-900/60 text-zinc-100 shadow-xs' : 'border-zinc-200 bg-white text-zinc-900 shadow-sm'
                  }`}>
                    <div className="space-y-1.5">
                      <h4 className="font-semibold leading-none tracking-tight text-base">Create an account</h4>
                      <p className="text-xs text-zinc-500">Enter your email below to create your account</p>
                    </div>
                    <div className="space-y-2">
                      <input 
                        placeholder="m@example.com" 
                        className={`flex h-9 w-full rounded-md border px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-400 ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                        }`}
                      />
                      <button className={`w-full h-9 rounded-md font-bold text-xs transition-colors ${
                        isDark ? 'bg-zinc-100 hover:bg-white text-zinc-950' : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                      }`}>
                        Sign In with Email
                      </button>
                    </div>
                  </div>
                )}

                {/* 24. SEPARATOR */}
                {selectedComponent.id === 'separator' && (
                  <div className="w-full max-w-sm space-y-3">
                    <div className="space-y-1">
                      <h4 className={`text-sm font-medium leading-none ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Lumina Primitives</h4>
                      <p className="text-xs text-zinc-500">An open-source UI component library for Angular.</p>
                    </div>
                    <div className={`shrink-0 h-[1px] w-full ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                    <div className="flex h-5 items-center space-x-4 text-xs text-zinc-500">
                      <div>Blog</div>
                      <div className={`shrink-0 h-full w-[1px] ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                      <div>Docs</div>
                      <div className={`shrink-0 h-full w-[1px] ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                      <div>Source</div>
                    </div>
                  </div>
                )}

                {/* 25. RESIZABLE PANELS */}
                {selectedComponent.id === 'resizable' && (
                  <div className={`w-full max-w-md h-32 rounded-xl border flex overflow-hidden ${
                    isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'
                  }`}>
                    <div className="flex-1 p-4 text-xs font-semibold flex items-center justify-center text-zinc-500">
                      Panel One
                    </div>
                    <div className={`w-2 cursor-col-resize flex items-center justify-center ${
                      isDark ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300'
                    }`}>
                      <div className="h-4 w-0.5 bg-zinc-400"></div>
                    </div>
                    <div className="flex-1 p-4 text-xs font-semibold flex items-center justify-center text-zinc-500">
                      Panel Two
                    </div>
                  </div>
                )}

                {/* 26. SIDEBAR */}
                {selectedComponent.id === 'sidebar' && (
                  <div className={`w-full max-w-sm h-48 rounded-xl border flex overflow-hidden text-xs ${
                    isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'
                  }`}>
                    <div className={`border-r p-3 space-y-2 transition-all ${sidebarCollapsed ? 'w-12' : 'w-36'} ${
                      isDark ? 'border-zinc-800 bg-zinc-900/40' : 'border-zinc-200 bg-zinc-50'
                    }`}>
                      <button 
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="text-[10px] text-zinc-400 font-bold"
                      >
                        {sidebarCollapsed ? '→' : '← Collapse'}
                      </button>
                      <div className="space-y-1">
                        <div className="font-semibold text-zinc-800 dark:text-zinc-200 truncate">Dashboard</div>
                        <div className="text-zinc-500 truncate">Settings</div>
                      </div>
                    </div>
                    <div className="flex-1 p-4 text-zinc-400">Main application layout area</div>
                  </div>
                )}

                {/* 27. TABS */}
                {selectedComponent.id === 'tabs' && (
                  <div className="w-full max-w-md space-y-3">
                    <div className={`inline-flex h-9 items-center justify-center rounded-lg p-1 border w-full ${
                      isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}>
                      {['account', 'password'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTabVal(t)}
                          className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all flex-1 capitalize ${
                            activeTabVal === t 
                              ? isDark ? 'bg-zinc-950 text-zinc-100 shadow-xs' : 'bg-white text-zinc-900 shadow-xs'
                              : 'hover:opacity-80'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <div className={`rounded-xl border p-4 text-xs ${
                      isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-300' : 'border-zinc-200 bg-white text-zinc-700 shadow-xs'
                    }`}>
                      {activeTabVal === 'account' ? (
                        <p>Manage your account settings with pure reactive Signals.</p>
                      ) : (
                        <p>Change your password here. Updates without zone.js ticks.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 28. ACCORDION */}
                {selectedComponent.id === 'accordion' && (
                  <div className={`w-full max-w-md divide-y border-y text-xs ${
                    isDark ? 'divide-zinc-800 border-zinc-800' : 'divide-zinc-200 border-zinc-200'
                  }`}>
                    {[
                      { q: 'Is it accessible?', a: 'Yes. It adheres to the WAI-ARIA disclosure pattern.' },
                      { q: 'Is it Zoneless?', a: 'Yes! It runs on native Angular Signals without Zone.js.' },
                      { q: 'Is it styled?', a: 'Yes. It uses clean Tailwind utility classes.' }
                    ].map((item, idx) => (
                      <div key={idx} className="py-2.5">
                        <button
                          onClick={() => setAccordionItem(accordionItem === idx ? null : idx)}
                          className={`flex flex-1 items-center justify-between w-full font-medium transition-all hover:underline text-left cursor-pointer ${
                            isDark ? 'text-zinc-100' : 'text-zinc-900'
                          }`}
                        >
                          <span>{item.q}</span>
                          <span className="font-mono text-sm opacity-60">{accordionItem === idx ? '−' : '+'}</span>
                        </button>
                        {accordionItem === idx && (
                          <div className={`pb-2 pt-1 text-xs leading-relaxed animate-in fade-in ${
                            isDark ? 'text-zinc-400' : 'text-zinc-600'
                          }`}>
                            {item.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 29. COMMAND PALETTE */}
                {selectedComponent.id === 'command' && (
                  <div className="flex flex-col items-center gap-3">
                    <button
                      onClick={() => setCommandOpen(true)}
                      className={`px-4 py-2 rounded-md border text-xs font-semibold flex items-center gap-2 ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-100' : 'border-zinc-300 bg-white text-zinc-900'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Press ⌘K or Click to Open Command Palette</span>
                    </button>
                    {commandOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="fixed inset-0 bg-black/80" onClick={() => setCommandOpen(false)}></div>
                        <div className={`relative max-w-md w-full rounded-xl border p-4 shadow-2xl z-10 text-xs space-y-3 ${
                          isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                        }`}>
                          <input 
                            placeholder="Type a command or search..."
                            className="w-full bg-transparent border-b pb-2 text-xs outline-none"
                            autoFocus
                          />
                          <div className="space-y-1">
                            <div className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex justify-between">
                              <span>Profile</span><span className="font-mono text-[10px] text-zinc-400">⌘P</span>
                            </div>
                            <div className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex justify-between">
                              <span>Billing</span><span className="font-mono text-[10px] text-zinc-400">⌘B</span>
                            </div>
                            <div className="p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 flex justify-between">
                              <span>Settings</span><span className="font-mono text-[10px] text-zinc-400">⌘,</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 30. MENUBAR & NAVIGATION MENU */}
                {(selectedComponent.id === 'menubar' || selectedComponent.id === 'navigation-menu') && (
                  <div className={`flex items-center gap-1 rounded-md border p-1 text-xs ${
                    isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                  }`}>
                    <button className="px-3 py-1 font-semibold rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">File</button>
                    <button className="px-3 py-1 font-semibold rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Edit</button>
                    <button className="px-3 py-1 font-semibold rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">View</button>
                    <button className="px-3 py-1 font-semibold rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">Help</button>
                  </div>
                )}

                {/* 31. STEPPER */}
                {selectedComponent.id === 'stepper' && (
                  <div className="space-y-4 w-full max-w-md">
                    <div className="flex items-center justify-between">
                      {['Details', 'Security', 'Billing'].map((s, idx) => (
                        <div key={s} className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentStep(idx + 1)}>
                          <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                            currentStep >= idx + 1
                              ? isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
                              : isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="text-xs font-medium">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 32. BADGE */}
                {selectedComponent.id === 'badge' && (
                  <div className="flex flex-wrap gap-2">
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                      isDark ? 'border-transparent bg-zinc-100 text-zinc-950' : 'border-transparent bg-zinc-900 text-white'
                    }`}>
                      Default
                    </span>
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                      isDark ? 'border-transparent bg-zinc-800 text-zinc-100' : 'border-zinc-200 bg-zinc-100 text-zinc-900'
                    }`}>
                      Secondary
                    </span>
                    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${
                      isDark ? 'border-zinc-800 text-zinc-100' : 'border-zinc-300 text-zinc-800'
                    }`}>
                      Outline
                    </span>
                    <span className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                      Destructive
                    </span>
                  </div>
                )}

                {/* 33. AVATAR */}
                {selectedComponent.id === 'avatar' && (
                  <div className="flex items-center gap-3">
                    <span className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border ${
                      isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-200' : 'border-zinc-200 bg-zinc-100 text-zinc-700'
                    }`}>
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold">
                        CN
                      </span>
                    </span>
                    <span className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full border ${
                      isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-300' : 'border-zinc-200 bg-zinc-100 text-zinc-700'
                    }`}>
                      <span className="flex h-full w-full items-center justify-center text-xs font-bold">
                        NG
                      </span>
                    </span>
                  </div>
                )}

                {/* 34. PROGRESS */}
                {selectedComponent.id === 'progress' && (
                  <div className="w-full max-w-sm space-y-3">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>Uploading asset</span>
                      <span className="font-mono">{progressVal}%</span>
                    </div>
                    <div className={`h-2 w-full rounded-full overflow-hidden ${
                      isDark ? 'bg-zinc-800' : 'bg-zinc-200'
                    }`}>
                      <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressVal}%` }}></div>
                    </div>
                    <button 
                      onClick={() => setProgressVal(p => (p >= 100 ? 10 : p + 25))} 
                      className="text-xs text-indigo-500 font-semibold"
                    >
                      Step Progress Signal
                    </button>
                  </div>
                )}

                {/* 35. SKELETON */}
                {selectedComponent.id === 'skeleton' && (
                  <div className="space-y-3 w-full max-w-xs">
                    <div className={`h-8 w-8 rounded-full animate-pulse ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                    <div className={`h-4 w-48 rounded animate-pulse ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                    <div className={`h-3 w-32 rounded animate-pulse ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
                  </div>
                )}

                {/* 36. TABLE & DATA TABLE */}
                {(selectedComponent.id === 'table' || selectedComponent.id === 'data-table') && (
                  <div className={`w-full max-w-md rounded-xl border overflow-hidden text-xs ${
                    isDark ? 'border-zinc-800' : 'border-zinc-200'
                  }`}>
                    <table className="w-full text-left">
                      <thead className={`border-b ${isDark ? 'bg-zinc-900 border-zinc-800 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}`}>
                        <tr>
                          <th className="p-3 cursor-pointer" onClick={() => setSortAsc(!sortAsc)}>Name {sortAsc ? '↑' : '↓'}</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                          <td className="p-3 font-semibold">Lumina UI</td>
                          <td className="p-3 text-emerald-500 font-medium">Published</td>
                          <td className="p-3 font-mono text-zinc-400">Signals</td>
                        </tr>
                        <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                          <td className="p-3 font-semibold">Angular 19</td>
                          <td className="p-3 text-cyan-500 font-medium">Active</td>
                          <td className="p-3 font-mono text-zinc-400">Zoneless</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* 37. CALENDAR & DATE PICKER */}
                {(selectedComponent.id === 'calendar' || selectedComponent.id === 'date-picker') && (
                  <div className={`rounded-xl border p-4 max-w-xs w-full text-xs space-y-3 ${
                    isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between font-bold">
                      <span>October 2026</span>
                      <span className="text-zinc-500 font-mono text-[11px]">{datePickerDate}</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px]">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <span key={d} className="text-zinc-400 py-1">{d}</span>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                        <button
                          key={day}
                          onClick={() => setDatePickerDate(`Oct ${day}, 2026`)}
                          className={`h-7 w-7 rounded flex items-center justify-center transition-colors ${
                            datePickerDate === `Oct ${day}, 2026`
                              ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold' : 'bg-zinc-900 text-white font-bold'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 38. CAROUSEL */}
                {selectedComponent.id === 'carousel' && (() => {
                  const maxAllowedCards = 6;
                  const totalCards = Math.min(Math.max(1, carouselSlideCount), maxAllowedCards);
                  const effectivePerView = Math.min(carouselSlidesPerView, totalCards);
                  const maxIndex = Math.max(0, totalCards - effectivePerView);

                  const allCards = [
                    { id: 1, title: 'Signals Core', tag: 'Reactivity', desc: 'Zoneless fine-grained reactive state without dirty loops.', bg: 'from-blue-500/10 via-indigo-500/10 to-violet-500/10', border: 'border-blue-500/30' },
                    { id: 2, title: 'Tailwind v4', tag: 'Styling', desc: 'Native CSS theme tokens and class-based dark mode.', bg: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10', border: 'border-emerald-500/30' },
                    { id: 3, title: 'CDK Portals', tag: 'Accessibility', desc: 'Robust overlay positioning and focus trap management.', bg: 'from-amber-500/10 via-orange-500/10 to-rose-500/10', border: 'border-amber-500/30' },
                    { id: 4, title: 'Smooth Motion', tag: 'Animation', desc: 'Hardware-accelerated transforms with spring easing curves.', bg: 'from-purple-500/10 via-pink-500/10 to-rose-500/10', border: 'border-purple-500/30' },
                    { id: 5, title: 'Multi-Slide', tag: 'Flexibility', desc: 'Configurable slides-to-scroll and visible slides per view.', bg: 'from-cyan-500/10 via-sky-500/10 to-blue-500/10', border: 'border-cyan-500/30' },
                    { id: 6, title: 'APF Standard', tag: 'Packaging', desc: 'Single publish to npm, instantly consumable in bun and pnpm.', bg: 'from-rose-500/10 via-red-500/10 to-orange-500/10', border: 'border-rose-500/30' },
                  ];

                  const cards = allCards.slice(0, totalCards);

                  const handlePrev = () => {
                    setCarouselSlide(curr => {
                      const nextIdx = curr - carouselSlidesToScroll;
                      if (nextIdx < 0) {
                        return carouselLoop ? maxIndex : 0;
                      }
                      return Math.max(0, nextIdx);
                    });
                  };

                  const handleNext = () => {
                    setCarouselSlide(curr => {
                      const nextIdx = curr + carouselSlidesToScroll;
                      if (nextIdx > maxIndex) {
                        return carouselLoop ? 0 : maxIndex;
                      }
                      return Math.min(maxIndex, nextIdx);
                    });
                  };

                  const easingCurves: Record<string, string> = {
                    spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    natural: 'cubic-bezier(0.25, 1, 0.5, 1)',
                    material: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    linear: 'linear'
                  };

                  const selectedCurve = easingCurves[carouselEasing] || easingCurves.spring;
                  const transitionStyle = `transform ${carouselTimingMs}ms ${selectedCurve}`;

                  const totalDots = Math.ceil(totalCards / carouselSlidesToScroll);

                  const handleSlideCountChange = (newCount: number) => {
                    const clamped = Math.min(maxAllowedCards, Math.max(1, newCount));
                    setCarouselSlideCount(clamped);
                    // Also clamp slidesPerView to not exceed new total cards
                    if (carouselSlidesPerView > clamped) {
                      setCarouselSlidesPerView(clamped);
                    }
                    const newMax = Math.max(0, clamped - Math.min(carouselSlidesPerView, clamped));
                    if (carouselSlide > newMax) {
                      setCarouselSlide(newMax);
                    }
                  };

                  const canScroll = totalCards > effectivePerView;

                  return (
                    <div className={`w-full transition-all duration-300 space-y-4 ${
                      effectivePerView >= 4 ? 'max-w-4xl' : effectivePerView === 3 ? 'max-w-3xl' : 'max-w-2xl'
                    }`}>
                      {/* Carousel Interactive Settings Toolbar */}
                      <div className={`p-4 rounded-xl border space-y-3.5 transition-colors ${
                        isDark ? 'border-zinc-800 bg-zinc-900/60' : 'border-zinc-200 bg-white shadow-xs'
                      }`}>
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100">
                            <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Carousel Configuration &amp; Timing Controls</span>
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold">
                              {totalCards} of {maxAllowedCards} Slides
                            </span>
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-bold">
                              {effectivePerView === totalCards ? `All ${totalCards} Cards Shown` : `${effectivePerView} of ${totalCards} Visible`}
                            </span>
                          </div>
                        </div>

                        {/* Top Controls Grid: Slide Count (Max 6) & Smoothness Timing */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 rounded-lg border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
                          
                          {/* 1. Dynamic Slide Count (Max 6) */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                Total Slides (Max 6):
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={totalCards <= 1}
                                  onClick={() => handleSlideCountChange(totalCards - 1)}
                                  className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[10px] cursor-pointer"
                                >
                                  - Remove
                                </button>
                                <button
                                  type="button"
                                  disabled={totalCards >= maxAllowedCards}
                                  onClick={() => handleSlideCountChange(totalCards + 1)}
                                  className="px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed font-mono text-[10px] font-bold cursor-pointer"
                                >
                                  + Add Slide
                                </button>
                              </div>
                            </div>

                            {/* Selectable Number of Slides up to 6 */}
                            <div className={`grid grid-cols-6 gap-1 p-0.5 rounded-lg border ${
                              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                            }`}>
                              {[1, 2, 3, 4, 5, 6].map(num => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => handleSlideCountChange(num)}
                                  className={`py-1 rounded text-center text-xs font-bold transition-all ${
                                    totalCards === num
                                      ? 'bg-indigo-600 text-white shadow-xs'
                                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                                  }`}
                                  title={`Set carousel to ${num} slide${num > 1 ? 's' : ''} (max 6)`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-400 block">
                              Add or select number of slides. Maximum 6 slides allowed.
                            </span>
                          </div>

                          {/* 2. Smoothness Timing Selector (Duration in ms) */}
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                                Smoothness Timing (Duration):
                              </span>
                              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/50">
                                {carouselTimingMs}ms ({(carouselTimingMs / 1000).toFixed(2)}s)
                              </span>
                            </div>

                            {/* Timing Range Slider */}
                            <input
                              type="range"
                              min="150"
                              max="1800"
                              step="50"
                              value={carouselTimingMs}
                              onChange={(e) => setCarouselTimingMs(Number(e.target.value))}
                              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-400 bg-zinc-200 dark:bg-zinc-800"
                              title={`Current transition timing: ${carouselTimingMs}ms`}
                            />

                            {/* Quick Timing Presets */}
                            <div className="flex items-center justify-between gap-1 pt-0.5 text-[10px]">
                              {[
                                { ms: 250, label: '250ms (Fast)' },
                                { ms: 450, label: '450ms (Natural)' },
                                { ms: 650, label: '650ms (Smooth)' },
                                { ms: 1000, label: '1000ms (Silky)' },
                                { ms: 1500, label: '1500ms (Cinematic)' }
                              ].map(preset => (
                                <button
                                  key={preset.ms}
                                  type="button"
                                  onClick={() => setCarouselTimingMs(preset.ms)}
                                  className={`px-1.5 py-0.5 rounded font-mono transition-all ${
                                    carouselTimingMs === preset.ms
                                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold shadow-xs'
                                      : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 bg-white/60 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800'
                                  }`}
                                  title={preset.label}
                                >
                                  {preset.ms}ms
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Secondary Configuration: Visible Cards (up to 6), Slides per Click, Easing */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-1 text-[11px]">
                          
                          {/* 1. Dynamic Visible Cards (Up to 6 based on available cards) */}
                          <div className="sm:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-zinc-500 dark:text-zinc-400 font-medium">
                                Visible Cards (Show 1 to {totalCards} Cards):
                              </label>
                              <span className="text-[10px] font-mono text-indigo-500 dark:text-indigo-400 font-semibold">
                                {effectivePerView === totalCards ? 'All shown (Sliders hidden)' : `${effectivePerView} visible`}
                              </span>
                            </div>
                            <div className={`grid gap-1 p-0.5 rounded-lg border ${
                              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                            }`} style={{ gridTemplateColumns: `repeat(${totalCards}, minmax(0, 1fr))` }}>
                              {Array.from({ length: totalCards }, (_, i) => i + 1).map(num => (
                                <button
                                  key={num}
                                  type="button"
                                  onClick={() => {
                                    setCarouselSlidesPerView(num);
                                    if (carouselSlide > Math.max(0, totalCards - num)) {
                                      setCarouselSlide(Math.max(0, totalCards - num));
                                    }
                                  }}
                                  className={`py-1 rounded text-center font-bold text-xs transition-all ${
                                    effectivePerView === num
                                      ? 'bg-indigo-600 text-white shadow-xs'
                                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                                  }`}
                                  title={`Show ${num} card${num > 1 ? 's' : ''} simultaneously`}
                                >
                                  {num}
                                </button>
                              ))}
                            </div>
                            <span className="text-[10px] text-zinc-400 mt-0.5 block">
                              {effectivePerView === totalCards 
                                ? 'All cards are visible in view: Left and Right sliders are automatically hidden.'
                                : `Select how many cards to show at once (1 to ${totalCards} cards).`}
                            </span>
                          </div>

                          {/* 2. Slides to scroll per click */}
                          <div>
                            <label className="text-zinc-500 dark:text-zinc-400 block mb-1 font-medium">
                              Slide per Click:
                            </label>
                            <div className={`inline-flex rounded-lg border p-0.5 w-full ${
                              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                            }`}>
                              {[1, 2, 3].map(step => (
                                <button
                                  key={step}
                                  type="button"
                                  onClick={() => setCarouselSlidesToScroll(step)}
                                  className={`flex-1 py-1 rounded text-center font-bold transition-all ${
                                    carouselSlidesToScroll === step
                                      ? isDark ? 'bg-zinc-100 text-zinc-950 shadow-xs' : 'bg-white text-zinc-950 shadow-xs'
                                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                                  }`}
                                >
                                  {step}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* 3. Slider Button Layout */}
                          <div>
                            <label className="text-zinc-500 dark:text-zinc-400 block mb-1 font-medium">
                              Buttons:
                            </label>
                            <div className={`inline-flex rounded-lg border p-0.5 w-full ${
                              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-100'
                            }`}>
                              {(['outer', 'sides'] as const).map(pos => (
                                <button
                                  key={pos}
                                  type="button"
                                  onClick={() => setCarouselBtnPosition(pos)}
                                  className={`flex-1 py-1 rounded text-center font-bold transition-all ${
                                    carouselBtnPosition === pos
                                      ? isDark ? 'bg-zinc-100 text-zinc-950 shadow-xs' : 'bg-white text-zinc-950 shadow-xs'
                                      : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
                                  }`}
                                >
                                  {pos === 'outer' ? 'Flank' : 'Float'}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={carouselLoop}
                              onChange={(e) => setCarouselLoop(e.target.checked)}
                              className="rounded border-zinc-300 dark:border-zinc-700 accent-indigo-500 cursor-pointer"
                            />
                            <span>Continuous Circular Wrap (Loop)</span>
                          </label>

                          <div className="flex items-center gap-2">
                            <span className="font-mono text-zinc-400">
                              {effectivePerView} of {totalCards} cards in viewport
                            </span>
                            <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                              {carouselTimingMs}ms
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Main Carousel Area with Left and Right Navigation Buttons Flanking (Borderless) */}
                      <div className={`relative rounded-2xl p-3 sm:p-5 transition-colors ${
                        isDark ? 'bg-zinc-950/70' : 'bg-white shadow-xs'
                      }`}>
                        
                        {/* Horizontal Layout: [LEFT BUTTON (if canScroll)] - [CAROUSEL VIEWPORT] - [RIGHT BUTTON (if canScroll)] */}
                        <div className="flex items-center gap-2 sm:gap-3 relative">
                          
                          {/* LEFT SLIDER BUTTON - Hidden when visible cards == total cards */}
                          {canScroll && (
                            <button
                              type="button"
                              onClick={handlePrev}
                              disabled={!carouselLoop && (maxIndex === 0 || carouselSlide <= 0)}
                              className={`${
                                carouselBtnPosition === 'sides'
                                  ? 'absolute -left-2 sm:-left-4 top-1/2 -translate-y-1/2 z-20'
                                  : 'relative shrink-0'
                              } h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              aria-label={`Previous slide (Left Button - Advance by ${carouselSlidesToScroll})`}
                              title={`Slide Left (Step: ${carouselSlidesToScroll} slide${carouselSlidesToScroll > 1 ? 's' : ''}, Timing: ${carouselTimingMs}ms)`}
                            >
                              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                            </button>
                          )}

                          {/* Center Viewport Track */}
                          <div className={`flex-1 overflow-hidden rounded-xl p-1 ${
                            carouselBtnPosition === 'sides' && canScroll ? 'mx-3 sm:mx-4' : ''
                          }`}>
                            <div
                              className="flex"
                              style={{
                                transform: `translateX(-${carouselSlide * (100 / effectivePerView)}%)`,
                                transition: transitionStyle,
                                willChange: 'transform'
                              }}
                            >
                              {cards.map((card) => (
                                <div
                                  key={card.id}
                                  style={{ flex: `0 0 ${100 / effectivePerView}%` }}
                                  className="px-1.5 sm:px-2 box-border min-w-0"
                                >
                                  <div className={`rounded-xl border flex flex-col justify-between bg-gradient-to-br ${card.bg} ${card.border} transition-all ${
                                    effectivePerView >= 5 
                                      ? 'h-44 p-2.5' 
                                      : effectivePerView >= 3 
                                      ? 'h-48 p-3.5' 
                                      : 'h-52 p-5'
                                  }`}>
                                    <div className="flex items-center justify-between">
                                      <span className={`font-mono rounded-full border border-zinc-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 font-semibold text-zinc-800 dark:text-zinc-200 ${
                                        effectivePerView >= 4 ? 'text-[9px] px-1.5 py-0.2' : 'text-[10px] px-2 py-0.5'
                                      }`}>
                                        {card.tag}
                                      </span>
                                      <span className="text-[10px] font-bold font-mono text-zinc-400">
                                        0{card.id}
                                      </span>
                                    </div>

                                    <div className="my-1">
                                      <h4 className={`font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-0.5 truncate ${
                                        effectivePerView >= 4 ? 'text-xs' : effectivePerView === 3 ? 'text-sm' : 'text-base'
                                      }`}>
                                        {card.title}
                                      </h4>
                                      <p className={`text-zinc-600 dark:text-zinc-400 leading-snug line-clamp-2 ${
                                        effectivePerView >= 4 ? 'text-[10px]' : 'text-xs'
                                      }`}>
                                        {card.desc}
                                      </p>
                                    </div>

                                    <div className={`font-medium text-indigo-600 dark:text-indigo-400 flex items-center justify-between ${
                                      effectivePerView >= 4 ? 'text-[10px]' : 'text-[11px]'
                                    }`}>
                                      <span className="flex items-center gap-1 truncate">
                                        <span className="truncate">{effectivePerView >= 4 ? `Slide ${card.id}` : `Interactive Slide ${card.id}`}</span>
                                        <ChevronRight className="w-2.5 h-2.5 shrink-0" />
                                      </span>
                                      <span className="text-[9px] font-mono opacity-60 shrink-0">#{card.id}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* RIGHT SLIDER BUTTON - Hidden when visible cards == total cards */}
                          {canScroll && (
                            <button
                              type="button"
                              onClick={handleNext}
                              disabled={!carouselLoop && (maxIndex === 0 || carouselSlide >= maxIndex)}
                              className={`${
                                carouselBtnPosition === 'sides'
                                  ? 'absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 z-20'
                                  : 'relative shrink-0'
                              } h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                              aria-label={`Next slide (Right Button - Advance by ${carouselSlidesToScroll})`}
                              title={`Slide Right (Step: ${carouselSlidesToScroll} slide${carouselSlidesToScroll > 1 ? 's' : ''}, Timing: ${carouselTimingMs}ms)`}
                            >
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                          )}
                        </div>

                        {/* Subtle Bottom Indicators (Borderless) */}
                        <div className="flex items-center justify-between pt-3 mt-2 text-xs">
                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            {canScroll ? (
                              <>
                                Slide <strong className="text-zinc-900 dark:text-zinc-100">{carouselSlide + 1}</strong> of {totalCards} • <span className="text-indigo-600 dark:text-indigo-400 font-bold">{effectivePerView} Cards Visible</span>
                              </>
                            ) : (
                              <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                ✓ All {totalCards} cards visible simultaneously (Sliders hidden)
                              </span>
                            )}
                          </span>

                          {/* Visual Indicator Dots (only shown if there are multiple pages) */}
                          {canScroll && totalDots > 1 ? (
                            <div className="flex items-center gap-1.5" aria-hidden="true">
                              {Array.from({ length: totalDots }).map((_, dotIdx) => {
                                const targetSlide = Math.min(dotIdx * carouselSlidesToScroll, maxIndex);
                                const isCurrentDot = Math.floor(carouselSlide / carouselSlidesToScroll) === dotIdx;
                                return (
                                  <button
                                    key={dotIdx}
                                    type="button"
                                    onClick={() => setCarouselSlide(targetSlide)}
                                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                      isCurrentDot
                                        ? 'w-6 bg-indigo-600 dark:bg-indigo-400'
                                        : 'w-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600'
                                    }`}
                                    title={`Jump to slide ${targetSlide + 1}`}
                                  />
                                );
                              })}
                            </div>
                          ) : null}

                          <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                            Timing: <strong className="text-zinc-900 dark:text-zinc-100">{carouselTimingMs}ms</strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* 39. RATING */}
                {selectedComponent.id === 'rating' && (
                  <div className="space-y-2 text-center">
                    <div className="flex gap-1 text-2xl">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button 
                          key={s} 
                          onClick={() => setStarRating(s)}
                          className={`cursor-pointer transition-transform hover:scale-110 ${s <= starRating ? 'text-amber-400' : 'text-zinc-300 dark:text-zinc-700'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-500 font-mono">Current Score: {starRating} / 5 stars</p>
                  </div>
                )}

                {/* 40. STAT CARD */}
                {selectedComponent.id === 'stat-card' && (
                  <div className={`p-6 rounded-xl border max-w-xs w-full space-y-2 shadow-xs ${
                    isDark ? 'border-zinc-800 bg-zinc-950 text-zinc-100' : 'border-zinc-200 bg-white text-zinc-900'
                  }`}>
                    <div className="flex justify-between text-xs text-zinc-500 font-semibold">
                      <span>Total Revenue</span>
                      <span className="text-emerald-500 font-bold">+20.1%</span>
                    </div>
                    <div className="text-3xl font-black tracking-tight">$45,231.89</div>
                    <p className="text-[11px] text-zinc-400">+180 new customers today</p>
                  </div>
                )}

                {/* 41. KBD & COPY BUTTON */}
                {(selectedComponent.id === 'kbd' || selectedComponent.id === 'copy-button') && (
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center gap-1 rounded border px-2 py-1 font-mono text-xs font-semibold ${
                      isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-300' : 'border-zinc-200 bg-zinc-100 text-zinc-700'
                    }`}>
                      ⌘K
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('npm i @lumina-ui/angular');
                        setCopiedKey('test-copy');
                        setTimeout(() => setCopiedKey(null), 1500);
                      }}
                      className={`px-3 py-1.5 rounded border text-xs font-medium flex items-center gap-1.5 ${
                        isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-200' : 'border-zinc-300 bg-white text-zinc-800'
                      }`}
                    >
                      {copiedKey === 'test-copy' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'test-copy' ? 'Copied!' : 'Copy Code'}</span>
                    </button>
                  </div>
                )}

                {/* FALLBACK SIMULATION IF NO SPECIFIC ID */}
                {![
                  'button', 'input', 'textarea', 'label', 'checkbox', 'radio-group', 'select', 'switch', 'slider',
                  'input-otp', 'combobox', 'toggle', 'toggle-group', 'file-dropzone', 'form', 'dialog', 'alert-dialog',
                  'sheet', 'drawer', 'toast', 'popover', 'tooltip', 'dropdown-menu', 'context-menu', 'alert', 'hover-card',
                  'card', 'separator', 'resizable', 'sidebar', 'tabs', 'accordion', 'command', 'menubar', 'navigation-menu',
                  'stepper', 'badge', 'avatar', 'progress', 'skeleton', 'table', 'data-table', 'calendar', 'date-picker',
                  'carousel', 'rating', 'stat-card', 'kbd', 'copy-button'
                ].includes(selectedComponent.id) && (
                  <div className="text-center space-y-2 p-6">
                    <div className={`h-12 w-12 rounded-full mx-auto flex items-center justify-center ${
                      isDark ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800'
                    }`}>
                      <Layers className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-sm">{selectedComponent.name}</h4>
                    <p className="text-xs text-zinc-500 max-w-sm">{selectedComponent.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      100% Zoneless Signals Native
                    </span>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* VIEW 2: PRODUCTION ANGULAR SOURCE CODE */}
          {activeView === 'code' && (
            <div className={`rounded-xl border overflow-hidden text-zinc-100 ${
              isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-zinc-950'
            }`}>
              <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>src/app/components/ui/{selectedComponent.id}.component.ts</span>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  <span>100% Zoneless &bull; Angular Signals</span>
                </span>
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
            <h3 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <Terminal className="w-3.5 h-3.5" />
              <span>Usage in your Angular templates</span>
            </h3>
            <button
              onClick={() => copyCode(selectedComponent.consumerUsage, 'usage-block')}
              className={`text-xs flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white bg-zinc-900 border-zinc-800' : 'text-zinc-600 hover:text-zinc-900 bg-zinc-100 border-zinc-200'
              }`}
            >
              {copiedKey === 'usage-block' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'usage-block' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className={`rounded-xl border p-4 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed ${
            isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-300 bg-zinc-950'
          }`}>
            {selectedComponent.consumerUsage}
          </pre>
        </div>

        {/* API Reference Table */}
        <div className="space-y-3">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            API Reference (@Input Signals)
          </h3>
          <div className={`rounded-xl border overflow-hidden ${isDark ? 'border-zinc-800' : 'border-zinc-200 shadow-xs'}`}>
            <table className="w-full text-left text-xs">
              <thead className={`uppercase tracking-wider font-semibold border-b ${
                isDark ? 'bg-zinc-900/80 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
              }`}>
                <tr>
                  <th className="py-2.5 px-4 font-mono">Property</th>
                  <th className="py-2.5 px-4 font-mono">Type</th>
                  <th className="py-2.5 px-4 font-mono">Default</th>
                  <th className="py-2.5 px-4">Description</th>
                </tr>
              </thead>
              <tbody className={`divide-y font-mono ${
                isDark ? 'divide-zinc-800/80 bg-zinc-950/40 text-zinc-300' : 'divide-zinc-200 bg-white text-zinc-700'
              }`}>
                {selectedComponent.inputs.map((inp) => (
                  <tr key={inp.name}>
                    <td className={`py-2.5 px-4 font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>{inp.name}</td>
                    <td className="py-2.5 px-4 text-cyan-600 dark:text-cyan-400 font-semibold">{inp.type}</td>
                    <td className={`py-2.5 px-4 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>{inp.default || '-'}</td>
                    <td className={`py-2.5 px-4 font-sans ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{inp.description}</td>
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
