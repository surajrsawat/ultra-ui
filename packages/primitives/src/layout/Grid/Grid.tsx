/**
 * Grid Component - Responsive CSS Grid layout
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../../types';

export interface GridProps extends ChildrenComponentProps {
  /**
   * Number of columns
   */
  columns?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  /**
   * Gap between grid items
   */
  gap?: string | number;
  /**
   * Horizontal gap (column-gap)
   */
  gapX?: string | number;
  /**
   * Vertical gap (row-gap)
   */
  gapY?: string | number;
  /**
   * Auto-fit or auto-fill behavior
   */
  autoFit?: boolean;
  /**
   * Minimum column width when autoFit is true
   */
  minColWidth?: string | number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 12,
      gap = '16px',
      gapX,
      gapY,
      autoFit = false,
      minColWidth = '200px',
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const isResponsiveColumns = typeof columns === 'object';

    // Build grid-template-columns
    let gridTemplateColumns: string;
    if (autoFit) {
      const minWidth = typeof minColWidth === 'number' ? `${minColWidth}px` : minColWidth;
      gridTemplateColumns = `repeat(auto-fit, minmax(${minWidth}, 1fr))`;
    } else if (isResponsiveColumns) {
      const cols = (columns as any).lg || (columns as any).md || 12;
      gridTemplateColumns = `repeat(${cols}, 1fr)`;
    } else {
      gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    const computedStyle: React.CSSProperties = {
      ...style,
      display: 'grid',
      gridTemplateColumns,
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      ...(gapX && { columnGap: typeof gapX === 'number' ? `${gapX}px` : gapX }),
      ...(gapY && { rowGap: typeof gapY === 'number' ? `${gapY}px` : gapY }),
    };

    return (
      <div ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
