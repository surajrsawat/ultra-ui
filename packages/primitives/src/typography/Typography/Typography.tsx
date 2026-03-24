/**
 * Typography Component - Text rendition with semantic sizing
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../../types';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';

const variantMap: Record<TypographyVariant, { element: React.ElementType; style: React.CSSProperties }> = {
  h1: {
    element: 'h1',
    style: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2, margin: '0.5em 0' },
  },
  h2: {
    element: 'h2',
    style: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3, margin: '0.5em 0' },
  },
  h3: {
    element: 'h3',
    style: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4, margin: '0.5em 0' },
  },
  h4: {
    element: 'h4',
    style: { fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.4, margin: '0.5em 0' },
  },
  h5: {
    element: 'h5',
    style: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5, margin: '0.5em 0' },
  },
  h6: {
    element: 'h6',
    style: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5, margin: '0.5em 0' },
  },
  body: {
    element: 'p',
    style: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, margin: '0.5em 0' },
  },
  caption: {
    element: 'span',
    style: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4, color: '#666' },
  },
  overline: {
    element: 'span',
    style: { fontSize: '0.75rem', fontWeight: 600, lineHeight: 1.4, textTransform: 'uppercase', letterSpacing: '0.08em' },
  },
};

export interface TypographyProps extends ChildrenComponentProps {
  /**
   * Typography variant
   */
  variant?: TypographyVariant;
  /**
   * Text alignment
   */
  align?: 'left' | 'center' | 'right' | 'justify';
  /**
   * Text color
   */
  color?: string;
  /**
   * Font weight override
   */
  fontWeight?: number | string;
  /**
   * Override default element
   */
  as?: React.ElementType;
}

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      variant = 'body',
      align = 'left',
      color,
      fontWeight,
      as,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const variantConfig = variantMap[variant];
    const Component = as || (variantConfig.element as any);

    const computedStyle: React.CSSProperties = {
      ...variantConfig.style,
      ...style,
      textAlign: align as any,
      ...(color && { color }),
      ...(fontWeight && { fontWeight }),
    };

    return (
      <Component ref={ref} className={className} style={computedStyle} {...rest}>
        {children}
      </Component>
    );
  }
);

Typography.displayName = 'Typography';
