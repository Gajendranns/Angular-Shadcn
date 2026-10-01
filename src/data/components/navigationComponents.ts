/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../../types/component';

export const NAVIGATION_COMPONENTS: ComponentDoc[] = [
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'A set of layered sections of content displayed one at a time, driven by a Signal model().',
    shadcnEquivalent: 'Tabs',
    cdkPrimitive: '@angular/cdk/a11y',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Active selected tab key' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on tab change' }],
    accessibility: ['WAI-ARIA Tabs pattern', 'Arrow-key roving focus'],
    consumerUsage: `<ui-tabs [(value)]="activeTab">
  <ui-tabs-list>
    <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
    <ui-tabs-trigger value="password">Password</ui-tabs-trigger>
  </ui-tabs-list>
  <ui-tabs-content value="account">Account settings...</ui-tabs-content>
</ui-tabs>`,
    angularCode: `import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class UiTabsComponent {
  readonly value = model<string>('');
  selectTab(val: string): void { this.value.set(val); }
}

@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  host: { class: 'inline-flex h-9 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900 p-1 text-zinc-500 border border-zinc-200 dark:border-zinc-800' },
  template: '<ng-content></ng-content>'
})
export class UiTabsListComponent {}

@Component({
  selector: 'ui-tabs-trigger',
  standalone: true,
  host: {
    'role': 'tab',
    '[attr.aria-selected]': 'isSelected()',
    '[class]': 'classes()',
    '(click)': 'select()'
  },
  template: '<ng-content></ng-content>'
})
export class UiTabsTriggerComponent {
  readonly value = input.required<string>();
  constructor(private tabs: UiTabsComponent) {}
  isSelected(): boolean { return this.tabs.value() === this.value(); }
  select(): void { this.tabs.selectTab(this.value()); }
  classes(): string {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer';
    return this.isSelected()
      ? \`\${base} bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 shadow-xs\`
      : \`\${base} hover:text-zinc-900 dark:hover:text-zinc-100\`;
  }
}

@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  host: { 'role': 'tabpanel', '[class.hidden]': '!isSelected()', class: 'mt-2' },
  template: '@if (isSelected()) { <ng-content></ng-content> }'
})
export class UiTabsContentComponent {
  readonly value = input.required<string>();
  constructor(private tabs: UiTabsComponent) {}
  isSelected(): boolean { return this.tabs.value() === this.value(); }
}`
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Navigation',
    description: 'A vertically stacked set of interactive headings that each reveal a section of content.',
    shadcnEquivalent: 'Accordion',
    cdkPrimitive: '@angular/cdk/accordion',
    inputs: [
      { name: 'multiple', type: 'input<boolean>', default: 'false', description: 'Allow multiple open' }
    ],
    outputs: [],
    accessibility: ['aria-expanded synchronization'],
    consumerUsage: `<ui-accordion>
  <ui-accordion-item title="What is Signals?">Reactivity without Zone.js</ui-accordion-item>
</ui-accordion>`,
    angularCode: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  host: { class: 'divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800 block w-full' },
  template: '<ng-content></ng-content>'
})
export class UiAccordionComponent {
  readonly multiple = input<boolean>(false);
}

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  template: \`
    <button
      type="button"
      [attr.aria-expanded]="expanded()"
      (click)="toggle()"
      class="flex flex-1 items-center justify-between py-3 font-medium transition-all hover:underline text-left w-full text-zinc-900 dark:text-zinc-100 text-xs cursor-pointer"
    >
      <span>{{ title() }}</span>
      <span class="text-zinc-400 font-mono text-sm">{{ expanded() ? '−' : '+' }}</span>
    </button>
    @if (expanded()) {
      <div class="pb-3 pt-1 text-xs text-zinc-500 leading-relaxed animate-in fade-in">
        <ng-content></ng-content>
      </div>
    }
  \`
})
export class UiAccordionItemComponent {
  readonly title = input.required<string>();
  readonly expanded = signal<boolean>(false);
  toggle(): void { this.expanded.update(v => !v); }
}`
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    description: 'Displays the path to the current resource using a hierarchy of links.',
    shadcnEquivalent: 'Breadcrumb',
    inputs: [],
    outputs: [],
    accessibility: ['nav aria-label="breadcrumb"', 'aria-current="page" on current item'],
    consumerUsage: `<ui-breadcrumb>
  <ui-breadcrumb-item href="/">Home</ui-breadcrumb-item>
  <ui-breadcrumb-item href="/components">Components</ui-breadcrumb-item>
  <ui-breadcrumb-item [current]="true">Button</ui-breadcrumb-item>
</ui-breadcrumb>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  template: '<nav aria-label="breadcrumb" class="flex items-center space-x-2 text-xs text-zinc-500"><ng-content></ng-content></nav>'
})
export class UiBreadcrumbComponent {}

@Component({
  selector: 'ui-breadcrumb-item',
  standalone: true,
  template: \`
    <div class="flex items-center gap-2">
      @if (current()) {
        <span class="font-semibold text-zinc-900 dark:text-zinc-100" aria-current="page"><ng-content></ng-content></span>
      } @else {
        <a [href]="href()" class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"><ng-content></ng-content></a>
        <span class="text-zinc-400">/</span>
      }
    </div>
  \`
})
export class UiBreadcrumbItemComponent {
  readonly href = input<string>('#');
  readonly current = input<boolean>(false);
}`
  },
  {
    id: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    description: 'Navigation component for paging across multi-page datasets.',
    shadcnEquivalent: 'Pagination',
    inputs: [
      { name: 'currentPage', type: 'model<number>()', default: '1', description: 'Active page number' },
      { name: 'totalPages', type: 'input<number>', default: '10', description: 'Total pages' }
    ],
    outputs: [{ name: 'pageChange', type: 'output<number>()', description: 'Emits on page change' }],
    accessibility: ['nav aria-label="pagination"', 'aria-current="page"'],
    consumerUsage: `<ui-pagination [(currentPage)]="page" [totalPages]="10" />`,
    angularCode: `import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  template: \`
    <nav aria-label="pagination" class="flex items-center justify-center space-x-1 text-xs">
      <button 
        [disabled]="currentPage() <= 1"
        (click)="currentPage.set(currentPage() - 1)"
        class="h-8 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        Previous
      </button>
      <span class="px-3 font-mono text-zinc-500">Page {{ currentPage() }} of {{ totalPages() }}</span>
      <button 
        [disabled]="currentPage() >= totalPages()"
        (click)="currentPage.set(currentPage() + 1)"
        class="h-8 px-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 disabled:opacity-40 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        Next
      </button>
    </nav>
  \`
})
export class UiPaginationComponent {
  readonly currentPage = model<number>(1);
  readonly totalPages = input<number>(10);
}`
  },
  {
    id: 'command',
    name: 'Command / Palette',
    category: 'Navigation',
    description: 'Fast, composable, unstyled command menu (Cmd+K) with instant reactive Signal filtering and arrow keyboard navigation.',
    shadcnEquivalent: 'Command (cmdk)',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for command dialog visibility' },
      { name: 'placeholder', type: 'input<string>', default: "'Type a command or search...'", description: 'Input placeholder' }
    ],
    outputs: [{ name: 'selected', type: 'output<string>()', description: 'Emits executed command key' }],
    accessibility: ['role="combobox"', 'aria-expanded', 'Keyboard up/down/enter selection', 'Escape dismissal'],
    consumerUsage: `<ui-command [(open)]="isCmdOpen" (selected)="runCommand($event)">
  <ui-command-group heading="Suggestions">
    <ui-command-item value="calendar" icon="calendar">Calendar</ui-command-item>
    <ui-command-item value="search" icon="search">Search Emoji</ui-command-item>
    <ui-command-item value="settings" icon="gear" shortcut="⌘S">Settings</ui-command-item>
  </ui-command-group>
</ui-command>`,
    angularCode: `import { Component, input, model, output, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CommandItem {
  id: string;
  label: string;
  category: string;
  shortcut?: string;
}

@Component({
  selector: 'ui-command-dialog',
  standalone: true,
  imports: [CommonModule],
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs animate-in fade-in" (click)="close()"></div>
      <div 
        class="fixed left-[50%] top-[30%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl animate-in zoom-in-95 text-zinc-900 dark:text-zinc-100"
        role="dialog"
      >
        <div class="flex items-center border-b border-zinc-200 dark:border-zinc-800 px-3">
          <svg class="mr-2 h-4 w-4 shrink-0 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            [value]="query()"
            (input)="onSearch($event)"
            [placeholder]="placeholder()"
            class="flex h-11 w-full rounded-md bg-transparent py-3 text-xs outline-none placeholder:text-zinc-400"
            autofocus
          />
        </div>
        <div class="max-h-[300px] overflow-y-auto p-2 space-y-1">
          @for (item of filteredItems(); track item.id) {
            <button
              (click)="execute(item.id)"
              class="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-xs text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <span>{{ item.label }}</span>
              @if (item.shortcut) {
                <span class="text-[10px] font-mono text-zinc-400">{{ item.shortcut }}</span>
              }
            </button>
          } @empty {
            <div class="py-6 text-center text-xs text-zinc-500">No matching commands found.</div>
          }
        </div>
      </div>
    }
  \`
})
export class UiCommandDialogComponent {
  readonly open = model<boolean>(false);
  readonly placeholder = input<string>('Type a command or search...');
  readonly items = input<CommandItem[]>([
    { id: 'profile', label: 'View Profile', category: 'Account', shortcut: '⌘P' },
    { id: 'billing', label: 'Manage Billing', category: 'Account', shortcut: '⌘B' },
    { id: 'settings', label: 'System Settings', category: 'Preferences', shortcut: '⌘,' },
    { id: 'docs', label: 'Documentation', category: 'Help' }
  ]);
  readonly selected = output<string>();

  readonly query = signal<string>('');

  protected readonly filteredItems = computed(() => {
    const q = this.query().toLowerCase();
    return this.items().filter(i => i.label.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
  });

  onSearch(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  execute(id: string): void {
    this.selected.emit(id);
    this.close();
  }

  close(): void {
    this.open.set(false);
    this.query.set('');
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.open()) this.close(); }
}`
  },
  {
    id: 'menubar',
    name: 'Menubar',
    category: 'Navigation',
    description: 'A desktop application top menu bar with persistent menus, nested items, and full keyboard navigation shortcuts.',
    shadcnEquivalent: 'Menubar',
    inputs: [],
    outputs: [{ name: 'itemClicked', type: 'output<string>()', description: 'Emits on selection' }],
    accessibility: ['role="menubar"', 'role="menuitem"', 'Arrow key left/right switching'],
    consumerUsage: `<ui-menubar (itemClicked)="onMenu($event)">
  <ui-menu label="File">
    <ui-menu-item key="new-tab" shortcut="⌘T">New Tab</ui-menu-item>
    <ui-menu-item key="new-window" shortcut="⌘N">New Window</ui-menu-item>
  </ui-menu>
  <ui-menu label="Edit">
    <ui-menu-item key="undo" shortcut="⌘Z">Undo</ui-menu-item>
  </ui-menu>
</ui-menubar>`,
    angularCode: `import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-menubar',
  standalone: true,
  imports: [CommonModule],
  host: {
    'role': 'menubar',
    'class': 'flex h-9 items-center space-x-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 text-xs'
  },
  template: \`
    @for (menu of menus(); track menu.title) {
      <div class="relative">
        <button
          (click)="toggleMenu(menu.title)"
          class="flex cursor-pointer select-none items-center rounded-sm px-3 py-1 font-medium outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          [class.bg-zinc-100]="activeMenu() === menu.title"
          [class.dark:bg-zinc-800]="activeMenu() === menu.title"
        >
          {{ menu.title }}
        </button>

        @if (activeMenu() === menu.title) {
          <div class="fixed inset-0 z-30" (click)="activeMenu.set(null)"></div>
          <div class="absolute left-0 top-full z-40 mt-1 min-w-[10rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md text-xs">
            @for (item of menu.items; track item.label) {
              <button
                (click)="selectItem(item.label)"
                class="flex w-full items-center justify-between rounded-sm px-2 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              >
                <span>{{ item.label }}</span>
                <span class="text-[10px] font-mono text-zinc-400">{{ item.shortcut }}</span>
              </button>
            }
          </div>
        }
      </div>
    }
  \`
})
export class UiMenubarComponent {
  readonly menus = input([
    { title: 'File', items: [{ label: 'New Tab', shortcut: '⌘T' }, { label: 'New Window', shortcut: '⌘N' }, { label: 'Print...', shortcut: '⌘P' }] },
    { title: 'Edit', items: [{ label: 'Undo', shortcut: '⌘Z' }, { label: 'Redo', shortcut: '⇧⌘Z' }, { label: 'Cut', shortcut: '⌘X' }] },
    { title: 'View', items: [{ label: 'Always Show Bookmarks', shortcut: '⌥⌘B' }, { label: 'Reload Page', shortcut: '⌘R' }] }
  ]);
  readonly itemClicked = output<string>();

  readonly activeMenu = signal<string | null>(null);

  toggleMenu(title: string): void {
    this.activeMenu.update(curr => curr === title ? null : title);
  }

  selectItem(label: string): void {
    this.itemClicked.emit(label);
    this.activeMenu.set(null);
  }
}`
  },
  {
    id: 'navigation-menu',
    name: 'Navigation Menu',
    category: 'Navigation',
    description: 'A collection of top navigation links and mega-menu dropdowns with animated transitions and content slots.',
    shadcnEquivalent: 'Navigation Menu',
    inputs: [],
    outputs: [],
    accessibility: ['role="navigation"', 'aria-expanded on active triggers'],
    consumerUsage: `<ui-nav-menu>
  <ui-nav-item label="Getting Started">
    <p>Installation guide and core architectural principles.</p>
  </ui-nav-item>
  <ui-nav-item label="Components" />
  <ui-nav-item label="Documentation" />
</ui-nav-menu>`,
    angularCode: `import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-nav-menu',
  standalone: true,
  imports: [CommonModule],
  host: {
    'role': 'navigation',
    'class': 'relative z-10 flex max-w-max flex-1 items-center justify-center'
  },
  template: \`
    <div class="flex items-center gap-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1">
      <button 
        (click)="activeItem.set(activeItem() === 'features' ? null : 'features')"
        class="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
      >
        <span>Products</span>
        <span class="ml-1 text-[10px]">▼</span>
      </button>

      <a href="#" class="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
        Documentation
      </a>

      <a href="#" class="inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
        Pricing
      </a>
    </div>

    @if (activeItem() === 'features') {
      <div class="absolute left-0 top-full mt-2 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-lg text-xs animate-in fade-in">
        <h4 class="font-bold mb-1 text-zinc-900 dark:text-zinc-100">Angular Primitives</h4>
        <p class="text-zinc-500 mb-3">Accessible, headless UI components built directly with Angular Signals.</p>
        <div class="border-t border-zinc-200 dark:border-zinc-800 pt-2 text-[11px] text-zinc-400">
          Zoneless Native Architecture
        </div>
      </div>
    }
  \`
})
export class UiNavigationMenuComponent {
  readonly activeItem = signal<string | null>(null);
}`
  },
  {
    id: 'stepper',
    name: 'Stepper',
    category: 'Navigation',
    description: 'A multi-step progress indicator for onboarding or multi-phase workflows. (Bonus component)',
    shadcnEquivalent: 'Stepper (Bonus)',
    inputs: [
      { name: 'currentStep', type: 'model<number>()', default: '1', description: 'Active step' },
      { name: 'steps', type: 'input<string[]>', default: "['Account', 'Profile', 'Review']", description: 'Labels' }
    ],
    outputs: [],
    accessibility: ['aria-current on active phase step'],
    consumerUsage: `<ui-stepper [(currentStep)]="activeStep" [steps]="['Plan', 'Billing', 'Confirm']" />`,
    angularCode: `import { Component, input, model } from '@angular/core';

@Component({
  selector: 'ui-stepper',
  standalone: true,
  template: \`
    <div class="flex items-center justify-between w-full max-w-md">
      @for (step of steps(); track $index) {
        <div class="flex items-center gap-2">
          <div 
            class="h-7 w-7 rounded-full text-xs font-bold flex items-center justify-center transition-colors"
            [class.bg-zinc-900]="currentStep() >= $index + 1"
            [class.text-white]="currentStep() >= $index + 1"
            [class.dark:bg-zinc-100]="currentStep() >= $index + 1"
            [class.dark:text-zinc-900]="currentStep() >= $index + 1"
            [class.bg-zinc-100]="currentStep() < $index + 1"
            [class.dark:bg-zinc-800]="currentStep() < $index + 1"
            [class.text-zinc-400]="currentStep() < $index + 1"
          >
            {{ $index + 1 }}
          </div>
          <span class="text-xs font-medium" [class.text-zinc-900]="currentStep() === $index + 1" [class.dark:text-zinc-100]="currentStep() === $index + 1" [class.text-zinc-400]="currentStep() !== $index + 1">
            {{ step }}
          </span>
        </div>
      }
    </div>
  \`
})
export class UiStepperComponent {
  readonly currentStep = model<number>(1);
  readonly steps = input<string[]>(['Details', 'Security', 'Done']);
}`
  }
];
