/**
 * Common type definitions for all UI components
 */

import { ReactNode, CSSProperties } from 'react';

export interface BaseComponentProps {
  /**
   * Custom CSS class name
   */
  className?: string;
  /**
   * Inline styles
   */
  style?: CSSProperties;
  /**
   * Custom data attributes for testing
   */
  'data-testid'?: string;
}

export interface ChildrenComponentProps extends BaseComponentProps {
  /**
   * Child elements
   */
  children?: ReactNode;
}

export interface DisableableProps {
  /**
   * If true, the component is disabled
   */
  disabled?: boolean;
}

export interface SizeProps {
  /**
   * Component size variant
   */
  size?: 'sm' | 'md' | 'lg';
}

export interface VariantProps {
  /**
   * Component style variant
   */
  variant?: string;
}

export interface ColorProps {
  /**
   * Component color
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type AlertVariant = 'success' | 'warning' | 'error' | 'info';
export type ChipVariant = 'filled' | 'outlined';
export type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type BadgeVariant = 'standard' | 'dot';
export type SwitchColor = 'primary' | 'secondary' | 'success' | 'danger';
export type TabsVariant = 'bordered' | 'pills' | 'underlined';
