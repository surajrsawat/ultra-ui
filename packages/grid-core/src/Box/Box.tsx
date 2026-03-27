/**
 * Box Component - Generic layout and styling container
 */

import React, { forwardRef } from 'react';
import type { ChildrenGridProps } from '../types';

export interface BoxProps extends ChildrenGridProps {
  /**
   * Render as a different HTML element or component
   */
  as?: React.ElementType;
  /**
   * CSS display value
   */
  display?: React.CSSProperties['display'];
  /**
   * CSS position value
   */
  position?: React.CSSProperties['position'];
  /**
   * Flex direction
   */
  flexDirection?: React.CSSProperties['flexDirection'];
  /**
   * Align items (flex/grid)
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * Justify content (flex/grid)
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Align self
   */
  alignSelf?: React.CSSProperties['alignSelf'];
  /**
   * Justify self
   */
  justifySelf?: React.CSSProperties['justifySelf'];
  /**
   * Flex wrap
   */
  flexWrap?: React.CSSProperties['flexWrap'];
  /**
   * Flex grow
   */
  flexGrow?: React.CSSProperties['flexGrow'];
  /**
   * Flex shrink
   */
  flexShrink?: React.CSSProperties['flexShrink'];
  /**
   * Flex basis
   */
  flexBasis?: React.CSSProperties['flexBasis'];
  /**
   * Gap between children
   */
  gap?: string | number;
  /**
   * Column gap between children
   */
  gapX?: string | number;
  /**
   * Row gap between children
   */
  gapY?: string | number;
  /**
   * All-sides padding
   */
  padding?: string | number;
  /**
   * Horizontal padding
   */
  paddingX?: string | number;
  /**
   * Vertical padding
   */
  paddingY?: string | number;
  /**
   * All-sides margin
   */
  margin?: string | number;
  /**
   * Horizontal margin
   */
  marginX?: string | number;
  /**
   * Vertical margin
   */
  marginY?: string | number;
  /**
   * Width
   */
  width?: string | number;
  /**
   * Height
   */
  height?: string | number;
  /**
   * Minimum width
   */
  minWidth?: string | number;
  /**
   * Maximum width
   */
  maxWidth?: string | number;
  /**
   * Minimum height
   */
  minHeight?: string | number;
  /**
   * Maximum height
   */
  maxHeight?: string | number;
  /**
   * Background color
   */
  bg?: string;
  /**
   * Text color
   */
  color?: string;
  /**
   * Border radius
   */
  borderRadius?: string | number;
  /**
   * Border shorthand
   */
  border?: string;
  /**
   * Box shadow
   */
  boxShadow?: string;
  /**
   * Overflow behavior
   */
  overflow?: React.CSSProperties['overflow'];
  /**
   * z-index
   */
  zIndex?: number | string;
  /**
   * Opacity (0–1)
   */
  opacity?: number;
  /**
   * Cursor style
   */
  cursor?: React.CSSProperties['cursor'];
  /**
   * Grid column span (when inside a Grid)
   */
  gridColumn?: string | number;
  /**
   * Grid row span (when inside a Grid)
   */
  gridRow?: string | number;
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Box = forwardRef<HTMLElement, BoxProps>(
  (
    {
      as: Component = 'div',
      className = '',
      style = {},
      display,
      position,
      flexDirection,
      alignItems,
      justifyContent,
      alignSelf,
      justifySelf,
      flexWrap,
      flexGrow,
      flexShrink,
      flexBasis,
      gap,
      gapX,
      gapY,
      padding,
      paddingX,
      paddingY,
      margin,
      marginX,
      marginY,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      bg,
      color,
      borderRadius,
      border,
      boxShadow,
      overflow,
      zIndex,
      opacity,
      cursor,
      gridColumn,
      gridRow,
      children,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...(display !== undefined && { display }),
      ...(position !== undefined && { position }),
      ...(flexDirection !== undefined && { flexDirection }),
      ...(alignItems !== undefined && { alignItems }),
      ...(justifyContent !== undefined && { justifyContent }),
      ...(alignSelf !== undefined && { alignSelf }),
      ...(justifySelf !== undefined && { justifySelf }),
      ...(flexWrap !== undefined && { flexWrap }),
      ...(flexGrow !== undefined && { flexGrow }),
      ...(flexShrink !== undefined && { flexShrink }),
      ...(flexBasis !== undefined && { flexBasis }),
      ...(gap !== undefined && { gap: toPx(gap) }),
      ...(gapX !== undefined && { columnGap: toPx(gapX) }),
      ...(gapY !== undefined && { rowGap: toPx(gapY) }),
      ...(padding !== undefined && { padding: toPx(padding) }),
      ...(paddingX !== undefined && { paddingLeft: toPx(paddingX), paddingRight: toPx(paddingX) }),
      ...(paddingY !== undefined && { paddingTop: toPx(paddingY), paddingBottom: toPx(paddingY) }),
      ...(margin !== undefined && { margin: toPx(margin) }),
      ...(marginX !== undefined && { marginLeft: toPx(marginX), marginRight: toPx(marginX) }),
      ...(marginY !== undefined && { marginTop: toPx(marginY), marginBottom: toPx(marginY) }),
      ...(width !== undefined && { width: toPx(width) }),
      ...(height !== undefined && { height: toPx(height) }),
      ...(minWidth !== undefined && { minWidth: toPx(minWidth) }),
      ...(maxWidth !== undefined && { maxWidth: toPx(maxWidth) }),
      ...(minHeight !== undefined && { minHeight: toPx(minHeight) }),
      ...(maxHeight !== undefined && { maxHeight: toPx(maxHeight) }),
      ...(bg !== undefined && { backgroundColor: bg }),
      ...(color !== undefined && { color }),
      ...(borderRadius !== undefined && { borderRadius: toPx(borderRadius) }),
      ...(border !== undefined && { border }),
      ...(boxShadow !== undefined && { boxShadow }),
      ...(overflow !== undefined && { overflow }),
      ...(zIndex !== undefined && { zIndex }),
      ...(opacity !== undefined && { opacity }),
      ...(cursor !== undefined && { cursor }),
      ...(gridColumn !== undefined && {
        gridColumn: typeof gridColumn === 'number' ? `span ${gridColumn}` : gridColumn,
      }),
      ...(gridRow !== undefined && {
        gridRow: typeof gridRow === 'number' ? `span ${gridRow}` : gridRow,
      }),
      ...style,
    };

    return (
      <Component ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
