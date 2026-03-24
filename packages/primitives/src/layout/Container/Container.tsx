/**
 * Container Component - Centered content container with max-width
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../../types';

export interface ContainerProps extends ChildrenComponentProps {
  /**
   * Maximum width of the container
   */
  maxWidth?: string | number;
  /**
   * Horizontal padding (left and right)
   */
  paddingX?: string | number;
  /**
   * Vertical padding (top and bottom)
   */
  paddingY?: string | number;
  /**
   * Center content horizontally
   */
  centered?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      maxWidth = '1200px',
      paddingX = '16px',
      paddingY = '0px',
      centered = true,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...style,
      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
      paddingLeft: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
      paddingRight: typeof paddingX === 'number' ? `${paddingX}px` : paddingX,
      paddingTop: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
      paddingBottom: typeof paddingY === 'number' ? `${paddingY}px` : paddingY,
      ...(centered && { margin: '0 auto' }),
    };

    return (
      <div ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
