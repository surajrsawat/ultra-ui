/**
 * Container Component - Responsive centered container with configurable max-width
 */

import React, { forwardRef } from 'react';
import type { ChildrenGridProps } from '../types';

/** Named size presets for Container max-width */
export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

const sizeMap: Record<ContainerSize, string> = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%',
};

export interface ContainerProps extends ChildrenGridProps {
  /**
   * Named size preset or explicit max-width value
   */
  maxWidth?: ContainerSize | string | number;
  /**
   * Horizontal padding (left and right)
   */
  paddingX?: string | number;
  /**
   * Vertical padding (top and bottom)
   */
  paddingY?: string | number;
  /**
   * All-sides padding
   */
  padding?: string | number;
  /**
   * Center the container horizontally (auto left/right margins)
   */
  centered?: boolean;
  /**
   * Fluid container fills 100% of its parent's width
   */
  fluid?: boolean;
  /**
   * Background color
   */
  bg?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = 'xl',
      paddingX = '16px',
      paddingY = '0px',
      padding,
      centered = true,
      fluid = false,
      bg,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const resolvedMaxWidth = fluid
      ? '100%'
      : typeof maxWidth === 'string' && maxWidth in sizeMap
        ? sizeMap[maxWidth as ContainerSize]
        : typeof maxWidth === 'number'
          ? `${maxWidth}px`
          : maxWidth;

    const computedStyle: React.CSSProperties = {
      width: '100%',
      maxWidth: resolvedMaxWidth,
      ...(padding !== undefined
        ? { padding: typeof padding === 'number' ? `${padding}px` : padding }
        : {
            paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
            paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
            paddingTop: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
            paddingBottom: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
          }),
      ...(centered && { marginLeft: 'auto', marginRight: 'auto' }),
      ...(bg !== undefined && { backgroundColor: bg }),
      ...style,
    };

    return (
      <div ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
