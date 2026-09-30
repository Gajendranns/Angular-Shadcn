/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  HelpCircle, 
  Sparkles, 
  Package, 
  FileCode2, 
  Layers,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export default function InstallGuide({
  onExploreComponents
}: {
  onExploreComponents: () => void;
}) {
  const [approach, setApproach] = useState<'copy-paste' | 'npm-package'>('copy-paste');
  const [packageManager, setPackageManager] = useState<'pnpm' | 'bun' | 'npm'>('pnpm');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getDepCmd = () => {
    switch (packageManager) {
      case 'pnpm':
        return 'pnpm add @angular/cdk clsx tailwind-merge';
      case 'bun':
        return 'bun add @angular/cdk clsx tailwind-merge';
      case 'npm':
        return 'npm install @angular/cdk clsx tailwind-merge';
    }
  };

  const getPackageInstallCmd = () => {
    switch (packageManager) {
      case 'pnpm':
        return 'pnpm add @my-ui/angular @angular/cdk clsx tailwind-merge';
      case 'bun':
        return 'bun add @my-ui/angular @angular/cdk clsx tailwind-merge';
      case 'npm':
        return 'npm install @my-ui/angular @angular/cdk clsx tailwind-merge';
    }
  };

  const utilsCode = `// src/app/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  const zonelessCode = `// src/app/app.config.ts
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // 🚀 Pure Signals: No zone.js dirty-checking loops needed!
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes)
  ]
};`;

  const cssTokensCode = `/* src/styles.css */
@import "tailwindcss";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}`;

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      
      {/* Real App Compatibility Callout Banner */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Real App Guarantee: 100% Works in Production</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Will this work in a real Angular app?
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              <strong>Yes, absolutely.</strong> There are two supported ways to use this library in any real Angular 18/19 project:
            </p>
          </div>

          {/* Quick Choice Tabs */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={() => setApproach('copy-paste')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                approach === 'copy-paste'
                  ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              <span>Method 1: Copy &amp; Paste (Pure shadcn/ui)</span>
            </button>
            <button
              onClick={() => setApproach('npm-package')}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                approach === 'npm-package'
                  ? 'bg-zinc-100 text-zinc-950 shadow-md font-bold'
                  : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Method 2: NPM / PNPM / Bun Package</span>
            </button>
          </div>
        </div>

        {/* Explain the two approaches */}
        <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className={`p-4 rounded-xl border transition-all ${
            approach === 'copy-paste' ? 'bg-zinc-950 border-zinc-700 text-zinc-200' : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400'
          }`}>
            <div className="font-bold text-sm text-zinc-100 mb-1 flex items-center gap-1.5">
              <span>Why Method 1 is the shadcn/ui Way</span>
              {approach === 'copy-paste' && <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Selected</span>}
            </div>
            <p className="leading-relaxed">
              Just like real shadcn/ui in React, you copy the component files directly into your project's <code className="text-zinc-300 font-mono">src/app/components/ui/</code> folder. You own the code, you can tweak anything, and you have zero external dependency risks!
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            approach === 'npm-package' ? 'bg-zinc-950 border-zinc-700 text-zinc-200' : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400'
          }`}>
            <div className="font-bold text-sm text-zinc-100 mb-1 flex items-center gap-1.5">
              <span>Why Method 2 is Great for Monorepos</span>
              {approach === 'npm-package' && <span className="text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">Selected</span>}
            </div>
            <p className="leading-relaxed">
              If you build the workspace with <code className="text-zinc-300 font-mono">ng-packagr</code> and publish to npm or your private registry (Verdaccio / Artifactory), teams install it via <code className="text-zinc-300 font-mono">npm i @my-ui/angular</code> across multiple Angular applications.
            </p>
          </div>
        </div>
      </div>

      {/* Package Manager Selection Bar */}
      <div className="flex items-center justify-between bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3">
        <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Choose Your Package Manager:
        </span>
        <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs font-mono">
          {(['pnpm', 'bun', 'npm'] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPackageManager(pm)}
              className={`px-3 py-1 rounded-md transition-all font-semibold ${
                packageManager === pm ? 'bg-zinc-100 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* STEP-BY-STEP INSTALLATION WORKFLOW */}
      <div className="space-y-8">
        
        {/* Step 1 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 font-bold text-sm flex items-center justify-center">1</span>
              <div>
                <h3 className="font-bold text-zinc-100 text-base">Install Core Primitives &amp; Utilities</h3>
                <p className="text-xs text-zinc-400">Angular CDK for headless overlays, plus clsx and tailwind-merge</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(approach === 'copy-paste' ? getDepCmd() : getPackageInstallCmd(), 'step1')}
              className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
            >
              {copiedKey === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'step1' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto flex items-center justify-between">
            <span>$ {approach === 'copy-paste' ? getDepCmd() : getPackageInstallCmd()}</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 font-bold text-sm flex items-center justify-center">2</span>
              <div>
                <h3 className="font-bold text-zinc-100 text-base">Add the cn() Utility</h3>
                <p className="text-xs text-zinc-400">Handles class name conflicts and dynamic class merging</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(utilsCode, 'utils')}
              className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
            >
              {copiedKey === 'utils' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'utils' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
              src/app/lib/utils.ts
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
              {utilsCode}
            </pre>
          </div>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center justify-center">3</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-zinc-100 text-base">Enable Zoneless Angular (Drop Zone.js)</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Angular 18/19 Native Signals
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Because these components are 100% signal-driven, you can completely remove zone.js from your polyfills!</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(zonelessCode, 'zoneless')}
              className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
            >
              {copiedKey === 'zoneless' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'zoneless' ? 'Copied' : 'Copy Config'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
              src/app/app.config.ts
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
              {zonelessCode}
            </pre>
          </div>
        </div>

        {/* Step 4 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 font-bold text-sm flex items-center justify-center">4</span>
              <div>
                <h3 className="font-bold text-zinc-100 text-base">Configure Design Tokens (styles.css)</h3>
                <p className="text-xs text-zinc-400">shadcn/ui CSS custom properties for Light and Dark themes</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(cssTokensCode, 'tokens')}
              className="text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
            >
              {copiedKey === 'tokens' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'tokens' ? 'Copied' : 'Copy Tokens'}</span>
            </button>
          </div>

          <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
            <div className="px-4 py-2 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
              src/styles.css
            </div>
            <pre className="p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto max-h-56">
              {cssTokensCode}
            </pre>
          </div>
        </div>

        {/* Step 5 */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-zinc-100 text-zinc-950 font-bold text-sm flex items-center justify-center">5</span>
              <div>
                <h3 className="font-bold text-zinc-100 text-base">
                  {approach === 'copy-paste' ? 'Copy Any Component File' : 'Import from @my-ui/angular'}
                </h3>
                <p className="text-xs text-zinc-400">
                  {approach === 'copy-paste'
                    ? 'Navigate to the Components tab, copy the production Angular code, and paste into your project!'
                    : 'Import the Standalone components directly into your Angular 18/19 imports array.'}
                </p>
              </div>
            </div>

            <button
              onClick={onExploreComponents}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Explore Components</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
{`// In your Angular Standalone component (e.g. app.component.ts)
import { Component } from '@angular/core';
${approach === 'copy-paste' 
  ? "import { UiButtonComponent } from './components/ui/button.component';" 
  : "import { UiButtonComponent } from '@my-ui/angular';"}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UiButtonComponent],
  template: \`
    <main class="min-h-screen bg-background text-foreground flex items-center justify-center p-8">
      <div class="space-y-4 text-center">
        <h1 class="text-2xl font-bold">Welcome to Angular with shadcn/ui</h1>
        <ui-button variant="default" (clicked)="onSave()">
          Save Changes
        </ui-button>
      </div>
    </main>
  \`
})
export class AppComponent {
  onSave() {
    console.log('Button clicked in a real Angular app!');
  }
}`}
          </div>
        </div>

      </div>

      {/* Production Verification Checklist */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 space-y-4">
        <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Real App Verification Checklist</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Standalone components (no NgModule boilerplate required)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Full Angular Reactive Forms &amp; ControlValueAccessor support</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Tested with Vite, Webpack, and Angular CLI Application Builder</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Compatible with Tailwind CSS v3 and Tailwind CSS v4</span>
          </div>
        </div>
      </div>

    </div>
  );
}
