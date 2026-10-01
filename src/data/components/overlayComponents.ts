/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../../types/component';

export const OVERLAY_COMPONENTS: ComponentDoc[] = [
  {
    id: 'dialog',
    name: 'Dialog / Modal',
    category: 'Feedback & Overlay',
    description: 'An accessible modal dialog with backdrop blur, focus trapping, and escape handling driven by Signal model().',
    shadcnEquivalent: 'Dialog',
    cdkPrimitive: '@angular/cdk/overlay, @angular/cdk/a11y (CdkTrapFocus)',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for modal visibility' },
      { name: 'title', type: 'input<string>', default: "''", description: 'Heading' }
    ],
    outputs: [{ name: 'closed', type: 'output<void>()', description: 'Emits on dismiss' }],
    accessibility: ['Focus trapping with CDK TrapFocus', 'Escape key listener', 'aria-modal="true"'],
    consumerUsage: `<ui-dialog [(open)]="isModalOpen" title="Account Settings">
  <p>Modal body content...</p>
</ui-dialog>`,
    angularCode: `import { Component, input, model, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule, CdkTrapFocus],
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in" (click)="close()"></div>
      <div 
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl sm:rounded-lg animate-in zoom-in-95 text-zinc-900 dark:text-zinc-100"
        role="dialog"
        aria-modal="true"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
      >
        <div class="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800">
          <h3 class="text-base font-semibold leading-none tracking-tight">{{ title() }}</h3>
          <button (click)="close()" class="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-xs">✕</button>
        </div>
        <div class="py-2"><ng-content></ng-content></div>
      </div>
    }
  \`
})
export class UiDialogComponent {
  readonly open = model<boolean>(false);
  readonly title = input<string>('');
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.open()) this.close(); }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}`
  },
  {
    id: 'alert-dialog',
    name: 'Alert Dialog',
    category: 'Feedback & Overlay',
    description: 'A modal dialog that interrupts the user with important content and expects an explicit confirmation.',
    shadcnEquivalent: 'Alert Dialog',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for open state' },
      { name: 'title', type: 'input<string>', default: "'Are you sure?'", description: 'Alert title' }
    ],
    outputs: [
      { name: 'confirmed', type: 'output<void>()', description: 'Emitted when confirmed' },
      { name: 'cancelled', type: 'output<void>()', description: 'Emitted when cancelled' }
    ],
    accessibility: ['role="alertdialog"', 'Explicit confirmation buttons'],
    consumerUsage: `<ui-alert-dialog [(open)]="isConfirmOpen" title="Delete Repository?" (confirmed)="onDelete()" />`,
    angularCode: `import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'ui-alert-dialog',
  standalone: true,
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs animate-in fade-in"></div>
      <div class="fixed left-[50%] top-[50%] z-50 w-full max-w-md translate-x-[-50%] translate-y-[-50%] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl space-y-4 animate-in zoom-in-95 text-zinc-900 dark:text-zinc-100" role="alertdialog">
        <h3 class="text-base font-semibold">{{ title() }}</h3>
        <p class="text-xs text-zinc-500">This action cannot be undone. This will permanently delete your account data.</p>
        <div class="flex justify-end gap-2 pt-2">
          <button (click)="cancel()" class="px-3 py-1.5 rounded-md border text-xs font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800">Cancel</button>
          <button (click)="confirm()" class="px-3 py-1.5 rounded-md bg-red-600 text-white text-xs font-semibold hover:bg-red-700">Continue</button>
        </div>
      </div>
    }
  \`
})
export class UiAlertDialogComponent {
  readonly open = model<boolean>(false);
  readonly title = input<string>('Are you sure?');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();

  confirm(): void { this.open.set(false); this.confirmed.emit(); }
  cancel(): void { this.open.set(false); this.cancelled.emit(); }
}`
  },
  {
    id: 'sheet',
    name: 'Sheet / Drawer',
    category: 'Feedback & Overlay',
    description: 'Extends dialog to slide out from any viewport edge (right, left, top, bottom).',
    shadcnEquivalent: 'Sheet',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Visibility signal model' },
      { name: 'side', type: "input<'left' | 'right' | 'top' | 'bottom'>", default: "'right'", description: 'Edge' }
    ],
    outputs: [{ name: 'closed', type: 'output<void>()', description: 'Emits on close' }],
    accessibility: ['Escape key detection', 'Backdrop click dismiss'],
    consumerUsage: `<ui-sheet [(open)]="isDrawerOpen" side="right">Sidebar...</ui-sheet>`,
    angularCode: `import { Component, input, model, output, computed } from '@angular/core';

@Component({
  selector: 'ui-sheet',
  standalone: true,
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs animate-in fade-in" (click)="close()"></div>
      <div class="fixed z-50 bg-white dark:bg-zinc-950 p-6 shadow-2xl transition ease-in-out border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100" [class]="classes()">
        <ng-content></ng-content>
      </div>
    }
  \`
})
export class UiSheetComponent {
  readonly open = model<boolean>(false);
  readonly side = input<'left' | 'right' | 'top' | 'bottom'>('right');
  readonly closed = output<void>();

  protected readonly classes = computed(() => {
    switch (this.side()) {
      case 'left': return 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm animate-in slide-in-from-left duration-200';
      case 'right': return 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm animate-in slide-in-from-right duration-200';
      case 'top': return 'inset-x-0 top-0 border-b animate-in slide-in-from-top duration-200';
      case 'bottom': return 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-200';
    }
  });

  close(): void { this.open.set(false); this.closed.emit(); }
}`
  },
  {
    id: 'toast',
    name: 'Toast / Sonner',
    category: 'Feedback & Overlay',
    description: 'A succinct floating alert message driven by a reactive global Signal service queue.',
    shadcnEquivalent: 'Sonner / Toast',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [],
    outputs: [],
    accessibility: ['role="status"', 'aria-live="polite"'],
    consumerUsage: `this.toast.success('Event Saved', 'Your calendar was synchronized.');`,
    angularCode: `import { Injectable, signal, Component } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiToastService {
  readonly toasts = signal<Array<{ id: string; title: string; desc?: string }>>([]);

  show(title: string, desc?: string): void {
    const id = Math.random().toString(36).substring(7);
    this.toasts.update(list => [...list, { id, title, desc }]);
    setTimeout(() => this.dismiss(id), 3500);
  }

  success(title: string, desc?: string): void { this.show(title, desc); }
  dismiss(id: string): void { this.toasts.update(list => list.filter(t => t.id !== id)); }
}

@Component({
  selector: 'ui-toaster',
  standalone: true,
  template: \`
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      @for (item of toastService.toasts(); track item.id) {
        <div class="pointer-events-auto flex items-center justify-between rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 shadow-xl text-zinc-900 dark:text-zinc-100 animate-in slide-in-from-bottom-2">
          <div>
            <h5 class="text-xs font-bold">{{ item.title }}</h5>
            @if (item.desc) { <p class="text-[11px] text-zinc-500 mt-0.5">{{ item.desc }}</p> }
          </div>
          <button (click)="toastService.dismiss(item.id)" class="text-xs opacity-50 hover:opacity-100 ml-3">✕</button>
        </div>
      }
    </div>
  \`
})
export class UiToasterComponent {
  constructor(public toastService: UiToastService) {}
}`
  },
  {
    id: 'popover',
    name: 'Popover',
    category: 'Feedback & Overlay',
    description: 'Displays rich floating content in a portal triggered by an anchor element.',
    shadcnEquivalent: 'Popover',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for open' }
    ],
    outputs: [],
    accessibility: ['Focus restoration', 'Escape key close'],
    consumerUsage: `<ui-popover [(open)]="isOpen">
  <button slot="trigger">Open Popover</button>
  <div slot="content">Popover details...</div>
</ui-popover>`,
    angularCode: `import { Component, model } from '@angular/core';

@Component({
  selector: 'ui-popover',
  standalone: true,
  template: \`
    <div class="relative inline-block">
      <div (click)="open.update(v => !v)">
        <ng-content select="[slot=trigger]"></ng-content>
      </div>
      @if (open()) {
        <div class="absolute z-50 mt-2 w-72 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 text-zinc-900 dark:text-zinc-100 shadow-md">
          <ng-content select="[slot=content]"></ng-content>
        </div>
      }
    </div>
  \`
})
export class UiPopoverComponent {
  readonly open = model<boolean>(false);
}`
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback & Overlay',
    description: 'A popup that displays information related to an element when hovered or keyboard focused.',
    shadcnEquivalent: 'Tooltip',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'text', type: 'input<string>', default: "''", description: 'Tooltip message' }
    ],
    outputs: [],
    accessibility: ['role="tooltip"', 'aria-describedby mapping'],
    consumerUsage: `<ui-tooltip text="Add to bookmarks">
  <button class="p-2">★</button>
</ui-tooltip>`,
    angularCode: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-tooltip',
  standalone: true,
  template: \`
    <div class="relative inline-block" (mouseenter)="visible.set(true)" (mouseleave)="visible.set(false)">
      <ng-content></ng-content>
      @if (visible()) {
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 whitespace-nowrap rounded bg-zinc-900 dark:bg-zinc-100 px-2 py-1 text-[11px] font-medium text-white dark:text-zinc-900 shadow-md animate-in fade-in">
          {{ text() }}
        </div>
      }
    </div>
  \`
})
export class UiTooltipComponent {
  readonly text = input<string>('');
  readonly visible = signal<boolean>(false);
}`
  },
  {
    id: 'dropdown-menu',
    name: 'Dropdown Menu',
    category: 'Feedback & Overlay',
    description: 'Displays a menu to the user—such as a set of actions or functions—triggered by a button.',
    shadcnEquivalent: 'Dropdown Menu',
    cdkPrimitive: '@angular/cdk/overlay, @angular/cdk/a11y',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Visibility state' }
    ],
    outputs: [],
    accessibility: ['role="menu" and role="menuitem"', 'Keyboard arrow navigation'],
    consumerUsage: `<ui-dropdown-menu>
  <button slot="trigger">Options ▾</button>
  <ui-menu-item (clicked)="edit()">Edit</ui-menu-item>
  <ui-menu-item (clicked)="delete()">Delete</ui-menu-item>
</ui-dropdown-menu>`,
    angularCode: `import { Component, model } from '@angular/core';

@Component({
  selector: 'ui-dropdown-menu',
  standalone: true,
  template: \`
    <div class="relative inline-block text-left">
      <div (click)="open.update(v => !v)">
        <ng-content select="[slot=trigger]"></ng-content>
      </div>
      @if (open()) {
        <div class="absolute right-0 z-50 mt-2 w-48 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 text-zinc-900 dark:text-zinc-100 shadow-lg" role="menu">
          <ng-content></ng-content>
        </div>
      }
    </div>
  \`
})
export class UiDropdownMenuComponent {
  readonly open = model<boolean>(false);
}`
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'Feedback & Overlay',
    description: 'Displays a callout for user attention with status variants (default, destructive).',
    shadcnEquivalent: 'Alert',
    inputs: [
      { name: 'variant', type: "input<'default' | 'destructive'>", default: "'default'", description: 'Alert theme' },
      { name: 'title', type: 'input<string>', default: "''", description: 'Headline' }
    ],
    outputs: [],
    accessibility: ['role="alert" for immediate screen reader priority'],
    consumerUsage: `<ui-alert variant="destructive" title="Payment Failed">Please update your credit card details.</ui-alert>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-alert',
  standalone: true,
  host: {
    'role': 'alert',
    '[class]': 'classes()'
  },
  template: \`
    <h5 class="mb-1 font-semibold leading-none tracking-tight">{{ title() }}</h5>
    <div class="text-xs opacity-90"><ng-content></ng-content></div>
  \`
})
export class UiAlertComponent {
  readonly variant = input<'default' | 'destructive'>('default');
  readonly title = input<string>('');

  classes(): string {
    const base = 'relative w-full rounded-lg border p-4 text-xs block';
    return this.variant() === 'destructive'
      ? \`\${base} border-red-500/50 text-red-600 dark:text-red-400 bg-red-500/10\`
      : \`\${base} border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-950\`;
  }
}`
  },
  {
    id: 'drawer',
    name: 'Drawer',
    category: 'Feedback & Overlay',
    description: 'A mobile-friendly sliding bottom sheet dialog with smooth gesture tracking, backdrop dismissal, and Signal model() state.',
    shadcnEquivalent: 'Drawer (Vaul)',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for drawer visibility' },
      { name: 'title', type: 'input<string>', default: "''", description: 'Drawer heading' }
    ],
    outputs: [{ name: 'closed', type: 'output<void>()', description: 'Emits on close' }],
    accessibility: ['role="dialog"', 'aria-modal="true"', 'Escape key dismissal', 'Touch handle indication'],
    consumerUsage: `<ui-drawer [(open)]="isDrawerOpen" title="Move Goal">
  <div class="p-4 space-y-2">
    <p>Set your daily activity goal</p>
    <ui-button (clicked)="isDrawerOpen.set(false)">Submit</ui-button>
  </div>
</ui-drawer>`,
    angularCode: `import { Component, input, model, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-drawer',
  standalone: true,
  imports: [CommonModule],
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in" (click)="close()"></div>
      <div 
        class="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 text-zinc-900 dark:text-zinc-100 max-w-lg mx-auto"
        role="dialog"
        aria-modal="true"
      >
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        @if (title()) {
          <div class="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800 mb-4">
            <h3 class="text-base font-semibold leading-none tracking-tight">{{ title() }}</h3>
            <button (click)="close()" class="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 text-xs">✕</button>
          </div>
        }
        <ng-content></ng-content>
      </div>
    }
  \`
})
export class UiDrawerComponent {
  readonly open = model<boolean>(false);
  readonly title = input<string>('');
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void { if (this.open()) this.close(); }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}`
  },
  {
    id: 'context-menu',
    name: 'Context Menu',
    category: 'Feedback & Overlay',
    description: 'Displays a menu to sighted users, triggered by a right-click or long-press, positioned dynamically at cursor coordinates.',
    shadcnEquivalent: 'Context Menu',
    inputs: [
      { name: 'items', type: 'input<Array<{ label: string; action?: () => void; shortcut?: string; separator?: boolean }>>', default: '[]', description: 'Menu actions list' }
    ],
    outputs: [{ name: 'selected', type: 'output<string>()', description: 'Emits chosen action label' }],
    accessibility: ['role="menu"', 'Escape key dismiss', 'Click outside listener'],
    consumerUsage: `<ui-context-menu [items]="menuItems" (selected)="handleAction($event)">
  <div class="h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
    Right click here
  </div>
</ui-context-menu>`,
    angularCode: `import { Component, input, output, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ContextMenuItem {
  label: string;
  shortcut?: string;
  separator?: boolean;
}

@Component({
  selector: 'ui-context-menu',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div (contextmenu)="handleContextMenu($event)">
      <ng-content></ng-content>
    </div>

    @if (isOpen()) {
      <div class="fixed inset-0 z-40" (click)="close()"></div>
      <div
        class="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-md text-xs text-zinc-900 dark:text-zinc-100 animate-in fade-in zoom-in-95"
        [style.left.px]="posX()"
        [style.top.px]="posY()"
        role="menu"
      >
        @for (item of items(); track item.label) {
          @if (item.separator) {
            <div class="-mx-1 my-1 h-px bg-zinc-200 dark:bg-zinc-800"></div>
          } @else {
            <button
              (click)="selectItem(item.label)"
              class="relative flex w-full cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-xs outline-none hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
              role="menuitem"
            >
              <span>{{ item.label }}</span>
              @if (item.shortcut) {
                <span class="ml-auto text-[10px] tracking-widest text-zinc-400 font-mono">{{ item.shortcut }}</span>
              }
            </button>
          }
        }
      </div>
    }
  \`
})
export class UiContextMenuComponent {
  readonly items = input<ContextMenuItem[]>([
    { label: 'Back', shortcut: '⌘[' },
    { label: 'Forward', shortcut: '⌘]' },
    { label: 'Reload', shortcut: '⌘R' },
    { label: 'sep', separator: true },
    { label: 'Save As...', shortcut: '⌘S' },
    { label: 'Inspect Element' }
  ]);
  readonly selected = output<string>();

  readonly isOpen = signal<boolean>(false);
  readonly posX = signal<number>(0);
  readonly posY = signal<number>(0);

  handleContextMenu(e: MouseEvent): void {
    e.preventDefault();
    this.posX.set(Math.min(e.clientX, window.innerWidth - 180));
    this.posY.set(Math.min(e.clientY, window.innerHeight - 200));
    this.isOpen.set(true);
  }

  selectItem(label: string): void {
    this.selected.emit(label);
    this.close();
  }

  close(): void { this.isOpen.set(false); }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.close(); }
}`
  },
  {
    id: 'hover-card',
    name: 'Hover Card',
    category: 'Feedback & Overlay',
    description: 'For sighted users to preview content available behind a link on hover.',
    shadcnEquivalent: 'Hover Card',
    inputs: [
      { name: 'title', type: 'input<string>', default: "''", description: 'Card title' }
    ],
    outputs: [],
    accessibility: ['Non-blocking hover preview'],
    consumerUsage: `<ui-hover-card title="@angular">Framework details preview...</ui-hover-card>`,
    angularCode: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-hover-card',
  standalone: true,
  template: \`
    <div class="relative inline-block" (mouseenter)="open.set(true)" (mouseleave)="open.set(false)">
      <ng-content select="[slot=trigger]"></ng-content>
      @if (open()) {
        <div class="absolute z-50 mt-2 w-64 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 text-zinc-900 dark:text-zinc-100 shadow-md animate-in fade-in">
          <ng-content></ng-content>
        </div>
      }
    </div>
  \`
})
export class UiHoverCardComponent {
  readonly open = signal<boolean>(false);
}`
  }
];
