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

export default function ArchitectureDoc() {
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
        <div className="sticky top-24 bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
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
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
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

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 px-2 leading-relaxed">
            Designed specifically for Angular 18/19 Signals, Standalone Components, and the Angular Package Format (APF).
          </div>
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        
        {/* SECTION 1: OVERALL ARCHITECTURE */}
        {activeSection === 'overall' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">1. Overall Architecture</h2>
                <p className="text-xs text-slate-400">Philosophy, Composability, and Angular Primitives</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike React's JSX model, Angular components excel through <strong>content projection (<code className="text-indigo-300 font-mono">&lt;ng-content&gt;</code>)</strong>, 
              <strong>directives as behaviors</strong>, <strong>HostBindings</strong>, and <strong>Angular CDK primitives</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1 text-indigo-300">1. Two-Layer Architecture</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  <strong>Primitives Layer:</strong> Headless state, keyboard navigation, overlay management, and accessibility (CDK-backed).<br/>
                  <strong>Styled Layer:</strong> Tailored with Tailwind utility classes consuming CSS custom variables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1 text-emerald-300">2. Pure Signals (100% Zoneless)</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  No Zone.js overhead or legacy OnPush checks. Components use Angular 18/19 <code className="text-slate-200 font-mono">input()</code>, <code className="text-slate-200 font-mono">output()</code>, <code className="text-slate-200 font-mono">model()</code>, and <code className="text-slate-200 font-mono">computed()</code> for direct reactive graph notifications without dirty-checking loops.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1 text-amber-300">3. Full Forms Integration</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every form component (Input, Select, Switch, Checkbox, Slider) implements Angular's <code className="text-slate-200 font-mono">ControlValueAccessor</code>, natively supporting both <code className="text-slate-200 font-mono">[formControl]</code> and <code className="text-slate-200 font-mono">[(ngModel)]</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="font-semibold text-white text-sm mb-1 text-cyan-300">4. Class Variance Authority in Angular</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  A lightweight <code className="text-slate-200 font-mono">cn()</code> helper (<code className="text-slate-200 font-mono">clsx</code> + <code className="text-slate-200 font-mono">tailwind-merge</code>) dynamically resolves conflicting Tailwind classes passed into host elements.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: ANGULAR VERSION & DEPS */}
        {activeSection === 'deps' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">2. Angular Version & Dependencies</h2>
                <p className="text-xs text-slate-400">Targeting Modern Angular with Minimal Dependency Footprint</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              <div className="text-slate-400 font-semibold mb-2">// projects/ui/package.json</div>
              <pre className="text-indigo-200 leading-relaxed whitespace-pre-wrap">
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

            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Why this dependency strategy?</strong></p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li><strong className="text-slate-200">Zero fat:</strong> We do NOT bundle large icon libraries or unnecessary runtime state engines.</li>
                <li><strong className="text-slate-200">@angular/cdk:</strong> Provides battle-tested overlays, focus trapping, a11y live announcer, portals, and drag-drop primitives maintained directly by the Google Angular team.</li>
                <li><strong className="text-slate-200">tailwind-merge:</strong> Guarantees that consumer classes (e.g. <code className="text-indigo-300">p-8</code>) safely overwrite default component classes (<code className="text-indigo-300">p-4</code>) without CSS specificity wars.</li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 3: FOLDER STRUCTURE */}
        {activeSection === 'folder' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <FolderTree className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">3. Monorepo & Folder Structure</h2>
                <p className="text-xs text-slate-400">Clean Sub-path Entry Points for Zero Bundle Bloat</p>
              </div>
            </div>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`my-ui-workspace/
├── projects/
│   └── ui/                               # The publishable UI library
│       ├── ng-package.json               # Root ng-packagr configuration
│       ├── package.json                  # peerDependencies, keywords, license
│       ├── src/
│       │   ├── lib/
│       │   │   ├── button/
│       │   │   │   ├── button.component.ts
│       │   │   │   ├── button.variants.ts
│       │   │   │   ├── ng-package.json   # Secondary entry point! (@my-ui/button)
│       │   │   │   └── index.ts
│       │   │   ├── dialog/
│       │   │   │   ├── dialog.component.ts
│       │   │   │   ├── dialog.service.ts
│       │   │   │   ├── ng-package.json   # Secondary entry point! (@my-ui/dialog)
│       │   │   │   └── index.ts
│       │   │   ├── input/
│       │   │   ├── select/
│       │   │   ├── tabs/
│       │   │   ├── toast/
│       │   │   └── core/
│       │   │       ├── utils/cn.ts       # clsx + twMerge utility
│       │   │       ├── tokens/theme.ts
│       │   │       └── cdk/              # Reusable CDK wrappers
│       │   ├── styles/
│       │   │   ├── tokens.css            # CSS variables for :root & .dark
│       │   │   └── tailwind-preset.js    # Optional Tailwind theme preset
│       │   └── public-api.ts             # Primary root barrel export
├── apps/
│   └── docs/                             # Interactive Documentation & Sandbox
│       ├── src/app/
│       │   ├── pages/components/
│       │   ├── pages/theming/
│       │   └── pages/getting-started/
├── angular.json
├── package.json
└── tsconfig.json`}
            </pre>
          </div>
        )}

        {/* SECTION 4: STYLING STRATEGY & BOOTSTRAP FIT */}
        {activeSection === 'styling' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
                <Palette className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">4. Styling Strategy & Bootstrap Coexistence</h2>
                <p className="text-xs text-slate-400">How Tailwind and Bootstrap coexist gracefully</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In enterprise Angular environments, many projects run Bootstrap or migrate from NG-Bootstrap. Our components use <strong>semantic CSS variables (<code className="text-indigo-300">--primary</code>, <code className="text-indigo-300">--border</code>, <code className="text-indigo-300">--radius</code>)</strong> mapped to Tailwind classes.
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">How to Avoid Bootstrap Class Collisions:</h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Prefix Isolation:</strong> The library's components use the <code className="text-indigo-300 font-mono">ui-*</code> selector prefix (<code className="text-indigo-300 font-mono">&lt;ui-button&gt;</code>, <code className="text-indigo-300 font-mono">&lt;ui-dialog&gt;</code>), so Bootstrap's <code className="text-slate-300 font-mono">.btn</code> or <code className="text-slate-300 font-mono">.modal</code> classes never conflict.
                </li>
                <li>
                  <strong className="text-white">CSS Variable Bridging:</strong> For teams with Bootstrap, a bridge stylesheet maps Bootstrap variables:
                  <pre className="mt-1 text-[11px] font-mono text-indigo-300 bg-slate-900 p-2 rounded">
{`:root {
  --primary: var(--bs-primary-rgb);
  --border: var(--bs-border-color-rgb);
  --radius: var(--bs-border-radius);
}`}
                  </pre>
                </li>
                <li>
                  <strong className="text-white">Custom Class Override via [class]:</strong> Because components use host bindings with <code className="text-indigo-300 font-mono">cn()</code>, any consumer can write <code className="text-slate-300 font-mono">&lt;ui-button class="btn btn-primary"&gt;</code> and it seamlessly adopts their styling!
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* SECTION 5: THEME & TOKEN ARCHITECTURE */}
        {activeSection === 'tokens' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">5. Theme & Design Token Architecture</h2>
                <p className="text-xs text-slate-400">HSL / OKLCH CSS Custom Properties</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              All components consume tokens from a single <code className="text-indigo-300 font-mono">tokens.css</code> file. Swapping a brand theme requires changing only 10 CSS variables:
            </p>

            <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto leading-relaxed">
{`/* Light Theme Tokens */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 243.4 75.4% 58.6%;        /* Indigo */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 243.4 75.4% 58.6%;
  --radius: 0.5rem;
}

/* Dark Theme Tokens */
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 243.4 75.4% 58.6%;
  --primary-foreground: 210 40% 98%;
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 243.4 75.4% 58.6%;
}`}
            </pre>
          </div>
        )}

        {/* SECTION 6: HEADLESS PRIMITIVES */}
        {activeSection === 'headless' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">6. Headless Primitives & Angular CDK</h2>
                <p className="text-xs text-slate-400">Separating State and Behavior from Visual Representation</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In shadcn/ui (React), Radix UI provides the headless primitives. In Angular, the equivalent foundation is 
              <strong> <code className="text-indigo-300">@angular/cdk</code></strong>. Here is how our architecture implements each:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">UI Component</th>
                    <th className="py-2.5 px-3">Angular CDK Module</th>
                    <th className="py-2.5 px-3">Headless Responsibilities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Dialog / Modal</td>
                    <td className="py-2.5 px-3 text-indigo-300">@angular/cdk/overlay, @angular/cdk/a11y</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Portal rendering, backdrop click, Escape key, FocusTrap</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Dropdown & Popover</td>
                    <td className="py-2.5 px-3 text-indigo-300">@angular/cdk/overlay (ConnectedPosition)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Viewport collision detection, auto-repositioning</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Tabs & Menu</td>
                    <td className="py-2.5 px-3 text-indigo-300">@angular/cdk/a11y (FocusKeyManager)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Arrow-key roving focus, Home/End navigation</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Accordion</td>
                    <td className="py-2.5 px-3 text-indigo-300">@angular/cdk/accordion</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">Single vs multiple expanded state coordination</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-white">Combobox / Command</td>
                    <td className="py-2.5 px-3 text-indigo-300">@angular/cdk/a11y (ActiveDescendantKeyManager)</td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">ARIA activedescendant listbox keyboard selection</td>
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
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Boxes className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">7. Complete Component Coverage Matrix</h2>
                <p className="text-xs text-slate-400">Full Parity with shadcn/ui for Angular</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-indigo-300 mb-2">Form & Inputs</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>&bull; Button &amp; ButtonGroup</li>
                  <li>&bull; Input &amp; Textarea</li>
                  <li>&bull; Label</li>
                  <li>&bull; Checkbox</li>
                  <li>&bull; Radio Group</li>
                  <li>&bull; Select (Native &amp; Custom)</li>
                  <li>&bull; Switch (Toggle)</li>
                  <li>&bull; Slider</li>
                  <li>&bull; Combobox &amp; Command</li>
                  <li>&bull; Date Picker &amp; Calendar</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-amber-300 mb-2">Feedback &amp; Overlays</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>&bull; Dialog (Modal)</li>
                  <li>&bull; Alert Dialog</li>
                  <li>&bull; Sheet (Slide-out Drawer)</li>
                  <li>&bull; Popover</li>
                  <li>&bull; Tooltip</li>
                  <li>&bull; Dropdown Menu</li>
                  <li>&bull; Context Menu</li>
                  <li>&bull; Toast (Sonner service)</li>
                  <li>&bull; Alert &amp; Callout</li>
                  <li>&bull; Hover Card</li>
                </ul>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <h4 className="font-bold text-emerald-300 mb-2">Layout &amp; Navigation</h4>
                <ul className="space-y-1 text-slate-400">
                  <li>&bull; Card (Header, Content, Footer)</li>
                  <li>&bull; Tabs</li>
                  <li>&bull; Accordion</li>
                  <li>&bull; Collapsible</li>
                  <li>&bull; Badge</li>
                  <li>&bull; Avatar</li>
                  <li>&bull; Breadcrumb &amp; Pagination</li>
                  <li>&bull; Progress &amp; Skeleton</li>
                  <li>&bull; Separator &amp; Scroll Area</li>
                  <li>&bull; Data Table &amp; Stepper</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 8: BUILD & PACKAGING */}
        {activeSection === 'packaging' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">8. Build & Packaging Strategy</h2>
                <p className="text-xs text-slate-400">APF (Angular Package Format) and npm/pnpm/bun Support</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              We leverage <strong>ng-packagr</strong> to compile the TypeScript sources into APF v18+:
            </p>

            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-5">
              <li><strong className="text-slate-200">Secondary Entry Points:</strong> Each component directory contains an <code className="text-indigo-300 font-mono">ng-package.json</code> file. This enables consumers to import <code className="text-indigo-300 font-mono">@my-ui/angular/button</code> directly.</li>
              <li><strong className="text-slate-200">Universal Package Manager Consumption:</strong> Published once to the npm registry; works smoothly with <code className="text-slate-200 font-mono">npm install</code>, <code className="text-slate-200 font-mono">pnpm add</code>, and <code className="text-slate-200 font-mono">bun add</code>.</li>
              <li><strong className="text-slate-200">Cryptographic Provenance:</strong> GitHub Actions workflow publishes with <code className="text-indigo-300 font-mono">--provenance</code> linking the package build to its GitHub commit.</li>
            </ul>
          </div>
        )}

        {/* SECTION 9: DOCS */}
        {activeSection === 'docs' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">9. Documentation & Showcase Plan</h2>
                <p className="text-xs text-slate-400">Interactive live playground, API reference, and copyable snippets</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Every component in our documentation includes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Live Interactive Demo</strong>
                  <p className="text-slate-400">Manipulate props, test variants, toggle states, and preview loading spinners.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Production TypeScript Code</strong>
                  <p className="text-slate-400">Full Standalone Angular code ready to copy into your library project.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">API Reference Matrix</strong>
                  <p className="text-slate-400">Every Input signal, Output emitter, and variant explicitly documented.</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Accessibility & Keyboard Rules</strong>
                  <p className="text-slate-400">ARIA specifications, focus management, and keyboard shortcuts.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
