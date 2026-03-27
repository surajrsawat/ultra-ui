/**
 * Flex Component - Flexbox layout with comprehensive customization
 */

import React, { forwardRef } from 'react';
import type { ChildrenGridProps } from '../types';

export interface FlexProps extends ChildrenGridProps {
  /**
   * Render as a different HTML element or component
   */
  as?: React.ElementType;
  /**
   * Flex direction
   */
  direction?: React.CSSProperties['flexDirection'];
  /**
   * Align items along the cross axis
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * Justify content along the main axis
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * Align content for multi-line flex containers
   */
  alignContent?: React.CSSProperties['alignContent'];
  /**
   * Whether flex items should wrap
   */
  wrap?: React.CSSProperties['flexWrap'] | boolean;
  /**
   * Gap between children
   */
  gap?: string | number;
  /**
   * Horizontal gap between children
   */
  gapX?: string | number;
  /**
   * Vertical gap between children
   */
  gapY?: string | number;
  /**
   * Inline flex container
   */
  inline?: boolean;
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
   * Width
   */
  width?: string | number;
  /**
   * Height
   */
  height?: string | number;
  /**
   * Background color
   */
  bg?: string;
  /**
   * Border
   */
  border?: string;
  /**
   * Border radius
   */
  borderRadius?: string | number;
  /**
   * Overflow behavior
   */
  overflow?: React.CSSProperties['overflow'];
  /**
   * Flex grow for the container itself
   */
  grow?: React.CSSProperties['flexGrow'];
  /**
   * Flex shrink for the container itself
   */
  shrink?: React.CSSProperties['flexShrink'];
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Flex = forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      direction = 'row',
      align,
      justify,
      alignContent,
      wrap,
      gap,
      gapX,
      gapY,
      inline = false,
      padding,
      paddingX,
      paddingY,
      margin,
      width,
      height,
      bg,
      border,
      borderRadius,
      overflow,
      grow,
      shrink,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const resolvedWrap: React.CSSProperties['flexWrap'] =
      wrap === true ? 'wrap' : wrap === false ? 'nowrap' : (wrap as React.CSSProperties['flexWrap']);

    const computedStyle: React.CSSProperties = {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction,
      ...(align !== undefined && { alignItems: align }),
      ...(justify !== undefined && { justifyContent: justify }),
      ...(alignContent !== undefined && { alignContent }),
      ...(resolvedWrap !== undefined && { flexWrap: resolvedWrap }),
      ...(gap !== undefined && { gap: toPx(gap) }),
      ...(gapX !== undefined && { columnGap: toPx(gapX) }),
      ...(gapY !== undefined && { rowGap: toPx(gapY) }),
      ...(padding !== undefined && { padding: toPx(padding) }),
      ...(paddingX !== undefined && { paddingLeft: toPx(paddingX), paddingRight: toPx(paddingX) }),
      ...(paddingY !== undefined && { paddingTop: toPx(paddingY), paddingBottom: toPx(paddingY) }),
      ...(margin !== undefined && { margin: toPx(margin) }),
      ...(width !== undefined && { width: toPx(width) }),
      ...(height !== undefined && { height: toPx(height) }),
      ...(bg !== undefined && { backgroundColor: bg }),
      ...(border !== undefined && { border }),
      ...(borderRadius !== undefined && { borderRadius: toPx(borderRadius) }),
      ...(overflow !== undefined && { overflow }),
      ...(grow !== undefined && { flexGrow: grow }),
      ...(shrink !== undefined && { flexShrink: shrink }),
      ...style,
    };

    return (
      <Component ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Flex.displayName = 'Flex';
