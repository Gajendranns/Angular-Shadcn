/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDoc } from '../types/component';
import { FORM_COMPONENTS } from './components/formComponents';
import { OVERLAY_COMPONENTS } from './components/overlayComponents';
import { LAYOUT_COMPONENTS } from './components/layoutComponents';
import { NAVIGATION_COMPONENTS } from './components/navigationComponents';
import { DATA_DISPLAY_COMPONENTS } from './components/dataDisplayComponents';

/**
 * Complete shadcn/ui Component Coverage for Angular (40+ Components)
 * + Exclusive high-value components (Stepper, Timeline, File Dropzone, Kbd, Copy Button, Empty State)
 * 100% Pure Signals, Zoneless native, and accessible.
 */
export const COMPONENTS_DATA: ComponentDoc[] = [
  ...FORM_COMPONENTS,
  ...OVERLAY_COMPONENTS,
  ...LAYOUT_COMPONENTS,
  ...NAVIGATION_COMPONENTS,
  ...DATA_DISPLAY_COMPONENTS
];
