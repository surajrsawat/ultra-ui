/**
 * Box Component - Generic wrapper for layout and styling
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../types';

export interface BoxProps extends ChildrenComponentProps {
  /**
   * HTML element to render (div by default)
   */
  as?: React.ElementType;
  /**
   * Display type
   */
  display?: CSSStyleDeclaration['display'];
  /**
   * Flex direction
   */
  flexDirection?: CSSStyleDeclaration['flexDirection'];
  /**
   * Flex alignment
   */
  alignItems?: CSSStyleDeclaration['alignItems'];
  /**
   * Flex justification
   */
  justifyContent?: CSSStyleDeclaration['justifyContent'];
  /**
   * Gap between flex items
   */
  gap?: string | number;
  /**
   * Padding
   */
  padding?: string | number;
  /**
   * Margin
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
   * Border radius
   */
  borderRadius?: string | number;
  /**
   * Border
   */
  border?: string;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
      className = '',
      style = {},
      display,
      flexDirection,
      alignItems,
      justifyContent,
      gap,
      padding,
      margin,
      width,
      height,
      bg,
      borderRadius,
      border,
      children,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...style,
      display,
      flexDirection: flexDirection as any,
      alignItems,
      justifyContent,
      gap: typeof gap === 'number' ? `${gap}px` : gap,
      padding: typeof padding === 'number' ? `${padding}px` : padding,
      margin: typeof margin === 'number' ? `${margin}px` : margin,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      backgroundColor: bg,
      borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      border,
    };

    return (
      <Component ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';
