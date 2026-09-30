/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../types/component';

export const COMPONENTS_DATA: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Form',
    description: 'Displays a button with multiple variants, sizes, and loading state powered entirely by Angular Signals (Zone.js-free).',
    shadcnEquivalent: 'Button',
    cdkPrimitive: '@angular/cdk/a11y (FocusMonitor)',
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    inputs: [
      { name: 'variant', type: "input<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>", default: "'default'", description: 'Signal input for visual style variant' },
      { name: 'size', type: "input<'default' | 'sm' | 'lg' | 'icon'>", default: "'default'", description: 'Signal input for button dimensions' },
      { name: 'disabled', type: "input<boolean>", default: 'false', description: 'Signal input for disabled state' },
      { name: 'loading', type: "input<boolean>", default: 'false', description: 'Signal input for loading spinner' },
      { name: 'type', type: "input<'button' | 'submit' | 'reset'>", default: "'button'", description: 'Signal input for native button type' },
    ],
    outputs: [
      { name: 'clicked', type: 'output<MouseEvent>()', description: 'Angular Signal output event emitter' }
    ],
    accessibility: [
      'Preserves native focus and keyboard activation (Enter/Space)',
      'Reactively updates aria-disabled when loading() or disabled() changes',
      'Visible focus ring with offset for WCAG 2.1 AA focus contrast compliance'
    ],
    consumerUsage: `<ui-button variant="default" (clicked)="handleSubmit()">
  Save Changes
</ui-button>

<ui-button variant="outline" size="sm">
  Cancel
</ui-button>

<ui-button variant="destructive" [loading]="isDeleting()">
  Delete Account
</ui-button>`,
    angularCode: `import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

/**
 * Pure Angular Signals Button Component
 * Zoneless native: No Zone.js or ChangeDetectionStrategy.OnPush required.
 */
@Component({
  selector: 'ui-button, [ui-button]',
  standalone: true,
  imports: [CommonModule],
  host: {
    '[attr.type]': 'type()',
    '[attr.disabled]': 'disabled() || loading() ? true : null',
    '[attr.aria-disabled]': 'disabled() || loading()',
    '[class]': 'classes()',
    '(click)': 'handleClick($event)'
  },
  template: \`
    @if (loading()) {
      <svg class="mr-2 h-4 w-4 animate-spin text-current" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
    }
    <ng-content></ng-content>
  \`
})
export class UiButtonComponent {
  // Pure Reactive Signal Inputs
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Signal Output (no EventEmitter overhead)
  readonly clicked = output<MouseEvent>();

  // Computed Signal for dynamic styling
  protected readonly classes = computed(() => {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants: Record<ButtonVariant, string> = {
      default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 shadow active:scale-[0.98]',
      destructive: 'bg-red-900/80 text-red-100 hover:bg-red-800 shadow-sm active:scale-[0.98]',
      outline: 'border border-zinc-800 bg-zinc-950 text-zinc-100 hover:bg-zinc-900',
      secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
      ghost: 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900',
      link: 'text-zinc-100 underline-offset-4 hover:underline'
    };

    const sizes: Record<ButtonSize, string> = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 rounded-md px-3 text-xs',
      lg: 'h-10 rounded-md px-8 text-base',
      icon: 'h-9 w-9'
    };

    return \`\${base} \${variants[this.variant()]} \${sizes[this.size()]}\`;
  });

  protected handleClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.clicked.emit(event);
  }
}`
  },
  {
    id: 'input',
    name: 'Input',
    category: 'Form',
    description: 'A form text input driven by two-way Signal model() and ControlValueAccessor for zoneless reactive forms.',
    shadcnEquivalent: 'Input',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Two-way Signal model for direct zoneless binding' },
      { name: 'type', type: 'input<string>', default: "'text'", description: 'Input type attribute' },
      { name: 'placeholder', type: 'input<string>', default: "''", description: 'Placeholder label' },
      { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Disables user interaction' },
      { name: 'error', type: 'input<boolean>', default: 'false', description: 'Triggers error border styling' }
    ],
    outputs: [
      { name: 'valueChange', type: 'output<string>()', description: 'Emits when value signal updates' }
    ],
    accessibility: [
      'Links cleanly with label element',
      'Reflects aria-invalid dynamically via computed signal',
      'Zoneless keyboard event updates'
    ],
    consumerUsage: `<ui-input 
  placeholder="Enter email" 
  [(value)]="userEmail"
  [error]="emailInvalid()"
/>`,
    angularCode: `import { Component, input, model, forwardRef, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Signal-Driven Input Component
 * Uses Angular 18/19 model() signal for two-way data flow without zone.js.
 */
@Component({
  selector: 'ui-input, input[ui-input]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiInputComponent),
      multi: true
    }
  ],
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'type()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'disabled() ? true : null',
    '[attr.aria-invalid]': 'error() ? true : null',
    '[value]': 'value()',
    '(input)': 'handleInput($event)',
    '(blur)': 'onTouched()'
  },
  template: ''
})
export class UiInputComponent implements ControlValueAccessor {
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly error = input<boolean>(false);

  // Two-way signal model: [(value)]="myProp"
  readonly value = model<string>('');

  protected onChange: (val: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly classes = computed(() => {
    const base = 'flex h-9 w-full rounded-md border bg-zinc-900/50 px-3 py-1 text-sm text-zinc-100 shadow-sm transition-colors placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50';
    const border = this.error() 
      ? 'border-red-500 focus-visible:ring-red-500' 
      : 'border-zinc-800';
    return \`\${base} \${border}\`;
  });

  handleInput(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void {
    this.value.set(val || '');
  }

  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}`
  },
  {
    id: 'dialog',
    name: 'Dialog / Modal',
    category: 'Feedback & Overlay',
    description: 'An accessible modal dialog with backdrop blur, focus trapping, and escape handling driven by Signal model().',
    shadcnEquivalent: 'Dialog',
    cdkPrimitive: '@angular/cdk/overlay, @angular/cdk/a11y (CdkTrapFocus)',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Two-way Signal for modal visibility' },
      { name: 'title', type: 'input<string>', default: "''", description: 'Accessible modal heading' },
      { name: 'description', type: 'input<string>', default: "''", description: 'Modal subtitle' },
      { name: 'closeOnBackdrop', type: 'input<boolean>', default: 'true', description: 'Dismiss on backdrop tap' }
    ],
    outputs: [
      { name: 'closed', type: 'output<void>()', description: 'Emits when dialog closes' }
    ],
    accessibility: [
      'Focus trapped with CdkTrapFocus',
      'Automatic Escape key listener via reactive host listener',
      'aria-modal="true" and role="dialog"'
    ],
    consumerUsage: `<ui-dialog [(open)]="isModalOpen" title="Edit Profile" description="Update your public info.">
  <div class="space-y-4 py-4">
    <ui-input [(value)]="username" placeholder="Display Name" />
  </div>
  <div slot="footer" class="flex justify-end gap-2">
    <ui-button variant="outline" (clicked)="isModalOpen.set(false)">Cancel</ui-button>
    <ui-button (clicked)="save()">Save changes</ui-button>
  </div>
</ui-dialog>`,
    angularCode: `import { Component, input, model, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';

/**
 * Signal-Driven Dialog Component
 * Uses Angular 18/19 model() signal for reactive open/close without Zone.js.
 */
@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule, CdkTrapFocus],
  template: \`
    @if (open()) {
      <!-- Backdrop Overlay -->
      <div 
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs transition-opacity animate-in fade-in"
        (click)="handleBackdropClick()"
      ></div>

      <!-- Dialog Panel -->
      <div 
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:rounded-lg animate-in zoom-in-95"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="title()"
        cdkTrapFocus
        cdkTrapFocusAutoCapture
      >
        <!-- Header -->
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          @if (title()) {
            <h2 class="text-lg font-semibold leading-none tracking-tight text-zinc-100">{{ title() }}</h2>
          }
          @if (description()) {
            <p class="text-sm text-zinc-400">{{ description() }}</p>
          }
        </div>

        <!-- Body Content -->
        <div class="py-2">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-2 border-t border-zinc-800">
          <ng-content select="[slot=footer]"></ng-content>
        </div>

        <!-- Close Button -->
        <button 
          type="button" 
          (click)="close()"
          class="absolute right-4 top-4 rounded-sm text-zinc-400 opacity-70 transition-opacity hover:opacity-100 hover:text-zinc-100 focus:outline-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    }
  \`
})
export class UiDialogComponent {
  // Two-way signal model: [(open)]="isDialogOpen"
  readonly open = model<boolean>(false);
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly closeOnBackdrop = input<boolean>(true);

  // Signal Output
  readonly closed = output<void>();

  @HostListener('document:keydown.escape', ['$event'])
  handleEscape(event: KeyboardEvent): void {
    if (this.open()) {
      event.preventDefault();
      this.close();
    }
  }

  handleBackdropClick(): void {
    if (this.closeOnBackdrop()) {
      this.close();
    }
  }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}`
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Form',
    description: 'An accessible toggle switch control driven by Signal model() for zoneless state transitions.',
    shadcnEquivalent: 'Switch',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'checked', type: 'model<boolean>()', default: 'false', description: 'Signal model for checked toggle state' },
      { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Prevents interaction' },
      { name: 'ariaLabel', type: 'input<string>', default: "'Toggle switch'", description: 'Screen reader label' }
    ],
    outputs: [
      { name: 'checkedChange', type: 'output<boolean>()', description: 'Emits when switch is toggled' }
    ],
    accessibility: [
      'role="switch" and reactive aria-checked',
      'Keyboard Space/Enter activation',
      'Smooth CSS transform animation on thumb'
    ],
    consumerUsage: `<ui-switch [(checked)]="notificationsEnabled" ariaLabel="Notifications" />`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Pure Signal-Based Switch Component
 * Direct signal reactivity without zone.js ticks.
 */
@Component({
  selector: 'ui-switch',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSwitchComponent),
      multi: true
    }
  ],
  template: \`
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [attr.aria-label]="ariaLabel()"
      [disabled]="disabled()"
      (click)="toggle()"
      class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      [class.bg-zinc-100]="checked()"
      [class.bg-zinc-800]="!checked()"
    >
      <span
        class="pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform"
        [class.translate-x-4]="checked()"
        [class.translate-x-0]="!checked()"
        [class.bg-zinc-950]="checked()"
        [class.bg-zinc-400]="!checked()"
      ></span>
    </button>
  \`
})
export class UiSwitchComponent implements ControlValueAccessor {
  // Two-way signal model: [(checked)]="myState"
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string>('Toggle switch');

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(): void {
    if (this.disabled()) return;
    this.checked.update(v => !v);
    this.onChange(this.checked());
    this.onTouched();
  }

  writeValue(val: boolean): void {
    this.checked.set(!!val);
  }

  registerOnChange(fn: (val: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}`
  },
  {
    id: 'card',
    name: 'Card',
    category: 'Layout & Structure',
    description: 'Composable card container with header, title, description, content, and footer components.',
    shadcnEquivalent: 'Card',
    inputs: [],
    outputs: [],
    accessibility: [
      'Accessible semantic heading structure',
      'High surface contrast with bg-zinc-900 border-zinc-800'
    ],
    consumerUsage: `<ui-card>
  <ui-card-header>
    <ui-card-title>Create Project</ui-card-title>
    <ui-card-description>Deploy with pure Angular signals.</ui-card-description>
  </ui-card-header>
  <ui-card-content>
    <p>Body content...</p>
  </ui-card-content>
  <ui-card-footer class="flex justify-between">
    <ui-button variant="outline">Cancel</ui-button>
    <ui-button>Deploy</ui-button>
  </ui-card-footer>
</ui-card>`,
    angularCode: `import { Component } from '@angular/core';

@Component({
  selector: 'ui-card',
  standalone: true,
  host: { class: 'rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-100 shadow-sm block' },
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
  host: { class: 'font-semibold leading-none tracking-tight text-zinc-100 block text-base' },
  template: '<ng-content></ng-content>'
})
export class UiCardTitleComponent {}

@Component({
  selector: 'ui-card-description',
  standalone: true,
  host: { class: 'text-xs text-zinc-400 block' },
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
    id: 'badge',
    name: 'Badge',
    category: 'Data Display',
    description: 'A status badge component with color variants driven by a pure computed Signal.',
    shadcnEquivalent: 'Badge',
    variants: ['default', 'secondary', 'destructive', 'outline'],
    inputs: [
      { name: 'variant', type: "input<'default' | 'secondary' | 'destructive' | 'outline'>", default: "'default'", description: 'Signal input for visual badge variant' }
    ],
    outputs: [],
    accessibility: ['WCAG readable contrast across dark and light palettes'],
    consumerUsage: `<ui-badge variant="default">Signal Native</ui-badge>
<ui-badge variant="secondary">Zoneless</ui-badge>`,
    angularCode: `import { Component, input, computed } from '@angular/core';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

@Component({
  selector: 'ui-badge',
  standalone: true,
  host: {
    '[class]': 'classes()'
  },
  template: '<ng-content></ng-content>'
})
export class UiBadgeComponent {
  readonly variant = input<BadgeVariant>('default');

  protected readonly classes = computed(() => {
    const base = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors';
    
    const variants: Record<BadgeVariant, string> = {
      default: 'border-transparent bg-zinc-100 text-zinc-950 shadow hover:bg-zinc-200',
      secondary: 'border-transparent bg-zinc-800 text-zinc-100 hover:bg-zinc-700',
      destructive: 'border-transparent bg-red-900/60 text-red-100 shadow hover:bg-red-800',
      outline: 'border-zinc-800 text-zinc-100'
    };

    return \`\${base} \${variants[this.variant()]}\`;
  });
}`
  },
  {
    id: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    description: 'Accessible tabbed navigation where active tab state is driven reactively by a Signal model().',
    shadcnEquivalent: 'Tabs',
    cdkPrimitive: '@angular/cdk/a11y',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Signal model for active tab value' }
    ],
    outputs: [
      { name: 'valueChange', type: 'output<string>()', description: 'Emits when selected tab changes' }
    ],
    accessibility: [
      'WAI-ARIA Tablist, Tab, and Tabpanel semantics',
      'Direct reactivity without zone.js dirty-checking'
    ],
    consumerUsage: `<ui-tabs [(value)]="activeTab">
  <ui-tabs-list>
    <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
    <ui-tabs-trigger value="password">Password</ui-tabs-trigger>
  </ui-tabs-list>
  <ui-tabs-content value="account">Account settings...</ui-tabs-content>
  <ui-tabs-content value="password">Password security...</ui-tabs-content>
</ui-tabs>`,
    angularCode: `import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Signal-Driven Tabs Root Component
 */
@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>'
})
export class UiTabsComponent {
  // Two-way signal model for selected tab
  readonly value = model<string>('');

  selectTab(val: string): void {
    this.value.set(val);
  }
}

@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  host: {
    class: 'inline-flex h-9 items-center justify-center rounded-lg bg-zinc-900 p-1 text-zinc-400 border border-zinc-800'
  },
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

  isSelected(): boolean {
    return this.tabs.value() === this.value();
  }

  select(): void {
    this.tabs.selectTab(this.value());
  }

  classes(): string {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-all cursor-pointer select-none';
    const active = this.isSelected() 
      ? 'bg-zinc-950 text-zinc-100 shadow-xs' 
      : 'hover:text-zinc-200';
    return \`\${base} \${active}\`;
  }
}

@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  host: {
    'role': 'tabpanel',
    '[class.hidden]': '!isSelected()',
    class: 'mt-2'
  },
  template: \`
    @if (isSelected()) {
      <ng-content></ng-content>
    }
  \`
})
export class UiTabsContentComponent {
  readonly value = input.required<string>();

  constructor(private tabs: UiTabsComponent) {}

  isSelected(): boolean {
    return this.tabs.value() === this.value();
  }
}`
  },
  {
    id: 'accordion',
    name: 'Accordion',
    category: 'Layout & Structure',
    description: 'Interactive collapsible accordion items with expanded state managed by reactive signal().',
    shadcnEquivalent: 'Accordion',
    cdkPrimitive: '@angular/cdk/accordion',
    inputs: [
      { name: 'multiple', type: 'input<boolean>', default: 'false', description: 'Allow multiple simultaneous panels open' }
    ],
    outputs: [],
    accessibility: [
      'aria-expanded reactive binding',
      'Smooth CSS slide animation'
    ],
    consumerUsage: `<ui-accordion>
  <ui-accordion-item title="Is it Zoneless?">
    Yes! It runs on Angular 18/19 Signals without zone.js.
  </ui-accordion-item>
</ui-accordion>`,
    angularCode: `import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-accordion',
  standalone: true,
  host: { class: 'divide-y divide-zinc-800 border-y border-zinc-800 block w-full' },
  template: '<ng-content></ng-content>'
})
export class UiAccordionComponent {
  readonly multiple = input<boolean>(false);
}

@Component({
  selector: 'ui-accordion-item',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <button
      type="button"
      [attr.aria-expanded]="expanded()"
      (click)="toggle()"
      class="flex flex-1 items-center justify-between py-3 font-medium transition-all hover:underline text-left w-full text-zinc-100 text-xs cursor-pointer"
    >
      <span>{{ title() }}</span>
      <span class="text-zinc-500 font-mono text-sm">{{ expanded() ? '−' : '+' }}</span>
    </button>

    @if (expanded()) {
      <div class="overflow-hidden text-xs pb-3 pt-1 text-zinc-400 leading-relaxed animate-in fade-in">
        <ng-content></ng-content>
      </div>
    }
  \`
})
export class UiAccordionItemComponent {
  readonly title = input.required<string>();
  
  // Internal Signal state
  readonly expanded = signal<boolean>(false);

  toggle(): void {
    this.expanded.update(v => !v);
  }
}`
  },
  {
    id: 'sheet',
    name: 'Sheet / Drawer',
    category: 'Feedback & Overlay',
    description: 'Sliding drawer overlay panel using two-way Signal model() for zoneless animation.',
    shadcnEquivalent: 'Sheet',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'open', type: 'model<boolean>()', default: 'false', description: 'Signal model for drawer visibility' },
      { name: 'side', type: "input<'left' | 'right' | 'top' | 'bottom'>", default: "'right'", description: 'Slide edge' }
    ],
    outputs: [
      { name: 'closed', type: 'output<void>()', description: 'Emitted when sheet is closed' }
    ],
    accessibility: ['Escape key detection', 'Backdrop tap dismissal'],
    consumerUsage: `<ui-sheet [(open)]="isDrawerOpen" side="right">
  <p>Navigation content...</p>
</ui-sheet>`,
    angularCode: `import { Component, input, model, output, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SheetSide = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'ui-sheet',
  standalone: true,
  imports: [CommonModule],
  template: \`
    @if (open()) {
      <div class="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs animate-in fade-in" (click)="close()"></div>
      <div class="fixed z-50 bg-zinc-950 p-6 shadow-2xl transition ease-in-out border-zinc-800" [class]="classes()">
        <div class="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 class="text-sm font-semibold text-zinc-100">Drawer</h3>
          <button (click)="close()" class="text-zinc-400 hover:text-zinc-100 text-xs">✕</button>
        </div>
        <div class="py-4">
          <ng-content></ng-content>
        </div>
      </div>
    }
  \`
})
export class UiSheetComponent {
  readonly open = model<boolean>(false);
  readonly side = input<SheetSide>('right');
  readonly closed = output<void>();

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) this.close();
  }

  protected readonly classes = computed(() => {
    switch (this.side()) {
      case 'left': return 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm animate-in slide-in-from-left duration-200';
      case 'right': return 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm animate-in slide-in-from-right duration-200';
      case 'top': return 'inset-x-0 top-0 border-b animate-in slide-in-from-top duration-200';
      case 'bottom': return 'inset-x-0 bottom-0 border-t animate-in slide-in-from-bottom duration-200';
    }
  });

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}`
  },
  {
    id: 'toast',
    name: 'Toast / Sonner',
    category: 'Feedback & Overlay',
    description: 'Reactive toast notification service powered by a shared signal<ToastMessage[]>().',
    shadcnEquivalent: 'Sonner / Toast',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [],
    outputs: [],
    accessibility: ['role="status" with aria-live="polite"'],
    consumerUsage: `constructor(private toast: UiToastService) {}

save() {
  this.toast.success('Settings saved successfully!');
}`,
    angularCode: `import { Injectable, signal, Component } from '@angular/core';

export interface ToastMessage {
  id: string;
  type: 'default' | 'success' | 'destructive';
  title: string;
  description?: string;
}

/**
 * Signal-Based Toast Service
 * Reactive queue driven entirely by signal() without RxJS subjects or zone.js.
 */
@Injectable({ providedIn: 'root' })
export class UiToastService {
  // Pure Signal state
  readonly toasts = signal<ToastMessage[]>([]);

  show(title: string, options?: { type?: ToastMessage['type']; description?: string; duration?: number }): void {
    const id = Math.random().toString(36).substring(7);
    const newToast: ToastMessage = {
      id,
      title,
      type: options?.type || 'default',
      description: options?.description
    };

    this.toasts.update(list => [...list, newToast]);

    setTimeout(() => {
      this.dismiss(id);
    }, options?.duration || 3500);
  }

  success(title: string, description?: string): void {
    this.show(title, { type: 'success', description });
  }

  error(title: string, description?: string): void {
    this.show(title, { type: 'destructive', description });
  }

  dismiss(id: string): void {
    this.toasts.update(list => list.filter(t => t.id !== id));
  }
}

@Component({
  selector: 'ui-toaster',
  standalone: true,
  template: \`
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      @for (item of toastService.toasts(); track item.id) {
        <div 
          class="pointer-events-auto flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-100 shadow-2xl animate-in slide-in-from-bottom-2 duration-200"
          role="status"
        >
          <div>
            <h5 class="text-xs font-bold">{{ item.title }}</h5>
            @if (item.description) {
              <p class="text-[11px] text-zinc-400 mt-0.5">{{ item.description }}</p>
            }
          </div>
          <button (click)="toastService.dismiss(item.id)" class="text-zinc-500 hover:text-zinc-200 text-xs ml-3">✕</button>
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
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display',
    description: 'User avatar with reactive signal() image fallback state.',
    shadcnEquivalent: 'Avatar',
    inputs: [
      { name: 'src', type: 'input<string>', default: "''", description: 'Image URL' },
      { name: 'alt', type: 'input<string>', default: "''", description: 'Alternative description' },
      { name: 'fallback', type: 'input<string>', default: "'?'", description: 'Initials fallback' }
    ],
    outputs: [],
    accessibility: ['Accessible alt attributes'],
    consumerUsage: `<ui-avatar src="https://github.com/angular.png" fallback="NG" />`,
    angularCode: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  host: {
    class: 'relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-800'
  },
  template: \`
    @if (src() && !hasError()) {
      <img
        [src]="src()"
        [attr.alt]="alt()"
        (error)="hasError.set(true)"
        class="aspect-square h-full w-full object-cover"
      />
    } @else {
      <span class="flex h-full w-full items-center justify-center bg-zinc-900 font-bold text-xs text-zinc-400 select-none">
        {{ fallback() }}
      </span>
    }
  \`
})
export class UiAvatarComponent {
  readonly src = input<string>('');
  readonly alt = input<string>('');
  readonly fallback = input<string>('?');

  protected readonly hasError = signal<boolean>(false);
}`
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Form',
    description: 'Range input control bound to a two-way Signal model<number>().',
    shadcnEquivalent: 'Slider',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<number>()', default: '50', description: 'Numeric signal model' },
      { name: 'min', type: 'input<number>', default: '0', description: 'Minimum boundary' },
      { name: 'max', type: 'input<number>', default: '100', description: 'Maximum boundary' }
    ],
    outputs: [
      { name: 'valueChange', type: 'output<number>()', description: 'Emits on value change' }
    ],
    accessibility: ['role="slider" with aria-valuenow'],
    consumerUsage: `<ui-slider [(value)]="volumeLevel" [min]="0" [max]="100" />`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-slider',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiSliderComponent),
      multi: true
    }
  ],
  template: \`
    <div class="relative flex w-full touch-none select-none items-center">
      <input
        type="range"
        [min]="min()"
        [max]="max()"
        [value]="value()"
        (input)="onInput($event)"
        class="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-100 focus:outline-none"
      />
    </div>
  \`
})
export class UiSliderComponent implements ControlValueAccessor {
  readonly min = input<number>(0);
  readonly max = input<number>(100);
  readonly value = model<number>(50);

  private onChange: (val: number) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.value.set(val);
    this.onChange(val);
    this.onTouched();
  }

  writeValue(val: number): void {
    if (val !== undefined && val !== null) {
      this.value.set(val);
    }
  }

  registerOnChange(fn: (val: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}`
  },
  {
    id: 'separator',
    name: 'Separator',
    category: 'Layout & Structure',
    description: 'Horizontal or vertical line separator.',
    shadcnEquivalent: 'Separator',
    inputs: [
      { name: 'orientation', type: "input<'horizontal' | 'vertical'>", default: "'horizontal'", description: 'Separator axis' }
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
      ? 'shrink-0 bg-zinc-800 h-[1px] w-full block'
      : 'shrink-0 bg-zinc-800 h-full w-[1px] block';
  });
}`
  }
];
