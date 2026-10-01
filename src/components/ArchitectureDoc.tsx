/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Boxes, 
  Layers, 
  Cpu, 
  Code2, 
  Palette, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  FolderTree, 
  FileText,
  Copy,
  Check,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Zap
} from 'lucide-react';

interface ArchitectureDocProps {
  themeMode?: 'dark' | 'light';
}

export default function ArchitectureDoc({
  themeMode = 'dark'
}: ArchitectureDocProps) {
  const isDark = themeMode === 'dark';
  const [activeSection, setActiveSection] = useState<string>('overall');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const sections = [
    { id: 'overall', title: '1. Overall Architecture', icon: Layers },
    { id: 'deps', title: '2. Angular Version & Dependencies', icon: Cpu },
    { id: 'folder', title: '3. Monorepo & Folder Structure', icon: FolderTree },
    { id: 'styling', title: '4. Styling Strategy & Bootstrap Fit', icon: Palette },
    { id: 'tokens', title: '5. Theme & Token System', icon: Sparkles },
    { id: 'headless', title: '6. Headless Primitives & CDK', icon: ShieldCheck },
    { id: 'coverage', title: '7. Full Component Coverage Matrix', icon: Boxes },
    { id: 'packaging', title: '8. Build & Packaging (APF)', icon: Terminal },
    { id: 'docs', title: '9. Documentation & Showcase Plan', icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Table of contents sidebar */}
      <div className="lg:col-span-4 space-y-2">
        <div className={`sticky top-20 border rounded-2xl p-4 transition-colors ${
          isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 px-2 ${
            isDark ? 'text-zinc-400' : 'text-zinc-500'
          }`}>
            Architecture Blueprint Index
          </h3>
          <div className="space-y-1">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left ${
                    isActive 
                      ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'bg-zinc-900 text-white font-bold shadow-xs'
                      : isDark ? 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60' : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90' : 'opacity-40'}`} />
                </button>
              );
            })}
          </div>

          <div className={`mt-6 pt-4 border-t text-[11px] px-2 leading-relaxed ${
            isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-200 text-zinc-500'
          }`}>
            Designed specifically for Angular 18/19 Signals, Standalone Components, and the Angular Package Format (APF).
          </div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className={`lg:col-span-8 border rounded-2xl p-6 sm:p-8 space-y-6 transition-colors ${
        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        
        {/* SECTION 1: OVERALL ARCHITECTURE */}
        {activeSection === 'overall' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>1. Overall Architecture</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Philosophy, Composability, and Angular Primitives</p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Unlike React's JSX model, Angular components excel through <strong>content projection (<code className="font-mono text-indigo-500">&lt;ng-content&gt;</code>)</strong>, 
              <strong>directives as behaviors</strong>, <strong>HostBindings</strong>, and <strong>Angular CDK primitives</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>1. Two-Layer Architecture</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <strong>Primitives Layer:</strong> Headless state, keyboard navigation, overlay management, and accessibility (CDK-backed).<br/>
                  <strong>Styled Layer:</strong> Tailored with Tailwind utility classes consuming CSS custom variables.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>2. Pure Signals (100% Zoneless)</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  No Zone.js overhead or legacy OnPush checks. Components use Angular 18/19 <code className="font-mono">input()</code>, <code className="font-mono">output()</code>, <code className="font-mono">model()</code>, and <code className="font-mono">computed()</code> for direct reactive graph notifications without dirty-checking loops.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>3. Full Forms Integration</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Every form component (Input, Select, Switch, Checkbox, Slider) implements Angular's <code className="font-mono">ControlValueAccessor</code>, natively supporting both <code className="font-mono">[formControl]</code> and <code className="font-mono">[(ngModel)]</code>.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className={`font-semibold text-sm mb-1 ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>4. Class Variance Authority in Angular</h4>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  A lightweight <code className="font-mono">cn()</code> helper (<code className="font-mono">clsx</code> + <code className="font-mono">tailwind-merge</code>) dynamically resolves conflicting Tailwind classes passed into host elements.
                </p>
              </div>
            </div>

            {/* Signals vs OnPush & Zone.js Comparison Card */}
            <div className={`mt-6 p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-zinc-950 border-emerald-900/40 text-zinc-200' : 'bg-emerald-50/50 border-emerald-200 text-zinc-900'
            }`}>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                <h3 className="font-bold text-sm">Why Pure Signals Beat Legacy ChangeDetectionStrategy.OnPush &amp; Zone.js</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'}`}>
                  <div className="font-bold text-red-500 mb-1">❌ Legacy Zone.js</div>
                  <p className="text-zinc-500 leading-relaxed">
                    Monkey-patches DOM events and async timers. Re-runs change detection across the entire component tree from the root, leading to wasted CPU cycles.
                  </p>
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'}`}>
                  <div className="font-bold text-amber-500 mb-1">⚠️ Legacy OnPush</div>
                  <p className="text-zinc-500 leading-relaxed">
                    Requires manually injecting <code className="font-mono">ChangeDetectorRef</code>, remembering to call <code className="font-mono">markForCheck()</code>, or relying solely on immutable inputs, making async state updates error-prone.
                  </p>
                </div>
                <div className={`p-3 rounded-lg border ${isDark ? 'bg-zinc-900/90 border-emerald-800/60' : 'bg-white border-emerald-300 shadow-xs'}`}>
                  <div className="font-bold text-emerald-600 dark:text-emerald-400 mb-1">✅ Modern Pure Signals (This Library)</div>
                  <p className="text-zinc-500 leading-relaxed">
                    Angular's reactive signal graph automatically marks ONLY the affected template node dirty! Native in Angular 18/19 with <code className="font-mono">provideExperimentalZonelessChangeDetection()</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ANGULAR VERSION & DEPS */}
        {activeSection === 'deps' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>2. Angular Version & Dependencies</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Targeting Modern Angular with Minimal Dependency Footprint</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs">
              <div className="text-zinc-400 font-semibold mb-2">// projects/ui/package.json</div>
              <pre className="text-zinc-200 leading-relaxed whitespace-pre-wrap">
{`"peerDependencies": {
  "@angular/core": "^18.0.0 || ^19.0.0",
  "@angular/common": "^18.0.0 || ^19.0.0",
  "@angular/forms": "^18.0.0 || ^19.0.0",
  "@angular/cdk": "^18.0.0 || ^19.0.0"
},
"dependencies": {
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.5.2",
  "tslib": "^2.6.2"
}`}
              </pre>
            </div>

            <div className={`space-y-2 text-xs ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <p><strong>Why this dependency strategy?</strong></p>
              <ul className={`list-disc pl-5 space-y-1.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Zero fat:</strong> We do NOT bundle large icon libraries or unnecessary runtime state engines.</li>
                <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>@angular/cdk:</strong> Provides battle-tested overlays, focus trapping, a11y live announcer, portals, and drag-drop primitives maintained directly by the Google Angular team.</li>
                <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>tailwind-merge:</strong> Guarantees that consumer classes (e.g. <code className="font-mono">p-8</code>) safely overwrite default component classes (<code className="font-mono">p-4</code>) without CSS specificity wars.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 3: FOLDER STRUCTURE */}
        {activeSection === 'folder' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <FolderTree className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>3. Monorepo & Folder Structure</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Clean Sub-path Entry Points for Zero Bundle Bloat</p>
              </div>
            </div>

            <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 overflow-x-auto leading-relaxed">
{`my-ui-workspace/
├── projects/
│   └── ui/                               # The publishable UI library
│       ├── ng-package.json               # Root ng-packagr configuration
│       ├── package.json                  # peerDependencies, keywords, license
│       ├── src/
│       │   ├── lib/
│       │   │   ├── button/
│       │   │   │   ├── button.component.ts
│       │   │   │   ├── ng-package.json   # Secondary entry point! (@my-ui/button)
│       │   │   │   └── index.ts
│       │   │   ├── dialog/
│       │   │   │   ├── dialog.component.ts
│       │   │   │   ├── ng-package.json   # Secondary entry point! (@my-ui/dialog)
│       │   │   │   └── index.ts
│       │   │   ├── input/
│       │   │   ├── select/
│       │   │   ├── tabs/
│       │   │   └── core/
│       │   │       ├── utils/cn.ts       # clsx + twMerge utility
│       │   │       └── cdk/              # Reusable CDK wrappers
│       │   ├── styles/
│       │   │   └── tokens.css            # CSS variables for :root & .dark
│       │   └── public-api.ts             # Primary root barrel export
├── apps/
│   └── docs/                             # Interactive Documentation & Sandbox
├── angular.json
├── package.json
└── tsconfig.json`}
            </pre>
          </div>
        )}

        {/* SECTION 4: STYLING STRATEGY */}
        {activeSection === 'styling' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>4. Styling Strategy & Bootstrap Coexistence</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>How Tailwind and Bootstrap coexist gracefully</p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              In enterprise Angular environments, many projects run Bootstrap or migrate from NG-Bootstrap. Our components use <strong>semantic CSS variables (<code className="font-mono">--primary</code>, <code className="font-mono">--border</code>, <code className="font-mono">--radius</code>)</strong> mapped to Tailwind classes.
            </p>

            <div className={`p-4 rounded-xl border space-y-3 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
                How to Avoid Bootstrap Class Collisions:
              </h4>
              <ul className={`text-xs space-y-2 list-disc pl-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <li>
                  <strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Prefix Isolation:</strong> The library's components use unique prefixes (<code className="font-mono">&lt;lumina-button&gt;</code>, <code className="font-mono">&lt;ui-button&gt;</code>), so Bootstrap's <code className="font-mono">.btn</code> classes never collide.
                </li>
                <li>
                  <strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Custom Class Override via [class]:</strong> Because components use host bindings with <code className="font-mono">cn()</code>, any consumer can pass custom classes seamlessly.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 5: THEME & TOKEN ARCHITECTURE */}
        {activeSection === 'tokens' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>5. Theme & Design Token Architecture</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>HSL / OKLCH CSS Custom Properties</p>
              </div>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              All components consume tokens from a single stylesheet. Swapping a brand theme requires changing only core CSS variables:
            </p>

            <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto leading-relaxed">
{`/* Light Theme Tokens */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}

/* Dark Theme Tokens */
.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --card: 240 10% 3.9%;
  --card-foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  --primary-foreground: 240 5.9% 10%;
  --secondary: 240 3.7% 15.9%;
  --secondary-foreground: 0 0% 98%;
  --border: 240 3.7% 15.9%;
  --input: 240 3.7% 15.9%;
  --ring: 240 4.9% 83.9%;
}`}
            </pre>
          </div>
        )}

        {/* SECTION 6: HEADLESS PRIMITIVES */}
        {activeSection === 'headless' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>6. Headless Primitives & Angular CDK</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Separating State and Behavior from Visual Representation</p>
              </div>
            </div>

            <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-zinc-800' : 'border-zinc-200 shadow-xs'}`}>
              <table className="w-full text-left text-xs">
                <thead className={`uppercase tracking-wider font-semibold border-b ${
                  isDark ? 'bg-zinc-900/80 text-zinc-400 border-zinc-800' : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                }`}>
                  <tr>
                    <th className="py-2.5 px-3">UI Component</th>
                    <th className="py-2.5 px-3">Angular CDK Module</th>
                    <th className="py-2.5 px-3">Headless Responsibilities</th>
                  </tr>
                </thead>
                <tbody className={`divide-y font-mono ${
                  isDark ? 'divide-zinc-800 bg-zinc-950/40 text-zinc-300' : 'divide-zinc-200 bg-white text-zinc-700'
                }`}>
                  <tr>
                    <td className={`py-2.5 px-3 font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Dialog / Modal</td>
                    <td className="py-2.5 px-3 text-indigo-500">@angular/cdk/overlay, @angular/cdk/a11y</td>
                    <td className="py-2.5 px-3 font-sans opacity-80">Portal rendering, backdrop click, Escape key, FocusTrap</td>
                  </tr>
                  <tr>
                    <td className={`py-2.5 px-3 font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Sheet & Popover</td>
                    <td className="py-2.5 px-3 text-indigo-500">@angular/cdk/overlay</td>
                    <td className="py-2.5 px-3 font-sans opacity-80">Slide panels, edge anchoring, auto-repositioning</td>
                  </tr>
                  <tr>
                    <td className={`py-2.5 px-3 font-semibold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>Tabs & Menu</td>
                    <td className="py-2.5 px-3 text-indigo-500">@angular/cdk/a11y</td>
                    <td className="py-2.5 px-3 font-sans opacity-80">Arrow-key roving focus, Home/End navigation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 7: COMPONENT COVERAGE MATRIX */}
        {activeSection === 'coverage' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Boxes className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>7. Complete Component Coverage Matrix</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Full Parity with shadcn/ui for Angular</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className="font-bold text-indigo-500 mb-2">Form &amp; Inputs</h4>
                <ul className={`space-y-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <li>&bull; Button &amp; ButtonGroup</li>
                  <li>&bull; Input &amp; Textarea</li>
                  <li>&bull; Label</li>
                  <li>&bull; Checkbox &amp; Switch</li>
                  <li>&bull; Slider</li>
                  <li>&bull; Select &amp; Combobox</li>
                </ul>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className="font-bold text-amber-500 mb-2">Feedback &amp; Overlays</h4>
                <ul className={`space-y-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <li>&bull; Dialog (Modal)</li>
                  <li>&bull; Alert Dialog</li>
                  <li>&bull; Sheet (Slide Drawer)</li>
                  <li>&bull; Toast (Sonner service)</li>
                  <li>&bull; Popover &amp; Tooltip</li>
                </ul>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <h4 className="font-bold text-emerald-500 mb-2">Layout &amp; Navigation</h4>
                <ul className={`space-y-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <li>&bull; Card (Header, Content, Footer)</li>
                  <li>&bull; Tabs</li>
                  <li>&bull; Accordion</li>
                  <li>&bull; Badge &amp; Avatar</li>
                  <li>&bull; Separator &amp; Skeleton</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: BUILD & PACKAGING */}
        {activeSection === 'packaging' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>8. Build & Packaging Strategy</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>APF (Angular Package Format) and npm/pnpm/bun Support</p>
              </div>
            </div>

            <ul className={`text-xs space-y-2 list-disc pl-5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Secondary Entry Points:</strong> Subpath imports allow optimal tree-shaking (<code className="font-mono">@lumina-ui/angular/button</code>).</li>
              <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Single NPM Publication:</strong> Compatible with <code className="font-mono">npm install</code>, <code className="font-mono">pnpm add</code>, and <code className="font-mono">bun add</code>.</li>
              <li><strong className={isDark ? 'text-zinc-200' : 'text-zinc-900'}>Cryptographic Provenance:</strong> Secure, verified publishing via GitHub Actions.</li>
            </ul>
          </div>
        )}

        {/* SECTION 9: DOCS */}
        {activeSection === 'docs' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border ${
                isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
              }`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className={`text-xl font-bold ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>9. Documentation & Showcase Plan</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Interactive playground and copyable snippets</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-xl border flex items-start gap-2 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className={isDark ? 'text-zinc-100' : 'text-zinc-900'}>Live Interactive Demo</strong>
                  <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Manipulate props, test variants, toggle states in real time.</p>
                </div>
              </div>

              <div className={`p-3 rounded-xl border flex items-start gap-2 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className={isDark ? 'text-zinc-100' : 'text-zinc-900'}>Production Angular Signals Code</strong>
                  <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>Pure Signal Standalone code ready to copy into your app.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
