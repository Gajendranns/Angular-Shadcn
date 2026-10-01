/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../../types/component';

export const FORM_COMPONENTS: ComponentDoc[] = [
  {
    id: 'button',
    name: 'Button',
    category: 'Form',
    description: 'Displays a button with multiple variants, sizes, and reactive loading state powered by Angular Signals.',
    shadcnEquivalent: 'Button',
    cdkPrimitive: '@angular/cdk/a11y (FocusMonitor)',
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    inputs: [
      { name: 'variant', type: "input<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>", default: "'default'", description: 'Visual style variant' },
      { name: 'size', type: "input<'default' | 'sm' | 'lg' | 'icon'>", default: "'default'", description: 'Button size dimensions' },
      { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Interactive state' },
      { name: 'loading', type: 'input<boolean>', default: 'false', description: 'Shows spinning indicator' },
      { name: 'type', type: "input<'button' | 'submit' | 'reset'>", default: "'button'", description: 'Native button type' },
    ],
    outputs: [
      { name: 'clicked', type: 'output<MouseEvent>()', description: 'Emits on button click' }
    ],
    accessibility: ['Native button element', 'Dynamic aria-disabled', 'Focus visible contrast outline'],
    consumerUsage: `<ui-button variant="default" (clicked)="handleSubmit()">
  Save Changes
</ui-button>
<ui-button variant="outline" size="sm">Cancel</ui-button>
<ui-button variant="destructive" [loading]="isDeleting()">Delete</ui-button>`,
    angularCode: `import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

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
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly clicked = output<MouseEvent>();

  protected readonly classes = computed(() => {
    const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants: Record<ButtonVariant, string> = {
      default: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-100 dark:text-zinc-900 shadow active:scale-[0.98]',
      destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm active:scale-[0.98]',
      outline: 'border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
      secondary: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700',
      ghost: 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      link: 'text-zinc-900 dark:text-zinc-100 underline-offset-4 hover:underline'
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
    description: 'Displays a form text field bound to two-way Signal model() for zoneless reactive state.',
    shadcnEquivalent: 'Input',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Two-way Signal model' },
      { name: 'type', type: 'input<string>', default: "'text'", description: 'Input type attribute' },
      { name: 'placeholder', type: 'input<string>', default: "''", description: 'Placeholder prompt' },
      { name: 'error', type: 'input<boolean>', default: 'false', description: 'Error state border trigger' }
    ],
    outputs: [
      { name: 'valueChange', type: 'output<string>()', description: 'Emits when value signal updates' }
    ],
    accessibility: ['aria-invalid', 'Works with native label for/id'],
    consumerUsage: `<ui-input [(value)]="email" placeholder="name@example.com" [error]="isInvalid()" />`,
    angularCode: `import { Component, input, model, forwardRef, computed } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    '[value]': 'value()',
    '(input)': 'handleInput($event)',
    '(blur)': 'onTouched()'
  },
  template: ''
})
export class UiInputComponent implements ControlValueAccessor {
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly error = input<boolean>(false);
  readonly value = model<string>('');

  protected onChange: (val: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected readonly classes = computed(() => {
    const base = 'flex h-9 w-full rounded-md border bg-white dark:bg-zinc-950 px-3 py-1 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50';
    const border = this.error() ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800';
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

  registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}`
  },
  {
    id: 'textarea',
    name: 'Textarea',
    category: 'Form',
    description: 'Displays an accessible multi-line text input field styled with Tailwind.',
    shadcnEquivalent: 'Textarea',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Two-way Signal model for text' },
      { name: 'rows', type: 'input<number>', default: '4', description: 'Visible text rows' },
      { name: 'placeholder', type: 'input<string>', default: "''", description: 'Placeholder label' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on text input' }],
    accessibility: ['Semantic textarea element', 'High contrast focus ring'],
    consumerUsage: `<ui-textarea [(value)]="bio" placeholder="Type your bio here..." [rows]="4" />`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-textarea, textarea[ui-textarea]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiTextareaComponent),
      multi: true
    }
  ],
  host: {
    class: 'flex min-h-[80px] w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
    '[attr.rows]': 'rows()',
    '[attr.placeholder]': 'placeholder()',
    '[value]': 'value()',
    '(input)': 'handleInput($event)',
    '(blur)': 'onTouched()'
  },
  template: ''
})
export class UiTextareaComponent implements ControlValueAccessor {
  readonly rows = input<number>(4);
  readonly placeholder = input<string>('');
  readonly value = model<string>('');

  private onChange: (val: string) => void = () => {};
  private onTouched: () => void = () => {};

  handleInput(event: Event): void {
    const val = (event.target as HTMLTextAreaElement).value;
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void { this.value.set(val || ''); }
  registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}`
  },
  {
    id: 'label',
    name: 'Label',
    category: 'Form',
    description: 'Renders an accessible label associated with form controls.',
    shadcnEquivalent: 'Label',
    inputs: [
      { name: 'forId', type: 'input<string>', default: "''", description: 'Target control ID' }
    ],
    outputs: [],
    accessibility: ['Standard HTML <label> semantic connection'],
    consumerUsage: `<ui-label forId="email">Your email address</ui-label>`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-label, label[ui-label]',
  standalone: true,
  host: {
    '[attr.for]': 'forId()',
    class: 'text-xs font-semibold text-zinc-800 dark:text-zinc-200 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none block mb-1.5'
  },
  template: '<ng-content></ng-content>'
})
export class UiLabelComponent {
  readonly forId = input<string>('');
}`
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    category: 'Form',
    description: 'A control that allows the user to toggle between checked and unchecked states.',
    shadcnEquivalent: 'Checkbox',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'checked', type: 'model<boolean>()', default: 'false', description: 'Signal model for checked state' },
      { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Disabled state' }
    ],
    outputs: [{ name: 'checkedChange', type: 'output<boolean>()', description: 'Emits on state toggle' }],
    accessibility: ['role="checkbox"', 'aria-checked reactive sync', 'Space key toggle'],
    consumerUsage: `<ui-checkbox [(checked)]="acceptTerms">Accept terms and conditions</ui-checkbox>`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UiCheckboxComponent),
      multi: true
    }
  ],
  template: \`
    <button
      type="button"
      role="checkbox"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      (click)="toggle()"
      class="peer h-4 w-4 shrink-0 rounded-sm border border-zinc-300 dark:border-zinc-700 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center transition-colors"
      [class.bg-zinc-900]="checked()"
      [class.text-white]="checked()"
      [class.dark:bg-zinc-100]="checked()"
      [class.dark:text-zinc-900]="checked()"
    >
      @if (checked()) {
        <svg class="h-3 w-3 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      }
    </button>
  \`
})
export class UiCheckboxComponent implements ControlValueAccessor {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(): void {
    if (this.disabled()) return;
    this.checked.update(v => !v);
    this.onChange(this.checked());
    this.onTouched();
  }

  writeValue(val: boolean): void { this.checked.set(!!val); }
  registerOnChange(fn: (val: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}`
  },
  {
    id: 'switch',
    name: 'Switch',
    category: 'Form',
    description: 'An accessible toggle switch control driven by Signal model().',
    shadcnEquivalent: 'Switch',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'checked', type: 'model<boolean>()', default: 'false', description: 'Signal model for toggle' },
      { name: 'disabled', type: 'input<boolean>', default: 'false', description: 'Disables interaction' }
    ],
    outputs: [{ name: 'checkedChange', type: 'output<boolean>()', description: 'Emits boolean state' }],
    accessibility: ['role="switch"', 'aria-checked reactive sync', 'Keyboard activation'],
    consumerUsage: `<ui-switch [(checked)]="notificationsEnabled" />`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
      [disabled]="disabled()"
      (click)="toggle()"
      class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      [class.bg-zinc-900]="checked()"
      [class.dark:bg-zinc-100]="checked()"
      [class.bg-zinc-200]="!checked()"
      [class.dark:bg-zinc-800]="!checked()"
    >
      <span
        class="pointer-events-none block h-4 w-4 rounded-full shadow-lg ring-0 transition-transform bg-white dark:bg-zinc-950"
        [class.translate-x-4]="checked()"
        [class.translate-x-0]="!checked()"
      ></span>
    </button>
  \`
})
export class UiSwitchComponent implements ControlValueAccessor {
  readonly checked = model<boolean>(false);
  readonly disabled = input<boolean>(false);

  private onChange: (val: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  toggle(): void {
    if (this.disabled()) return;
    this.checked.update(v => !v);
    this.onChange(this.checked());
    this.onTouched();
  }

  writeValue(val: boolean): void { this.checked.set(!!val); }
  registerOnChange(fn: (val: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}`
  },
  {
    id: 'slider',
    name: 'Slider',
    category: 'Form',
    description: 'An interactive range slider input bound to Signal model<number>().',
    shadcnEquivalent: 'Slider',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<number>()', default: '50', description: 'Current numeric value' },
      { name: 'min', type: 'input<number>', default: '0', description: 'Minimum allowed value' },
      { name: 'max', type: 'input<number>', default: '100', description: 'Maximum allowed value' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<number>()', description: 'Emits on value change' }],
    accessibility: ['role="slider"', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax'],
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
        class="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-zinc-900 dark:accent-zinc-100 focus:outline-none"
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

  writeValue(val: number): void { if (val != null) this.value.set(val); }
  registerOnChange(fn: (val: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}`
  },
  {
    id: 'select',
    name: 'Select',
    category: 'Form',
    description: 'Displays a list of options for the user to pick from, triggered by an accessible button.',
    shadcnEquivalent: 'Select',
    cdkPrimitive: '@angular/cdk/overlay',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Selected option value' },
      { name: 'placeholder', type: 'input<string>', default: "'Select an option'", description: 'Placeholder' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on option pick' }],
    accessibility: ['WAI-ARIA listbox and option roles', 'Keyboard arrow navigation'],
    consumerUsage: `<ui-select [(value)]="selectedRole" placeholder="Select role...">
  <ui-option value="admin">Administrator</ui-option>
  <ui-option value="user">Standard User</ui-option>
</ui-select>`,
    angularCode: `import { Component, input, model, signal, HostListener } from '@angular/core';

@Component({
  selector: 'ui-select',
  standalone: true,
  template: \`
    <div class="relative w-full">
      <button
        type="button"
        (click)="open.update(v => !v)"
        class="flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 shadow-sm focus:outline-none focus:ring-1 focus:ring-zinc-400"
      >
        <span>{{ value() || placeholder() }}</span>
        <svg class="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      @if (open()) {
        <div class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 text-zinc-900 dark:text-zinc-100 shadow-md">
          <ng-content></ng-content>
        </div>
      }
    </div>
  \`
})
export class UiSelectComponent {
  readonly value = model<string>('');
  readonly placeholder = input<string>('Select an option');
  readonly open = signal<boolean>(false);

  select(val: string): void {
    this.value.set(val);
    this.open.set(false);
  }
}`
  },
  {
    id: 'radio-group',
    name: 'Radio Group',
    category: 'Form',
    description: 'A set of checkable radio buttons where only one may be checked at a time.',
    shadcnEquivalent: 'Radio Group',
    cdkPrimitive: '@angular/forms (ControlValueAccessor)',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Active selected radio option' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on radio choice' }],
    accessibility: ['role="radiogroup" and role="radio"', 'Arrow key roving selection'],
    consumerUsage: `<ui-radio-group [(value)]="plan">
  <ui-radio-item value="free">Free Starter</ui-radio-item>
  <ui-radio-item value="pro">Pro Plan</ui-radio-item>
</ui-radio-group>`,
    angularCode: `import { Component, input, model, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => UiRadioGroupComponent), multi: true }],
  template: '<div class="grid gap-2" role="radiogroup"><ng-content></ng-content></div>'
})
export class UiRadioGroupComponent implements ControlValueAccessor {
  readonly value = model<string>('');
  private onChange: (val: string) => void = () => {};

  select(val: string): void {
    this.value.set(val);
    this.onChange(val);
  }

  writeValue(val: string): void { this.value.set(val || ''); }
  registerOnChange(fn: (val: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void {}
}`
  },
  {
    id: 'input-otp',
    name: 'Input OTP',
    category: 'Form',
    description: 'Accessible one-time password pin input with individual segmented digit slots.',
    shadcnEquivalent: 'Input OTP',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Current multi-digit OTP string' },
      { name: 'length', type: 'input<number>', default: '6', description: 'Total number of OTP slots' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on digit changes' }],
    accessibility: ['Accessible aria-label and numerical key enforcement'],
    consumerUsage: `<ui-input-otp [(value)]="pinCode" [length]="6" />`,
    angularCode: `import { Component, input, model, computed } from '@angular/core';

@Component({
  selector: 'ui-input-otp',
  standalone: true,
  template: \`
    <div class="flex items-center gap-2">
      @for (slot of slots(); track $index) {
        <div class="flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm">
          {{ slot }}
        </div>
      }
    </div>
  \`
})
export class UiInputOtpComponent {
  readonly value = model<string>('');
  readonly length = input<number>(6);

  protected readonly slots = computed(() => {
    const chars = this.value().split('');
    return Array.from({ length: this.length() }, (_, i) => chars[i] || '');
  });
}`
  },
  {
    id: 'combobox',
    name: 'Combobox / Command',
    category: 'Form',
    description: 'Autocomplete search input and listbox combo with real-time reactive filtering.',
    shadcnEquivalent: 'Combobox',
    cdkPrimitive: '@angular/cdk/overlay, @angular/cdk/a11y',
    inputs: [
      { name: 'value', type: 'model<string>()', default: "''", description: 'Selected value' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string>()', description: 'Emits on item pick' }],
    accessibility: ['role="combobox"', 'aria-expanded and aria-autocomplete'],
    consumerUsage: `<ui-combobox [(value)]="selectedFramework" [items]="frameworks" />`,
    angularCode: `import { Component, input, model, signal, computed } from '@angular/core';

@Component({
  selector: 'ui-combobox',
  standalone: true,
  template: \`
    <div class="relative w-full max-w-xs">
      <input
        type="text"
        [value]="value()"
        (input)="filter.set($any($event.target).value)"
        (focus)="open.set(true)"
        placeholder="Search framework..."
        class="h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-400"
      />
      @if (open()) {
        <div class="absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1 shadow-lg">
          @for (item of filteredItems(); track item) {
            <button
              type="button"
              (click)="selectItem(item)"
              class="w-full text-left px-2 py-1.5 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200"
            >
              {{ item }}
            </button>
          }
        </div>
      }
    </div>
  \`
})
export class UiComboboxComponent {
  readonly items = input<string[]>(['Angular', 'Next.js', 'Vite', 'Svelte', 'Astro']);
  readonly value = model<string>('');
  readonly filter = signal<string>('');
  readonly open = signal<boolean>(false);

  protected readonly filteredItems = computed(() => {
    const q = this.filter().toLowerCase();
    return this.items().filter(i => i.toLowerCase().includes(q));
  });

  selectItem(item: string): void {
    this.value.set(item);
    this.open.set(false);
  }
}`
  },
  {
    id: 'toggle',
    name: 'Toggle',
    category: 'Form',
    description: 'A two-state button that can be either on or off, modeled on WAI-ARIA pressed button.',
    shadcnEquivalent: 'Toggle',
    inputs: [
      { name: 'pressed', type: 'model<boolean>()', default: 'false', description: 'Signal model for pressed' }
    ],
    outputs: [{ name: 'pressedChange', type: 'output<boolean>()', description: 'Emits on toggle' }],
    accessibility: ['aria-pressed dynamic sync'],
    consumerUsage: `<ui-toggle [(pressed)]="isBold">B</ui-toggle>`,
    angularCode: `import { Component, model } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  host: {
    'role': 'button',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'classes()',
    '(click)': 'toggle()'
  },
  template: '<ng-content></ng-content>'
})
export class UiToggleComponent {
  readonly pressed = model<boolean>(false);

  toggle(): void {
    this.pressed.update(v => !v);
  }

  classes(): string {
    const base = 'inline-flex items-center justify-center rounded-md text-xs font-semibold h-9 px-3 transition-colors cursor-pointer select-none border border-zinc-200 dark:border-zinc-800';
    return this.pressed()
      ? \`\${base} bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900\`
      : \`\${base} bg-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900\`;
  }
}`
  },
  {
    id: 'toggle-group',
    name: 'Toggle Group',
    category: 'Form',
    description: 'A set of two-state buttons that can be toggled on or off, single or multiple selection, driven by a Signal model().',
    shadcnEquivalent: 'Toggle Group',
    inputs: [
      { name: 'type', type: "input<'single' | 'multiple'>", default: "'single'", description: 'Selection mode' },
      { name: 'value', type: "model<string | string[]>()", default: "''", description: 'Active selection Signal model' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<string | string[]>()', description: 'Emits on selection change' }],
    accessibility: ['role="group"', 'aria-pressed on toggles', 'Arrow key navigation support'],
    consumerUsage: `<ui-toggle-group type="single" [(value)]="alignment">
  <ui-toggle-item value="left">Left</ui-toggle-item>
  <ui-toggle-item value="center">Center</ui-toggle-item>
  <ui-toggle-item value="right">Right</ui-toggle-item>
</ui-toggle-group>`,
    angularCode: `import { Component, input, model, output } from '@angular/core';

@Component({
  selector: 'ui-toggle-group',
  standalone: true,
  host: {
    'role': 'group',
    'class': 'inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent p-1 gap-1'
  },
  template: '<ng-content></ng-content>'
})
export class UiToggleGroupComponent {
  readonly type = input<'single' | 'multiple'>('single');
  readonly value = model<string | string[]>('');
  readonly valueChange = output<string | string[]>();

  toggle(itemValue: string): void {
    if (this.type() === 'single') {
      const newVal = this.value() === itemValue ? '' : itemValue;
      this.value.set(newVal);
      this.valueChange.emit(newVal);
    } else {
      const current = Array.isArray(this.value()) ? [...(this.value() as string[])] : [];
      const index = current.indexOf(itemValue);
      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(itemValue);
      }
      this.value.set(current);
      this.valueChange.emit(current);
    }
  }
}

@Component({
  selector: 'ui-toggle-item',
  standalone: true,
  host: {
    'role': 'button',
    '[attr.aria-pressed]': 'isPressed()',
    '[class]': 'classes()',
    '(click)': 'handleClick()'
  },
  template: '<ng-content></ng-content>'
})
export class UiToggleItemComponent {
  readonly value = input.required<string>();

  constructor(private group: UiToggleGroupComponent) {}

  protected isPressed(): boolean {
    const groupVal = this.group.value();
    return Array.isArray(groupVal) ? groupVal.includes(this.value()) : groupVal === this.value();
  }

  protected classes(): string {
    const base = 'inline-flex items-center justify-center rounded px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ';
    return base + (this.isPressed()
      ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
      : 'text-zinc-700 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800');
  }

  protected handleClick(): void {
    this.group.toggle(this.value());
  }
}`
  },
  {
    id: 'form',
    name: 'Form & FormField',
    category: 'Form',
    description: 'Accessible form layout and field wrapper with labels, descriptions, and dynamic Signal-based error state management.',
    shadcnEquivalent: 'Form',
    inputs: [
      { name: 'error', type: 'input<string | null>()', default: 'null', description: 'Error message text from Signal' }
    ],
    outputs: [],
    accessibility: ['aria-describedby for errors and hints', 'aria-invalid when error present'],
    consumerUsage: `<ui-form-field [error]="emailError()">
  <ui-label>Work Email</ui-label>
  <ui-input [(value)]="email" placeholder="alex@company.com" />
  <ui-form-description>We will send account recovery notices here.</ui-form-description>
  <ui-form-message />
</ui-form-field>`,
    angularCode: `import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'ui-form-field',
  standalone: true,
  host: { class: 'space-y-1.5 block' },
  template: '<ng-content></ng-content>'
})
export class UiFormFieldComponent {
  readonly error = input<string | null>(null);
  readonly hasError = computed(() => !!this.error());
}

@Component({
  selector: 'ui-form-description',
  standalone: true,
  host: { class: 'text-[11px] text-zinc-500 dark:text-zinc-400 block' },
  template: '<ng-content></ng-content>'
})
export class UiFormDescriptionComponent {}

@Component({
  selector: 'ui-form-message',
  standalone: true,
  template: \`
    @if (field.error()) {
      <p class="text-[11px] font-medium text-red-600 dark:text-red-400 flex items-center gap-1 animate-in fade-in">
        <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        <span>{{ field.error() }}</span>
      </p>
    }
  \`
})
export class UiFormMessageComponent {
  constructor(public field: UiFormFieldComponent) {}
}`
  },
  {
    id: 'file-dropzone',
    name: 'File Dropzone',
    category: 'Form',
    description: 'Drag-and-drop file upload container with reactive upload status Signal. (Exclusive high-value addition)',
    shadcnEquivalent: 'File Upload (Bonus)',
    inputs: [
      { name: 'multiple', type: 'input<boolean>', default: 'true', description: 'Allow multiple files' }
    ],
    outputs: [{ name: 'filesSelected', type: 'output<File[]>()', description: 'Emits dropped files' }],
    accessibility: ['Dragover keyboard focus', 'Accessible file input trigger'],
    consumerUsage: `<ui-file-dropzone (filesSelected)="handleFiles($event)" />`,
    angularCode: `import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ui-file-dropzone',
  standalone: true,
  template: \`
    <div
      (dragover)="onDragOver($event)"
      (dragleave)="isDragging.set(false)"
      (drop)="onDrop($event)"
      class="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 transition-colors cursor-pointer"
      [class.border-indigo-500]="isDragging()"
      [class.border-zinc-300]="!isDragging()"
      [class.dark:border-zinc-700]="!isDragging()"
    >
      <svg class="h-8 w-8 text-zinc-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <p class="text-xs font-semibold text-zinc-800 dark:text-zinc-200">Drag & drop files here, or click to browse</p>
      <span class="text-[11px] text-zinc-400 mt-1">PNG, JPG, PDF up to 10MB</span>
    </div>
  \`
})
export class UiFileDropzoneComponent {
  readonly multiple = input<boolean>(true);
  readonly filesSelected = output<File[]>();
  readonly isDragging = signal<boolean>(false);

  onDragOver(e: DragEvent): void { e.preventDefault(); this.isDragging.set(true); }
  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(false);
    if (e.dataTransfer?.files) {
      this.filesSelected.emit(Array.from(e.dataTransfer.files));
    }
  }
}`
  }
];
