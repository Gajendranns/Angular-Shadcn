/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../../types/component';

export const DATA_DISPLAY_COMPONENTS: ComponentDoc[] = [
  {
    id: 'badge',
    name: 'Badge',
    category: 'Data Display',
    description: 'Displays a small badge or tag with color variants driven by a computed Signal.',
    shadcnEquivalent: 'Badge',
    variants: ['default', 'secondary', 'destructive', 'outline'],
    inputs: [
      { name: 'variant', type: "input<'default' | 'secondary' | 'destructive' | 'outline'>", default: "'default'", description: 'Color scheme' }
    ],
    outputs: [],
    accessibility: ['Standard text contrast'],
    consumerUsage: `<ui-badge variant="default">Active</ui-badge>`,
    angularCode: `import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'ui-badge',
  standalone: true,
  host: { '[class]': 'classes()' },
  template: '<ng-content></ng-content>'
})
export class UiBadgeComponent {
  readonly variant = input<'default' | 'secondary' | 'destructive' | 'outline'>('default');

  protected readonly classes = computed(() => {
    const base = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors';
    const variants: Record<string, string> = {
      default: 'border-transparent bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950',
      secondary: 'border-transparent bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
      destructive: 'border-transparent bg-red-600 text-white',
      outline: 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
    };
    return \`\${base} \${variants[this.variant()]}\`;
  });
}`
  },
  {
    id: 'avatar',
    name: 'Avatar',
    category: 'Data Display',
    description: 'User avatar with reactive fallback initials when image fails or loads.',
    shadcnEquivalent: 'Avatar',
    inputs: [
      { name: 'src', type: 'input<string>', default: "''", description: 'Image URL' },
      { name: 'fallback', type: 'input<string>', default: "'?'", description: 'Initials' }
    ],
    outputs: [],
    accessibility: ['alt text for image'],
    consumerUsage: `<ui-avatar src="https://github.com/angular.png" fallback="NG" />`,
    angularCode: `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  standalone: true,
  host: { class: 'relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800' },
  template: \`
    @if (src() && !hasError()) {
      <img [src]="src()" (error)="hasError.set(true)" class="aspect-square h-full w-full object-cover" />
    } @else {
      <span class="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-900 font-bold text-xs text-zinc-600 dark:text-zinc-400 select-none">
        {{ fallback() }}
      </span>
    }
  \`
})
export class UiAvatarComponent {
  readonly src = input<string>('');
  readonly fallback = input<string>('?');
  protected readonly hasError = signal<boolean>(false);
}`
  },
  {
    id: 'progress',
    name: 'Progress',
    category: 'Data Display',
    description: 'Displays an indicator showing the completion percentage of a task.',
    shadcnEquivalent: 'Progress',
    inputs: [
      { name: 'value', type: 'input<number>', default: '0', description: 'Percentage completed (0-100)' }
    ],
    outputs: [],
    accessibility: ['role="progressbar"', 'aria-valuenow', 'aria-valuemin="0"', 'aria-valuemax="100"'],
    consumerUsage: `<ui-progress [value]="progressPct()" />`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-progress',
  standalone: true,
  template: \`
    <div 
      class="relative h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
      role="progressbar"
      [attr.aria-valuenow]="value()"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div 
        class="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300"
        [style.width.%]="value()"
      ></div>
    </div>
  \`
})
export class UiProgressComponent {
  readonly value = input<number>(0);
}`
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    category: 'Data Display',
    description: 'Use to show a placeholder while content is loading with smooth pulse animation.',
    shadcnEquivalent: 'Skeleton',
    inputs: [
      { name: 'className', type: 'input<string>', default: "''", description: 'Tailwind dimension classes' }
    ],
    outputs: [],
    accessibility: ['aria-hidden="true" to keep screen reader noise minimal'],
    consumerUsage: `<ui-skeleton className="h-4 w-48 rounded" />`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  standalone: true,
  host: {
    'aria-hidden': 'true',
    class: 'animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 block'
  },
  template: ''
})
export class UiSkeletonComponent {}`
  },
  {
    id: 'table',
    name: 'Table',
    category: 'Data Display',
    description: 'A responsive container for tabular data with clean border styling.',
    shadcnEquivalent: 'Table',
    inputs: [],
    outputs: [],
    accessibility: ['Native <table> with <thead> and <tbody>'],
    consumerUsage: `<ui-table>
  <thead><tr><th>Name</th><th>Email</th></tr></thead>
  <tbody><tr><td>John</td><td>john@example.com</td></tr></tbody>
</ui-table>`,
    angularCode: `import { Component } from '@angular/core';

@Component({
  selector: 'ui-table',
  standalone: true,
  template: \`
    <div class="relative w-full overflow-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table class="w-full caption-bottom text-xs text-left">
        <ng-content></ng-content>
      </table>
    </div>
  \`
})
export class UiTableComponent {}`
  },
  {
    id: 'data-table',
    name: 'Data Table',
    category: 'Data Display',
    description: 'Powerful data table with reactive sorting and filtering powered by Signals.',
    shadcnEquivalent: 'Data Table',
    inputs: [
      { name: 'data', type: 'input<any[]>', default: '[]', description: 'Table rows array' }
    ],
    outputs: [],
    accessibility: ['Sortable header button ARIA states'],
    consumerUsage: `<ui-data-table [data]="users()" />`,
    angularCode: `import { Component, input, signal, computed } from '@angular/core';

@Component({
  selector: 'ui-data-table',
  standalone: true,
  template: \`
    <div class="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <table class="w-full text-xs text-left">
        <thead class="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500 font-semibold">
          <tr>
            <th class="p-3 cursor-pointer" (click)="toggleSort()">Name ⇅</th>
            <th class="p-3">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800">
          @for (row of sortedData(); track row.id) {
            <tr class="hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
              <td class="p-3 font-medium text-zinc-900 dark:text-zinc-100">{{ row.name }}</td>
              <td class="p-3 text-zinc-500">{{ row.status }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  \`
})
export class UiDataTableComponent {
  readonly data = input<Array<{ id: string; name: string; status: string }>>([
    { id: '1', name: 'Angular Project', status: 'Active' },
    { id: '2', name: 'Lumina UI Kit', status: 'Deployed' }
  ]);
  readonly sortAsc = signal<boolean>(true);

  protected readonly sortedData = computed(() => {
    return [...this.data()].sort((a, b) => 
      this.sortAsc() ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  });

  toggleSort(): void { this.sortAsc.update(v => !v); }
}`
  },
  {
    id: 'calendar',
    name: 'Calendar',
    category: 'Data Display',
    description: 'A date field component that allows users to select a single date, multiple dates, or ranges.',
    shadcnEquivalent: 'Calendar',
    inputs: [
      { name: 'selectedDate', type: 'model<Date>()', default: 'new Date()', description: 'Selected date' }
    ],
    outputs: [{ name: 'selectedDateChange', type: 'output<Date>()', description: 'Emits on date select' }],
    accessibility: ['WAI-ARIA grid calendar pattern', 'Keyboard arrow navigation'],
    consumerUsage: `<ui-calendar [(selectedDate)]="bookingDate" />`,
    angularCode: `import { Component, model } from '@angular/core';

@Component({
  selector: 'ui-calendar',
  standalone: true,
  template: \`
    <div class="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg max-w-[280px] bg-white dark:bg-zinc-950 text-xs text-zinc-900 dark:text-zinc-100">
      <div class="flex items-center justify-between pb-2 font-semibold">
        <span>September 2026</span>
        <div class="flex gap-1 text-zinc-400">
          <button class="px-1.5 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">‹</button>
          <button class="px-1.5 py-0.5 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">›</button>
        </div>
      </div>
      <div class="grid grid-cols-7 gap-1 text-center font-mono text-[11px] pt-1">
        <span class="text-zinc-400">Su</span><span class="text-zinc-400">Mo</span><span class="text-zinc-400">Tu</span><span class="text-zinc-400">We</span><span class="text-zinc-400">Th</span><span class="text-zinc-400">Fr</span><span class="text-zinc-400">Sa</span>
        @for (day of days; track day) {
          <button class="h-7 w-7 rounded-md flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
            {{ day }}
          </button>
        }
      </div>
    </div>
  \`
})
export class UiCalendarComponent {
  readonly selectedDate = model<Date>(new Date());
  readonly days = Array.from({ length: 30 }, (_, i) => i + 1);
}`
  },
  {
    id: 'date-picker',
    name: 'Date Picker',
    category: 'Data Display',
    description: 'A popover date input component combining an input button trigger with an interactive calendar popover.',
    shadcnEquivalent: 'Date Picker',
    inputs: [
      { name: 'date', type: 'model<Date | null>()', default: 'null', description: 'Selected date Signal model' },
      { name: 'placeholder', type: 'input<string>', default: "'Pick a date'", description: 'Placeholder label' }
    ],
    outputs: [{ name: 'dateChange', type: 'output<Date | null>()', description: 'Emits on date select' }],
    accessibility: ['role="combobox"', 'aria-expanded', 'Keyboard navigation in calendar'],
    consumerUsage: `<ui-date-picker [(date)]="selectedDate" placeholder="Pick an appointment" />`,
    angularCode: `import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'ui-date-picker',
  standalone: true,
  imports: [CommonModule, DatePipe],
  template: \`
    <div class="relative inline-block w-full max-w-xs">
      <button
        type="button"
        (click)="isOpen.set(!isOpen())"
        class="flex h-9 w-full items-center justify-between rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-900"
      >
        <span [class.text-zinc-400]="!date()">
          {{ date() ? (date() | date:'mediumDate') : placeholder() }}
        </span>
        <svg class="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      @if (isOpen()) {
        <div class="fixed inset-0 z-40" (click)="isOpen.set(false)"></div>
        <div class="absolute left-0 top-full z-50 mt-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-3 shadow-xl text-xs animate-in zoom-in-95">
          <div class="flex items-center justify-between mb-2">
            <span class="font-bold text-xs text-zinc-900 dark:text-zinc-100">October 2026</span>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center font-mono">
            @for (day of days; track day) {
              <button
                (click)="selectDay(day)"
                class="h-7 w-7 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-[11px] text-zinc-900 dark:text-zinc-100"
              >
                {{ day }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  \`
})
export class UiDatePickerComponent {
  readonly date = model<Date | null>(new Date());
  readonly placeholder = input<string>('Pick a date');
  readonly dateChange = output<Date | null>();

  readonly isOpen = signal<boolean>(false);
  readonly days = Array.from({ length: 31 }, (_, i) => i + 1);

  selectDay(day: number): void {
    const d = new Date(2026, 9, day);
    this.date.set(d);
    this.dateChange.emit(d);
    this.isOpen.set(false);
  }
}`
  },
  {
    id: 'carousel',
    name: 'Carousel',
    category: 'Data Display',
    description: 'A fluid, touch-friendly image and card carousel with customizable smoothness timing (ms), spring easing curve, up to maximum 6 slides, configurable slides-to-scroll per click, and Signals.',
    shadcnEquivalent: 'Carousel (Embla)',
    inputs: [
      { name: 'activeIndex', type: 'model<number>()', default: '0', description: 'Active slide index Signal model' },
      { name: 'totalSlides', type: 'input<number>()', default: '6', description: 'Total number of items in carousel (up to maximum 6 slides)' },
      { name: 'timingMs', type: 'input<number>()', default: '650', description: 'Timing duration of the smoothness animation in milliseconds' },
      { name: 'easing', type: 'input<string>()', default: "'cubic-bezier(0.16, 1, 0.3, 1)'", description: 'CSS animation curve for deceleration smoothness' },
      { name: 'slidesToScroll', type: 'input<number>()', default: '1', description: 'Number of slides to scroll per next/prev click' },
      { name: 'slidesPerView', type: 'input<number>()', default: '1', description: 'Number of visible slides simultaneously (can show 1 to 6 cards based on available slides)' },
      { name: 'loop', type: 'input<boolean>()', default: 'true', description: 'Enable continuous circular scrolling' }
    ],
    outputs: [{ name: 'slideChange', type: 'output<number>()', description: 'Emits on slide transition with target index' }],
    accessibility: ['role="region"', 'aria-roledescription="carousel"', 'Keyboard left/right arrow controls', 'aria-live="polite"'],
    consumerUsage: `<ui-carousel 
  [(activeIndex)]="currentSlide" 
  [totalSlides]="6"
  [timingMs]="650"
  [slidesToScroll]="2" 
  [slidesPerView]="3" 
  [loop]="true"
>
  <!-- Users can provide up to 6 slides and show 1 to 6 cards simultaneously -->
  <ui-carousel-slide *ngFor="let item of items.slice(0, 6)" [slidesPerView]="3">
    <ui-card class="p-6 text-center">{{ item.title }}</ui-card>
  </ui-carousel-slide>
</ui-carousel>`,
    angularCode: `import { Component, input, model, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-carousel',
  standalone: true,
  imports: [CommonModule],
  host: {
    'role': 'region',
    'aria-roledescription': 'carousel',
    'class': 'relative w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-950 p-6 shadow-xs block'
  },
  template: \`
    <!-- Main Carousel Track Container with Left & Right Navigation Buttons (Borderless) -->
    <div class="relative flex items-center gap-3 sm:gap-4 w-full">
      <!-- Left (Previous) Slide Button - Hidden when all cards visible -->
      @if (canScroll()) {
        <button
          type="button"
          (click)="prev()"
          [disabled]="!loop() && isAtStart()"
          class="shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 shadow-md transition-all active:scale-90 hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Previous slide"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      }

      <!-- Center Viewport Track with Configurable Smoothness Timing -->
      <div class="flex-1 overflow-hidden rounded-xl">
        <div 
          class="flex"
          [style.transform]="trackTransform()"
          [style.transition]="'transform ' + timingMs() + 'ms ' + easing()"
          [style.will-change]="'transform'"
        >
          <ng-content></ng-content>
        </div>
      </div>

      <!-- Right (Next) Slide Button - Hidden when all cards visible -->
      @if (canScroll()) {
        <button
          type="button"
          (click)="next()"
          [disabled]="!loop() && isAtEnd()"
          class="shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 flex items-center justify-center hover:bg-white dark:hover:bg-zinc-800 shadow-md transition-all active:scale-90 hover:scale-105 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
          aria-label="Next slide"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      }
    </div>

    <!-- Bottom Status & Pagination Indicators (Borderless) -->
    <div class="flex items-center justify-between pt-3 mt-2 text-xs">
      <span class="text-[11px] font-mono text-zinc-400">
        @if (canScroll()) {
          Slide {{ activeIndex() + 1 }} / {{ totalSlides() }} (Max 6)
        } @else {
          All {{ totalSlides() }} cards visible in viewport (Sliders hidden)
        }
      </span>

      <!-- Pagination Indicators -->
      @if (canScroll()) {
        <div class="flex items-center gap-1.5">
          @for (dot of paginationDots(); track $index) {
            <button
              type="button"
              (click)="goToSlide($index * slidesToScroll())"
              class="h-1.5 rounded-full transition-all duration-300"
              [class.w-5]="isActiveDot($index)"
              [class.w-1.5]="!isActiveDot($index)"
              [class.bg-zinc-900]="isActiveDot($index)"
              [class.dark:bg-zinc-100]="isActiveDot($index)"
              [class.bg-zinc-300]="!isActiveDot($index)"
              [class.dark:bg-zinc-700]="!isActiveDot($index)"
              [attr.aria-label]="'Go to slide ' + ($index + 1)"
            ></button>
          }
        </div>
      }

      <span class="text-[11px] font-mono text-zinc-400">
        Timing: {{ timingMs() }}ms
      </span>
    </div>
  \`
})
export class UiCarouselComponent {
  readonly activeIndex = model<number>(0);
  readonly totalSlides = input<number>(6); // Maximum 6 slides
  readonly timingMs = input<number>(650); // Timing of smoothness in ms
  readonly easing = input<string>('cubic-bezier(0.16, 1, 0.3, 1)'); // Deceleration curve
  readonly slidesToScroll = input<number>(1);
  readonly slidesPerView = input<number>(1);
  readonly loop = input<boolean>(true);
  readonly slideChange = output<number>();

  protected readonly effectivePerView = computed(() => {
    const total = Math.min(6, Math.max(1, this.totalSlides()));
    return Math.min(total, Math.max(1, this.slidesPerView()));
  });

  protected readonly canScroll = computed(() => {
    return Math.min(6, this.totalSlides()) > this.effectivePerView();
  });

  protected readonly maxIndex = computed(() => {
    const total = Math.min(6, Math.max(1, this.totalSlides()));
    return Math.max(0, total - this.effectivePerView());
  });

  protected readonly isAtStart = computed(() => this.activeIndex() <= 0);
  protected readonly isAtEnd = computed(() => this.activeIndex() >= this.maxIndex());

  protected readonly trackTransform = computed(() => {
    const itemWidthPercent = 100 / this.effectivePerView();
    const offset = this.activeIndex() * itemWidthPercent;
    return \`translateX(-\${offset}%)\`;
  });

  protected readonly paginationDots = computed(() => {
    const total = Math.min(6, this.totalSlides());
    const pages = Math.ceil(total / this.slidesToScroll());
    return Array.from({ length: pages });
  });

  protected isActiveDot(pageIndex: number): boolean {
    const current = this.activeIndex();
    const step = this.slidesToScroll();
    return Math.floor(current / step) === pageIndex;
  }

  prev(): void {
    const step = this.slidesToScroll();
    let nextIdx = this.activeIndex() - step;
    if (nextIdx < 0) {
      nextIdx = this.loop() ? this.maxIndex() : 0;
    }
    this.goToSlide(nextIdx);
  }

  next(): void {
    const step = this.slidesToScroll();
    let nextIdx = this.activeIndex() + step;
    if (nextIdx > this.maxIndex()) {
      nextIdx = this.loop() ? 0 : this.maxIndex();
    }
    this.goToSlide(nextIdx);
  }

  goToSlide(index: number): void {
    const clamped = Math.max(0, Math.min(index, this.maxIndex()));
    this.activeIndex.set(clamped);
    this.slideChange.emit(clamped);
  }
}

@Component({
  selector: 'ui-carousel-slide',
  standalone: true,
  host: {
    'role': 'group',
    'aria-roledescription': 'slide',
    '[style.flex]': 'slideFlex()',
    'class': 'min-w-0 shrink-0 px-2 box-border block'
  },
  template: '<ng-content></ng-content>'
})
export class UiCarouselSlideComponent {
  readonly slidesPerView = input<number>(1);
  protected readonly slideFlex = computed(() => \`0 0 \${100 / this.slidesPerView()}%\`);
}`
  },
  {
    id: 'rating',
    name: 'Rating',
    category: 'Data Display',
    description: 'An interactive 5-star rating component with hover preview, keyboard controls, and Signal model() state.',
    shadcnEquivalent: 'Rating (Bonus)',
    inputs: [
      { name: 'value', type: 'model<number>()', default: '4', description: 'Active star rating Signal model' },
      { name: 'max', type: 'input<number>', default: '5', description: 'Max stars count' },
      { name: 'readonly', type: 'input<boolean>', default: 'false', description: 'Disable rating interactions' }
    ],
    outputs: [{ name: 'valueChange', type: 'output<number>()', description: 'Emits on star click' }],
    accessibility: ['role="radiogroup"', 'aria-valuenow="4"', 'aria-valuemax="5"'],
    consumerUsage: `<ui-rating [(value)]="userScore" [max]="5" />`,
    angularCode: `import { Component, input, model, output, signal } from '@angular/core';

@Component({
  selector: 'ui-rating',
  standalone: true,
  host: {
    'role': 'radiogroup',
    'class': 'inline-flex items-center gap-1'
  },
  template: \`
    @for (star of stars(); track star) {
      <button
        type="button"
        [disabled]="readonly()"
        (mouseenter)="hoverValue.set(star)"
        (mouseleave)="hoverValue.set(null)"
        (click)="setScore(star)"
        class="text-lg transition-transform hover:scale-110 cursor-pointer disabled:cursor-default"
      >
        <span [class.text-amber-400]="isFilled(star)" [class.text-zinc-300]="!isFilled(star)" [class.dark:text-zinc-700]="!isFilled(star)">
          ★
        </span>
      </button>
    }
  \`
})
export class UiRatingComponent {
  readonly value = model<number>(4);
  readonly max = input<number>(5);
  readonly readonly = input<boolean>(false);
  readonly valueChange = output<number>();

  readonly hoverValue = signal<number | null>(null);

  protected stars(): number[] {
    return Array.from({ length: this.max() }, (_, i) => i + 1);
  }

  protected isFilled(star: number): boolean {
    const current = this.hoverValue() ?? this.value();
    return star <= current;
  }

  protected setScore(val: number): void {
    if (!this.readonly()) {
      this.value.set(val);
      this.valueChange.emit(val);
    }
  }
}`
  },
  {
    id: 'stat-card',
    name: 'Stat Card / Metric',
    category: 'Data Display',
    description: 'A KPI metric display card with title, primary numeric value, trend indicator pill, and subtitle. (Bonus)',
    shadcnEquivalent: 'Stat Card (Bonus)',
    inputs: [
      { name: 'title', type: 'input<string>', default: "''", description: 'Metric title' },
      { name: 'value', type: 'input<string>', default: "''", description: 'Main statistic string' },
      { name: 'change', type: 'input<string>', default: "''", description: 'Percentage change' },
      { name: 'trend', type: "input<'up' | 'down' | 'neutral'>", default: "'up'", description: 'Trend direction' }
    ],
    outputs: [],
    accessibility: ['Semantic definition of statistics and trends'],
    consumerUsage: `<ui-stat-card title="Total Revenue" value="$45,231.89" change="+20.1% from last month" trend="up" />`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-stat-card',
  standalone: true,
  template: \`
    <div class="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-xs text-zinc-900 dark:text-zinc-100 max-w-xs">
      <div class="flex items-center justify-between text-xs text-zinc-500 mb-2">
        <span class="font-medium">{{ title() }}</span>
        <span class="text-zinc-400">●</span>
      </div>
      <div class="text-2xl font-black tracking-tight">{{ value() }}</div>
      @if (change()) {
        <p class="text-xs text-zinc-500 mt-1 flex items-center gap-1">
          <span 
            class="font-semibold"
            [class.text-emerald-500]="trend() === 'up'"
            [class.text-red-500]="trend() === 'down'"
          >
            {{ trend() === 'up' ? '↑' : '↓' }} {{ change() }}
          </span>
        </p>
      }
    </div>
  \`
})
export class UiStatCardComponent {
  readonly title = input<string>('Total Revenue');
  readonly value = input<string>('$45,231.89');
  readonly change = input<string>('+20.1% from last month');
  readonly trend = input<'up' | 'down' | 'neutral'>('up');
}`
  },
  {
    id: 'kbd',
    name: 'Kbd',
    category: 'Data Display',
    description: 'Displays a keyboard shortcut badge (e.g. ⌘K, Ctrl+C). (Bonus component)',
    shadcnEquivalent: 'Kbd (Bonus)',
    inputs: [
      { name: 'keys', type: 'input<string>', default: "'⌘K'", description: 'Key text' }
    ],
    outputs: [],
    accessibility: ['Semantic <kbd> element for assistive technology'],
    consumerUsage: `<ui-kbd keys="⌘K" />`,
    angularCode: `import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-kbd, kbd[ui-kbd]',
  standalone: true,
  host: {
    class: 'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 font-mono text-[10px] font-medium text-zinc-500'
  },
  template: '{{ keys() }}'
})
export class UiKbdComponent {
  readonly keys = input<string>('⌘K');
}`
  },
  {
    id: 'copy-button',
    name: 'Copy Button',
    category: 'Data Display',
    description: 'A button that copies text to clipboard with animated checkmark feedback. (Bonus component)',
    shadcnEquivalent: 'Copy Button (Bonus)',
    inputs: [
      { name: 'text', type: 'input<string>', default: "''", description: 'Text to copy' }
    ],
    outputs: [{ name: 'copied', type: 'output<void>()', description: 'Emits when copied' }],
    accessibility: ['aria-label="Copy to clipboard"'],
    consumerUsage: `<ui-copy-button [text]="npmInstallCmd" />`,
    angularCode: `import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ui-copy-button',
  standalone: true,
  template: \`
    <button
      (click)="copy()"
      class="inline-flex items-center justify-center h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
      aria-label="Copy to clipboard"
    >
      @if (copied()) {
        <span class="text-emerald-500 font-bold">✓</span>
      } @else {
        <span>📋</span>
      }
    </button>
  \`
})
export class UiCopyButtonComponent {
  readonly text = input.required<string>();
  readonly copied = signal<boolean>(false);

  copy(): void {
    navigator.clipboard.writeText(this.text());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}`
  }
];
