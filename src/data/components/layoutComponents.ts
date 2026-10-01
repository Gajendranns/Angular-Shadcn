/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../../types/component';

export const LAYOUT_COMPONENTS: ComponentDoc[] = [
  {
    id: 'card',
    name: 'Card',
    category: 'Layout & Structure',
    description: 'Displays a clean card container with header, content, and footer subcomponents.',
    shadcnEquivalent: 'Card',
    inputs: [],
    outputs: [],
    accessibility: ['Semantic structure with clear heading hierarchy'],
    consumerUsage: `<ui-card>
  <ui-card-header>
    <ui-card-title>Notification Preferences</ui-card-title>
    <ui-card-description>Configure your alert channels.</ui-card-description>
  </ui-card-header>
  <ui-card-content>Details...</ui-card-content>
</ui-card>`,
    angularCode: `import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  host: { class: 'rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-zinc-900 dark:text-zinc-100 shadow-xs block' },
  template: '<ng-content></ng-content>'
})
export class UiCardComponent {}

@Component({
  selector: 'ui-card-header',
  standalone: true,
  host: { class: 'flex flex-col space-y-1.5 p-6 block' },
  template: '<ng-content></ng-content>'
})
export class UiCardHeaderComponent {}

@Component({
  selector: 'ui-card-title',
  standalone: true,
  host: { class: 'font-semibold leading-none tracking-tight block text-base' },
  template: '<ng-content></ng-content>'
})
export class UiCardTitleComponent {}

@Component({
  selector: 'ui-card-description',
  standalone: true,
  host: { class: 'text-xs text-zinc-500 block' },
  template: '<ng-content></ng-content>'
})
export class UiCardDescriptionComponent {}

@Component({
  selector: 'ui-card-content',
  standalone: true,
  host: { class: 'p-6 pt-0 block' },
  template: '<ng-content></ng-content>'
})
export class UiCardContentComponent {}

@Component({
  selector: 'ui-card-footer',
  standalone: true,
  host: { class: 'flex items-center p-6 pt-0' },
  template: '<ng-content></ng-content>'
})
export class UiCardFooterComponent {}`
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'Layout & Structure',
    description: 'Visually or semantically separates content in a layout.',
    shadcnEquivalent: 'Separator',
    inputs: [
      { name: 'orientation', type: "input<'horizontal' | 'vertical'>", default: "'horizontal'", description: 'Divider axis' }
    ],
    outputs: [],
    accessibility: ['role="separator"'],
    consumerUsage: `<ui-separator orientation="horizontal" />`,
    angularCode: `import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'ui-separator',
  standalone: true,
  host: {
    'role': 'separator',
    '[attr.aria-orientation]': 'orientation()',
    '[class]': 'classes()'
  },
  template: ''
})
export class UiSeparatorComponent {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');

  protected readonly classes = computed(() => {
    return this.orientation() === 'horizontal'
      ? 'shrink-0 bg-zinc-200 dark:bg-zinc-800 h-[1px] w-full block'
      : 'shrink-0 bg-zinc-200 dark:bg-zinc-800 h-full w-[1px] block';
  });
}`
  },
  {
    id: 'aspect-ratio',
    name: 'Aspect Ratio',
    category: 'Layout & Structure',
    description: 'Displays content within a desired fixed aspect ratio (16:9, 4:3, 1:1).',
    shadcnEquivalent: 'Aspect Ratio',
    inputs: [
      { name: 'ratio', type: 'input<number>', default: '16/9', description: 'Aspect ratio formula' }
    ],
    outputs: [],
    accessibility: ['Responsive container preventing layout shifts'],
    consumerUsage: `<ui-aspect-ratio [ratio]="16/9">
  <img src="banner.jpg" class="object-cover w-full h-full rounded-md" />
</ui-aspect-ratio>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-aspect-ratio',
  standalone: true,
  template: \`
    <div class="relative w-full" [style.padding-bottom.%]="(1 / ratio()) * 100">
      <div class="absolute inset-0">
        <ng-content></ng-content>
      </div>
    </div>
  \`
})
export class UiAspectRatioComponent {
  readonly ratio = input<number>(16 / 9);
}`
  },
  {
    id: 'collapsible',
    name: 'Collapsible',
    category: 'Layout & Structure',
    description: 'An interactive component which expands and collapses a panel with a Signal model().',
    shadcnEquivalent: 'Collapsible',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for open' }
    ],
    outputs: [{ name: 'openChange', type: 'output<boolean>()', description: 'Emits on state toggle' }],
    accessibility: ['aria-expanded synchronization'],
    consumerUsage: `<ui-collapsible [(open)]="isOpen">
  <button slot="trigger">Toggle Panel</button>
  <div slot="content">Expanded contents...</div>
</ui-collapsible>`,
    angularCode: `import { Component, model } from '@angular/core';

@Component({
  selector: 'ui-collapsible',
  standalone: true,
  template: \`
    <div>
      <div (click)="open.update(v => !v)">
        <ng-content select="[slot=trigger]"></ng-content>
      </div>
      @if (open()) {
        <div class="animate-in fade-in pt-2">
          <ng-content select="[slot=content]"></ng-content>
        </div>
      }
    </div>
  \`
})
export class UiCollapsibleComponent {
  readonly open = model<boolean>(false);
}`
  },
  {
    id: 'scroll-area',
    name: 'Scroll Area',
    category: 'Layout & Structure',
    description: 'Augments native scroll functionality with custom styled cross-browser scrollbars.',
    shadcnEquivalent: 'Scroll Area',
    inputs: [
      { name: 'maxHeight', type: 'input<string>', default: "'200px'", description: 'Maximum visible height' }
    ],
    outputs: [],
    accessibility: ['Native keyboard scrolling preserved'],
    consumerUsage: `<ui-scroll-area maxHeight="250px">
  <div class="p-4 space-y-2">Long list of items...</div>
</ui-scroll-area>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-scroll-area',
  standalone: true,
  template: \`
    <div 
      class="relative overflow-y-auto rounded-md border border-zinc-200 dark:border-zinc-800 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700"
      [style.max-height]="maxHeight()"
    >
      <ng-content></ng-content>
    </div>
  \`
})
export class UiScrollAreaComponent {
  readonly maxHeight = input<string>('200px');
}`
  },
  {
    id: 'empty-state',
    name: 'Empty State',
    category: 'Layout & Structure',
    description: 'Engaging placeholder for empty lists, search results, or zero-data screens. (Bonus component)',
    shadcnEquivalent: 'Empty State (Bonus)',
    inputs: [
      { name: 'title', type: 'input<string>', default: "'No data found'", description: 'Heading' },
      { name: 'description', type: 'input<string>', default: "''", description: 'Subtitle' }
    ],
    outputs: [],
    accessibility: ['Clear contextual announcement'],
    consumerUsage: `<ui-empty-state title="No projects found" description="Get started by creating your first Angular app." />`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: \`
    <div class="flex flex-col items-center justify-center p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
      <div class="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
        📁
      </div>
      <h3 class="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{{ title() }}</h3>
      <p class="text-xs text-zinc-500 max-w-sm mt-1 mb-4">{{ description() }}</p>
      <ng-content></ng-content>
    </div>
  \`
})
export class UiEmptyStateComponent {
  readonly title = input<string>('No data found');
  readonly description = input<string>('');
}`
  },
  {
    id: 'resizable',
    name: 'Resizable Panels',
    category: 'Layout & Structure',
    description: 'Accessible resizable panel groups and layouts with keyboard and mouse drag handles powered by Signals.',
    shadcnEquivalent: 'Resizable',
    inputs: [
      { name: 'direction', type: "input<'horizontal' | 'vertical'>", default: "'horizontal'", description: 'Layout axis direction' },
      { name: 'defaultSize', type: 'input<number>', default: '50', description: 'Initial size percentage' }
    ],
    outputs: [{ name: 'sizeChange', type: 'output<number>()', description: 'Emits on resize' }],
    accessibility: ['role="separator"', 'Keyboard arrow resizing (aria-valuenow)', 'aria-orientation'],
    consumerUsage: `<ui-resizable-panel-group direction="horizontal">
  <ui-resizable-panel [size]="panel1Size">Panel One</ui-resizable-panel>
  <ui-resizable-handle />
  <ui-resizable-panel>Panel Two</ui-resizable-panel>
</ui-resizable-panel-group>`,
    angularCode: `import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'ui-resizable-panel-group',
  standalone: true,
  host: {
    '[class]': 'classes()'
  },
  template: '<ng-content></ng-content>'
})
export class UiResizablePanelGroupComponent {
  readonly direction = input<'horizontal' | 'vertical'>('horizontal');

  protected classes(): string {
    return 'flex h-full w-full rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden ' + 
      (this.direction() === 'vertical' ? 'flex-col' : 'flex-row');
  }
}

@Component({
  selector: 'ui-resizable-panel',
  standalone: true,
  host: {
    '[style.flex-grow]': 'size()',
    'class': 'overflow-auto p-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-w-[50px] min-h-[50px]'
  },
  template: '<ng-content></ng-content>'
})
export class UiResizablePanelComponent {
  readonly size = model<number>(50);
}

@Component({
  selector: 'ui-resizable-handle',
  standalone: true,
  host: {
    'role': 'separator',
    'tabindex': '0',
    'class': 'relative flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-600 transition-colors cursor-col-resize w-1.5 focus:outline-none focus:ring-1 focus:ring-zinc-400'
  },
  template: '<div class="z-10 flex h-4 w-1 rounded-full bg-zinc-400 dark:bg-zinc-600"></div>'
})
export class UiResizableHandleComponent {}`
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    category: 'Layout & Structure',
    description: 'A composable, collapsible application sidebar with header, content, footer, rail, and Signal-based collapse state.',
    shadcnEquivalent: 'Sidebar',
    inputs: [
      { name: 'collapsed', type: 'model<boolean>()', default: 'false', description: 'Signal model for collapsed rail state' }
    ],
    outputs: [{ name: 'collapsedChange', type: 'output<boolean>()', description: 'Emits on collapse toggle' }],
    accessibility: ['Semantic <aside> container', 'Keyboard collapsible toggle', 'aria-expanded state'],
    consumerUsage: `<ui-sidebar [(collapsed)]="isSidebarCollapsed">
  <ui-sidebar-header>Acme Inc</ui-sidebar-header>
  <ui-sidebar-content>
    <ui-sidebar-item icon="home" label="Dashboard" [active]="true" />
    <ui-sidebar-item icon="inbox" label="Messages" badge="12" />
  </ui-sidebar-content>
  <ui-sidebar-footer>
    <ui-sidebar-user name="Alex Smith" email="alex@acme.com" />
  </ui-sidebar-footer>
</ui-sidebar>`,
    angularCode: `import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'classes()'
  },
  template: \`
    <div class="flex h-full flex-col justify-between overflow-hidden">
      <div>
        <div class="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
          @if (!collapsed()) {
            <span class="font-bold text-xs tracking-tight text-zinc-900 dark:text-zinc-100">Workspace</span>
          }
          <button
            (click)="toggleCollapse()"
            class="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 text-xs ml-auto"
            title="Toggle sidebar"
          >
            {{ collapsed() ? '→' : '←' }}
          </button>
        </div>
        <div class="p-2 space-y-1">
          <ng-content select="[slot=content], ui-sidebar-content"></ng-content>
        </div>
      </div>
      <div class="p-3 border-t border-zinc-200 dark:border-zinc-800">
        <ng-content select="[slot=footer], ui-sidebar-footer"></ng-content>
      </div>
    </div>
  \`
})
export class UiSidebarComponent {
  readonly collapsed = model<boolean>(false);
  readonly collapsedChange = output<boolean>();

  toggleCollapse(): void {
    this.collapsed.update(c => !c);
    this.collapsedChange.emit(this.collapsed());
  }

  protected classes(): string {
    const base = 'flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950 transition-all duration-300 h-full ';
    return base + (this.collapsed() ? 'w-16' : 'w-64');
  }
}`
  },
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'Layout & Structure',
    description: 'Displays a chronological sequence of events or activity history. (Bonus component)',
    shadcnEquivalent: 'Timeline (Bonus)',
    inputs: [],
    outputs: [],
    accessibility: ['Semantic ordered list structure'],
    consumerUsage: `<ui-timeline>
  <ui-timeline-item date="2 hours ago" title="Deployed v1.0.0" />
</ui-timeline>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-timeline',
  standalone: true,
  template: '<div class="relative pl-6 border-l border-zinc-200 dark:border-zinc-800 space-y-6"><ng-content></ng-content></div>'
})
export class UiTimelineComponent {}

@Component({
  selector: 'ui-timeline-item',
  standalone: true,
  template: \`
    <div class="relative">
      <div class="absolute -left-[31px] top-1 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100 ring-4 ring-white dark:ring-zinc-950"></div>
      <span class="text-[10px] text-zinc-400 font-mono">{{ date() }}</span>
      <h5 class="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{{ title() }}</h5>
      <p class="text-xs text-zinc-500 mt-0.5"><ng-content></ng-content></p>
    </div>
  \`
})
export class UiTimelineItemComponent {
  readonly date = input<string>('');
  readonly title = input<string>('');
}`
  }
];
