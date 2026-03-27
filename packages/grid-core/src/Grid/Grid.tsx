/**
 * Grid Component - Full-featured CSS Grid layout
 */

import React, { forwardRef } from 'react';
import type { ChildrenGridProps, ResponsiveValue } from '../types';

export interface GridProps extends ChildrenGridProps {
  /**
   * Number of columns (responsive values supported)
   */
  columns?: ResponsiveValue<number>;
  /**
   * Number of rows
   */
  rows?: number | string;
  /**
   * Gap between all grid cells
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
   * Use auto-fit to fill available space with columns
   */
  autoFit?: boolean;
  /**
   * Use auto-fill to place as many columns as possible
   */
  autoFill?: boolean;
  /**
   * Minimum column width when autoFit or autoFill is true
   */
  minColWidth?: string | number;
  /**
   * Explicit grid-template-columns value (overrides columns/autoFit/autoFill)
   */
  templateColumns?: string;
  /**
   * Explicit grid-template-rows value
   */
  templateRows?: string;
  /**
   * Grid auto-flow direction
   */
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense';
  /**
   * Grid auto-rows size
   */
  autoRows?: string;
  /**
   * Grid auto-columns size
   */
  autoCols?: string;
  /**
   * Align items along the block (column) axis
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * Justify items along the inline (row) axis
   */
  justifyItems?: React.CSSProperties['justifyItems'];
  /**
   * Align the grid within the container along the block axis
   */
  alignContent?: React.CSSProperties['alignContent'];
  /**
   * Justify the grid within the container along the inline axis
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Inline padding (left and right)
   */
  paddingX?: string | number;
  /**
   * Block padding (top and bottom)
   */
  paddingY?: string | number;
  /**
   * All-sides padding
   */
  padding?: string | number;
  /**
   * Width of the grid container
   */
  width?: string | number;
  /**
   * Height of the grid container
   */
  height?: string | number;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns = 12,
      rows,
      gap = '16px',
      gapX,
      gapY,
      autoFit = false,
      autoFill = false,
      minColWidth = '200px',
      templateColumns,
      templateRows,
      autoFlow,
      autoRows,
      autoCols,
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
      paddingX,
      paddingY,
      padding,
      width,
      height,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    let gridTemplateColumns: string;

    if (templateColumns) {
      gridTemplateColumns = templateColumns;
    } else if (autoFit) {
      const minW = typeof minColWidth === 'number' ? `${minColWidth}px` : minColWidth;
      gridTemplateColumns = `repeat(auto-fit, minmax(${minW}, 1fr))`;
    } else if (autoFill) {
      const minW = typeof minColWidth === 'number' ? `${minColWidth}px` : minColWidth;
      gridTemplateColumns = `repeat(auto-fill, minmax(${minW}, 1fr))`;
    } else {
      const cols =
        typeof columns === 'object'
          ? ((columns as any).lg ?? (columns as any).md ?? 12)
          : (columns as number);
      gridTemplateColumns = `repeat(${cols}, 1fr)`;
    }

    const computedStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns,
      ...(templateRows && { gridTemplateRows: templateRows }),
      ...(rows !== undefined && !templateRows && {
        gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
      }),
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      ...(gapX !== undefined && { columnGap: typeof gapX === 'number' ? `${gapX}px` : gapX }),
      ...(gapY !== undefined && { rowGap: typeof gapY === 'number' ? `${gapY}px` : gapY }),
      ...(autoFlow && { gridAutoFlow: autoFlow }),
      ...(autoRows && { gridAutoRows: autoRows }),
      ...(autoCols && { gridAutoColumns: autoCols }),
      ...(alignItems && { alignItems }),
      ...(justifyItems && { justifyItems }),
      ...(alignContent && { alignContent }),
      ...(justifyContent && { justifyContent }),
      ...(padding !== undefined && { padding: typeof padding === 'number' ? `${padding}px` : padding }),
      ...(paddingX !== undefined && {
        paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
        paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
      }),
      ...(paddingY !== undefined && {
        paddingTop: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
        paddingBottom: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
      }),
      ...(width !== undefined && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height !== undefined && { height: typeof height === 'number' ? `${height}px` : height }),
      ...style,
    };

    return (
      <div ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';
