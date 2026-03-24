/**
 * Badge Component - Small count/notification indicator
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../../types';

export interface BadgeProps extends ChildrenComponentProps {
  /**
   * Badge content (typically a number)
   */
  content: string | number;
  /**
   * Badge color variant
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Badge position
   */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  /**
   * Show badge as dot
   */
  variant?: 'standard' | 'dot';
  /**
   * Max count before showing +
   */
  max?: number;
}

const colorMap: Record<string, string> = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

const positionMap: Record<string, React.CSSProperties> = {
  'top-right': { top: 0, right: 0, transform: 'translate(50%, -50%)' },
  'top-left': { top: 0, left: 0, transform: 'translate(-50%, -50%)' },
  'bottom-right': { bottom: 0, right: 0, transform: 'translate(50%, 50%)' },
  'bottom-left': { bottom: 0, left: 0, transform: 'translate(-50%, 50%)' },
};

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      content,
      color = 'primary',
      position = 'top-right',
      variant = 'standard',
      max = 99,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const containerStyle: React.CSSProperties = {
      ...style,
      position: 'relative',
      display: 'inline-block',
    };

    const badgeContent = typeof content === 'number' && content > max ? `${max}+` : content;

    const badgeStyle: React.CSSProperties = {
      position: 'absolute',
      ...positionMap[position],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorMap[color],
      color: '#fff',
      borderRadius: '50%',
      fontSize: '0.75rem',
      fontWeight: 700,
      zIndex: 1,
      ...(variant === 'dot'
        ? { width: '8px', height: '8px', border: '2px solid #fff' }
        : { minWidth: '20px', height: '20px', padding: '0 0.25rem' }),
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...rest}>
        {children}
        {variant === 'dot' ? <div style={badgeStyle} /> : <div style={badgeStyle}>{badgeContent}</div>}
      </div>
    );
  }
);

Badge.displayName = 'Badge';
