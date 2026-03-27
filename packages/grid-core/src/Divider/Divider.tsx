/**
 * Divider Component - Visual separator between sections or items
 */

import React, { forwardRef } from 'react';
import type { BaseGridProps } from '../types';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps extends BaseGridProps {
  /**
   * Orientation of the divider line
   */
  orientation?: DividerOrientation;
  /**
   * Border style
   */
  variant?: DividerVariant;
  /**
   * Color of the divider line
   */
  color?: string;
  /**
   * Thickness of the divider line
   */
  thickness?: string | number;
  /**
   * Spacing (margin) around the divider
   */
  spacing?: string | number;
  /**
   * Spacing along the main axis (top/bottom for horizontal, left/right for vertical)
   */
  spacingY?: string | number;
  /**
   * Spacing along the cross axis (left/right for horizontal, top/bottom for vertical)
   */
  spacingX?: string | number;
  /**
   * Optional label to display in the middle of the divider
   */
  label?: React.ReactNode;
  /**
   * Label position along the divider
   */
  labelPosition?: 'start' | 'center' | 'end';
  /**
   * Gap between the line and the label
   */
  labelGap?: string | number;
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      color = 'currentColor',
      thickness = 1,
      spacing,
      spacingY,
      spacingX,
      label,
      labelPosition = 'center',
      labelGap = '8px',
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal';
    const resolvedThickness = toPx(thickness);
    const resolvedLabelGap = toPx(labelGap);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      flexDirection: isHorizontal ? 'row' : 'column',
      ...(spacing !== undefined && { margin: toPx(spacing) }),
      ...(spacingY !== undefined && isHorizontal && {
        marginTop: toPx(spacingY),
        marginBottom: toPx(spacingY),
      }),
      ...(spacingX !== undefined && isHorizontal && {
        marginLeft: toPx(spacingX),
        marginRight: toPx(spacingX),
      }),
      ...(spacingY !== undefined && !isHorizontal && {
        marginLeft: toPx(spacingY),
        marginRight: toPx(spacingY),
      }),
      ...(spacingX !== undefined && !isHorizontal && {
        marginTop: toPx(spacingX),
        marginBottom: toPx(spacingX),
      }),
      ...style,
    };

    const lineStyle: React.CSSProperties = {
      flex: 1,
      borderStyle: variant,
      borderColor: color,
      ...(isHorizontal
        ? {
            borderTopWidth: resolvedThickness,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
          }
        : {
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: resolvedThickness,
            alignSelf: 'stretch',
          }),
    };

    if (!label) {
      return (
        <div
          ref={ref}
          className={className}
          style={{ ...containerStyle, display: 'block' }}
          {...rest}
        >
          <hr
            role="separator"
            aria-orientation={orientation}
            style={{ ...lineStyle, flex: undefined, width: isHorizontal ? '100%' : undefined, margin: 0 }}
          />
        </div>
      );
    }

    const justifyMap: Record<string, string> = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };

    return (
      <div
        ref={ref}
        className={className}
        style={{ ...containerStyle, justifyContent: justifyMap[labelPosition] ?? 'center' }}
        {...rest}
      >
        <hr style={lineStyle} />
        <span
          style={{
            flexShrink: 0,
            paddingLeft: isHorizontal ? resolvedLabelGap : undefined,
            paddingRight: isHorizontal ? resolvedLabelGap : undefined,
            paddingTop: !isHorizontal ? resolvedLabelGap : undefined,
            paddingBottom: !isHorizontal ? resolvedLabelGap : undefined,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <hr style={lineStyle} />
      </div>
    );
  }
);

Divider.displayName = 'Divider';
