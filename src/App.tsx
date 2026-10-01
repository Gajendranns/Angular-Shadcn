/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Boxes, 
  Layers, 
  Palette, 
  Terminal, 
  Sparkles, 
  Moon, 
  Sun, 
  Search, 
  CheckCircle2, 
  Code2, 
  ShieldCheck, 
  Package, 
  BookOpen, 
  ArrowRight,
  Zap
} from 'lucide-react';
import { COMPONENTS_DATA } from './data/componentsData';
import InstallGuide from './components/InstallGuide';
import ComponentViewer from './components/ComponentViewer';
import ThemeStudio from './components/ThemeStudio';
import ArchitectureDoc from './components/ArchitectureDoc';
import PublishingWizard from './components/PublishingWizard';

export default function App() {
  const [activeTab, setActiveTab] = useState<'install' | 'components' | 'theming' | 'architecture' | 'publish'>('install');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [brandName, setBrandName] = useState<'lumina' | 'zenith' | 'primitives' | 'vela' | 'radian'>('lumina');
  const [selectedCompId, setSelectedCompId] = useState<string>('button');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const isDark = themeMode === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const brandNames = {
    lumina: { display: 'Lumina UI', npm: '@lumina-ui/angular', prefix: 'lumina', tag: 'Illuminated & Accessible Signals' },
    zenith: { display: 'Zenith UI', npm: '@zenith-ui/angular', prefix: 'zenith', tag: 'Peak Modern Angular Primitives' },
    primitives: { display: 'NGX Primitives', npm: '@ngx-primitives/ui', prefix: 'ngx', tag: 'Pure Headless + Tailwind' },
    vela: { display: 'Vela UI', npm: '@vela-ui/angular', prefix: 'vela', tag: 'Minimalist & High-Performance' },
    radian: { display: 'Radian UI', npm: '@radian-ui/angular', prefix: 'rad', tag: 'Geometric & Angular-Native' },
  };

  const currentBrand = brandNames[brandName];

  const selectedComponent = COMPONENTS_DATA.find(c => c.id === selectedCompId) || COMPONENTS_DATA[0];

  const searchedComponents = COMPONENTS_DATA.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.shadcnEquivalent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${
      isDark ? 'dark bg-[#09090b] text-zinc-100' : 'bg-white text-zinc-900'
    } selection:bg-zinc-800 selection:text-zinc-100 transition-colors font-sans antialiased`}>
      
      {/* Top Navbar */}
      <header className={`border-b sticky top-0 z-50 backdrop-blur-md ${
        isDark ? 'border-zinc-800 bg-[#09090b]/80' : 'border-zinc-200 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-sm shadow-xs ${
              isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
            }`}>
              <Boxes className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-bold tracking-tight text-sm ${isDark ? 'text-zinc-100' : 'text-zinc-900'}`}>
                {currentBrand.display}
              </span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400' : 'border-zinc-200 bg-zinc-100 text-zinc-600'
              }`}>
                Angular 19
              </span>
            </div>
          </div>

          {/* Quick Brand Selector in Nav */}
          <div className={`hidden lg:flex items-center p-0.5 rounded-lg border text-[11px] ${
            isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}>
            <span className={`px-2 font-medium ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>Brand:</span>
            {(['lumina', 'zenith', 'primitives', 'vela', 'radian'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBrandName(b)}
                className={`px-2 py-0.5 rounded transition-all capitalize ${
                  brandName === b
                    ? isDark ? 'bg-zinc-100 text-zinc-950 font-bold shadow-xs' : 'bg-white text-zinc-950 font-bold shadow-xs'
                    : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Navigation Links in Header */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('install')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'install' 
                  ? isDark ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'bg-zinc-100 text-zinc-950 font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Installation
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'components' 
                  ? isDark ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'bg-zinc-100 text-zinc-950 font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Components
            </button>
            <button
              onClick={() => setActiveTab('theming')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'theming' 
                  ? isDark ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'bg-zinc-100 text-zinc-950 font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Themes
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'architecture' 
                  ? isDark ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'bg-zinc-100 text-zinc-950 font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveTab('publish')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'publish' 
                  ? isDark ? 'bg-zinc-800 text-zinc-100 font-semibold' : 'bg-zinc-100 text-zinc-950 font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-100' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              Publishing
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setThemeMode(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded-md border text-xs transition-all ${
                isDark 
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white' 
                  : 'bg-zinc-100 border-zinc-300 text-zinc-600 hover:text-zinc-900'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-zinc-300" /> : <Moon className="w-4 h-4 text-zinc-700" />}
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold shadow-xs transition-all ${
                isDark ? 'bg-zinc-100 text-zinc-950 hover:bg-white' : 'bg-zinc-900 text-white hover:bg-zinc-800'
              }`}
            >
              <span>Components</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`border-b py-12 px-4 sm:px-6 relative overflow-hidden transition-colors ${
        isDark 
          ? 'border-zinc-800/80 bg-gradient-to-b from-zinc-950 via-[#09090b] to-[#09090b]' 
          : 'border-zinc-200 bg-gradient-to-b from-zinc-50 via-white to-white'
      }`}>
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${
            isDark ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300' : 'border-zinc-200 bg-zinc-100 text-zinc-800'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>{currentBrand.tag} &bull; Native Angular 18/19</span>
          </div>

          <h1 className={`text-4xl sm:text-6xl font-black tracking-tight max-w-3xl mx-auto leading-[1.1] ${
            isDark ? 'text-zinc-100' : 'text-zinc-900'
          }`}>
            Build modern apps with{' '}
            <span className={`text-transparent bg-clip-text ${
              isDark 
                ? 'bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500' 
                : 'bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500'
            }`}>
              {currentBrand.display}
            </span>
          </h1>

          <p className={`text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            A copyright-safe, modern open-source UI component library designed specifically for Angular applications. Built on Angular CDK and styled with Tailwind CSS.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('install')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'install'
                  ? isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
                  : isDark ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>1. Installation Guide</span>
            </button>

            <button
              onClick={() => setActiveTab('components')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                activeTab === 'components'
                  ? isDark ? 'bg-zinc-100 text-zinc-950' : 'bg-zinc-900 text-white'
                  : isDark ? 'bg-zinc-900 border border-zinc-800 text-zinc-200 hover:bg-zinc-800' : 'bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>2. View All Components ({COMPONENTS_DATA.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Tab Bar Navigation */}
      <div className={`border-b transition-colors ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex space-x-6 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('install')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'install'
                ? isDark ? 'border-zinc-100 text-zinc-100 font-bold' : 'border-zinc-900 text-zinc-900 font-bold'
                : isDark ? 'border-transparent text-zinc-400 hover:text-zinc-200' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Installation &amp; Real App Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'components'
                ? isDark ? 'border-zinc-100 text-zinc-100 font-bold' : 'border-zinc-900 text-zinc-900 font-bold'
                : isDark ? 'border-transparent text-zinc-400 hover:text-zinc-200' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Components ({COMPONENTS_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('theming')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'theming'
                ? isDark ? 'border-zinc-100 text-zinc-100 font-bold' : 'border-zinc-900 text-zinc-900 font-bold'
                : isDark ? 'border-transparent text-zinc-400 hover:text-zinc-200' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Themes &amp; Tokens</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'architecture'
                ? isDark ? 'border-zinc-100 text-zinc-100 font-bold' : 'border-zinc-900 text-zinc-900 font-bold'
                : isDark ? 'border-transparent text-zinc-400 hover:text-zinc-200' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture Blueprint</span>
          </button>

          <button
            onClick={() => setActiveTab('publish')}
            className={`py-3.5 border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'publish'
                ? isDark ? 'border-zinc-100 text-zinc-100 font-bold' : 'border-zinc-900 text-zinc-900 font-bold'
                : isDark ? 'border-transparent text-zinc-400 hover:text-zinc-200' : 'border-transparent text-zinc-500 hover:text-zinc-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Publish to NPM/Bun/PNPM</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* TAB 1: INSTALLATION GUIDE FIRST */}
        {activeTab === 'install' && (
          <InstallGuide 
            themeMode={themeMode} 
            onExploreComponents={() => setActiveTab('components')} 
          />
        )}

        {/* TAB 2: COMPONENTS & CODE */}
        {activeTab === 'components' && (
          <ComponentViewer
            themeMode={themeMode}
            components={searchedComponents}
            selectedComponent={selectedComponent}
            onSelectComponent={(c) => setSelectedCompId(c.id)}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        )}

        {/* TAB 3: THEME STUDIO */}
        {activeTab === 'theming' && (
          <ThemeStudio themeMode={themeMode} setThemeMode={setThemeMode} />
        )}

        {/* TAB 4: ARCHITECTURE BLUEPRINT */}
        {activeTab === 'architecture' && (
          <ArchitectureDoc themeMode={themeMode} />
        )}

        {/* TAB 5: PUBLISHING WIZARD */}
        {activeTab === 'publish' && (
          <PublishingWizard themeMode={themeMode} />
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 text-xs transition-colors ${
        isDark ? 'border-zinc-800 bg-[#09090b] text-zinc-500' : 'border-zinc-200 bg-zinc-50 text-zinc-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isDark ? 'text-zinc-400' : 'text-zinc-800'}`}>{currentBrand.display}</span>
            <span>&bull;</span>
            <span>Angular Open Source UI Library</span>
          </div>
          <p>
            Standalone Signals &bull; Angular CDK &bull; Tailwind CSS &bull; Zoneless Native
          </p>
        </div>
      </footer>
    </div>
  );
}
