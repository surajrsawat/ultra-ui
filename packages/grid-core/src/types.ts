export type { ColumnDef, RowModel } from './useGrid/index';

/**
 * Common type definitions for all Grid Core components
 */
import { ReactNode, CSSProperties } from 'react';

export interface BaseGridProps {
  /** Custom CSS class name */
  className?: string;
  /** Inline styles */
  style?: CSSProperties;
  /** Custom data attributes for testing */
  'data-testid'?: string;
}

export interface ChildrenGridProps extends BaseGridProps {
  /** Child elements */
  children?: ReactNode;
}

/** Responsive value: a single value or per-breakpoint map */
export type ResponsiveValue<T> = T | { xs?: T; sm?: T; md?: T; lg?: T; xl?: T };
