/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Package, 
  Terminal, 
  Key, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  GitBranch,
  Github
} from 'lucide-react';

export default function PublishingWizard() {
  const [packageName, setPackageName] = useState('@your-name/shadcn-angular');
  const [version, setVersion] = useState('1.0.0');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

  const copyCode = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const cleanLibName = packageName.includes('/') ? packageName.split('/')[1] : packageName;

  const steps = [
    { num: 1, title: 'npm Account & Token', desc: 'Create a free account on npmjs.com and generate an access token' },
    { num: 2, title: 'Verify package.json', desc: 'Set your package name, version, and public access configuration' },
    { num: 3, title: 'Dry Run (npm pack)', desc: 'Test creating the tarball locally without publishing' },
    { num: 4, title: 'Publish Command', desc: 'Execute npm publish with public access' },
    { num: 5, title: 'Automate via GitHub Actions', desc: 'Automate future releases on Git tag pushes' },
  ];

  const publishCmd = `# 1. Log in to your npm account in your terminal
npm login

# 2. Build the production library bundle (Angular Package Format)
ng build ui --configuration=production

# 3. Navigate into the compiled distribution folder
cd dist/ui

# 4. Publish to the public npm registry!
npm publish --access public`;

  const githubActionCode = `name: Publish to NPM

on:
  release:
    types: [published]
  workflow_dispatch:

permissions:
  contents: read
  id-token: write # Required for npm cryptographic provenance

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          registry-url: 'https://registry.npmjs.org'

      - name: Install pnpm / bun
        uses: pnpm/action-setup@v3
        with:
          version: 9

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Build Angular Library (APF)
        run: pnpm ng build ui --configuration=production

      - name: Publish to NPM with Provenance
        run: |
          cd dist/ui
          npm publish --access public --provenance
        env:
          NODE_AUTH_TOKEN: \${{ secrets.NPM_TOKEN }}`;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Important Notice */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex-shrink-0">
            <Key className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-zinc-100">Why You Must Run the Final Publish Command</h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Publishing to the public <strong>npm registry</strong> (<code className="text-zinc-300">npmjs.com</code>) requires an <strong>authenticated npm account and secret token</strong> belonging to you. For security and trust reasons, AI cannot publish directly to your personal npm account without your credentials. 
              However, <strong>everything is built and prepared</strong> for you to publish in under 2 minutes!
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish once to npm &rarr; Instantly installable in bun, pnpm, and npm!</span>
          </div>
          <a
            href="https://www.npmjs.com/signup"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 hover:text-white flex items-center gap-1 font-semibold underline underline-offset-4"
          >
            <span>Create Free npm Account</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Package Configuration Bar */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="text-sm font-bold text-zinc-100 mb-4 flex items-center gap-2">
          <Package className="w-4 h-4 text-zinc-400" />
          <span>Configure Your Package Name</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              NPM Package Name (Replace "your-name" with your npm username)
            </label>
            <input
              type="text"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-500"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
              Initial Version
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs font-mono text-zinc-100 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>
      </div>

      {/* Step by Step Guide */}
      <div className="space-y-6">
        {/* Step 1: Login */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center">1</span>
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Log in to npm in your Terminal</h4>
                <p className="text-xs text-zinc-400">If you do not have an npm account, run <code className="text-zinc-300">npm adduser</code></p>
              </div>
            </div>
            <button
              onClick={() => copyCode('npm login', 'step1')}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800"
            >
              {copiedKey === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
          <pre className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-200">
            $ npm login
          </pre>
        </div>

        {/* Step 2: Build & Publish */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center">2</span>
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Build &amp; Publish with Public Access</h4>
                <p className="text-xs text-zinc-400">Runs ng-packagr and uploads the APF distribution to npmjs.org</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(publishCmd, 'publish-cmd')}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800"
            >
              {copiedKey === 'publish-cmd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Commands</span>
            </button>
          </div>
          <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto">
            {publishCmd}
          </pre>
        </div>

        {/* Step 3: Install Anywhere with npm, pnpm, bun */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center">3</span>
            <div>
              <h4 className="font-bold text-zinc-100 text-sm">Instantly Consumed Across All Package Managers</h4>
              <p className="text-xs text-zinc-400">Your users can now install it using whichever tool they prefer:</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-xs">
              <span className="text-zinc-500 font-bold block mb-1">PNPM</span>
              <code className="text-zinc-200">pnpm add {packageName}</code>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-xs">
              <span className="text-zinc-500 font-bold block mb-1">BUN</span>
              <code className="text-zinc-200">bun add {packageName}</code>
            </div>
            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 font-mono text-xs">
              <span className="text-zinc-500 font-bold block mb-1">NPM</span>
              <code className="text-zinc-200">npm i {packageName}</code>
            </div>
          </div>
        </div>

        {/* Step 4: GitHub Actions Workflow */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-950 font-bold text-xs flex items-center justify-center">4</span>
              <div>
                <h4 className="font-bold text-zinc-100 text-sm">Automate Releases (GitHub Actions)</h4>
                <p className="text-xs text-zinc-400">Add this file to .github/workflows/publish.yml for automated tag releases</p>
              </div>
            </div>
            <button
              onClick={() => copyCode(githubActionCode, 'gh-action')}
              className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 bg-zinc-950 px-2.5 py-1.5 rounded-lg border border-zinc-800"
            >
              {copiedKey === 'gh-action' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Workflow</span>
            </button>
          </div>
          <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto max-h-56">
            {githubActionCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
