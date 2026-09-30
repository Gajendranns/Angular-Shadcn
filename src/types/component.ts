/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentDoc {
  id: string;
  name: string;
  category: 'Form' | 'Layout & Structure' | 'Feedback & Overlay' | 'Navigation' | 'Data Display';
  description: string;
  shadcnEquivalent: string;
  cdkPrimitive?: string;
  angularCode: string;
  consumerUsage: string;
  inputs: ComponentProp[];
  outputs: ComponentProp[];
  variants?: string[];
  accessibility: string[];
}
