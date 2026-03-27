/**
 * Spacer Component - Flexible whitespace element for layout spacing
 */

import React, { forwardRef } from 'react';
import type { BaseGridProps } from '../types';

export interface SpacerProps extends BaseGridProps {
  /**
   * Width of the spacer (horizontal spacing)
   */
  width?: string | number;
  /**
   * Height of the spacer (vertical spacing)
   */
  height?: string | number;
  /**
   * Shorthand to set both width and height to the same value
   */
  size?: string | number;
  /**
   * Expand to fill available flex/grid space (sets flex: 1)
   */
  flex?: boolean;
  /**
   * Flex grow value (overrides flex=true)
   */
  flexGrow?: number;
  /**
   * Aria-hidden attribute; defaults to true since Spacer is decorative
   */
  'aria-hidden'?: boolean;
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
  (
    {
      width,
      height,
      size,
      flex = false,
      flexGrow,
      className = '',
      style = {},
      'aria-hidden': ariaHidden = true,
      ...rest
    },
    ref
  ) => {
    const resolvedWidth = size !== undefined ? toPx(size) : width !== undefined ? toPx(width) : undefined;
    const resolvedHeight = size !== undefined ? toPx(size) : height !== undefined ? toPx(height) : undefined;

    const computedStyle: React.CSSProperties = {
      display: 'block',
      ...(resolvedWidth !== undefined && { width: resolvedWidth }),
      ...(resolvedHeight !== undefined && { height: resolvedHeight }),
      ...(flexGrow !== undefined
        ? { flexGrow, flexShrink: 0 }
        : flex
          ? { flexGrow: 1, flexShrink: 1 }
          : { flexShrink: 0 }),
      ...style,
    };

    return (
      <div
        ref={ref}
        aria-hidden={ariaHidden}
        className={className}
        style={computedStyle}
        {...rest}
      />
    );
  }
);

Spacer.displayName = 'Spacer';
