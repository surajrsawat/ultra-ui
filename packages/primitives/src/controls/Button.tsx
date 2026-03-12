/**
 * Button Component - Interactive button with multiple variants
 */

import React, { forwardRef } from 'react';
import { BaseComponentProps, DisableableProps, ButtonVariant, SizeProps } from '../types';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Button visual variant
   */
  variant?: ButtonVariant;
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Full width button
   */
  fullWidth?: boolean;
  /**
   * Loading state
   */
  loading?: boolean;
  /**
   * Loading text to display
   */
  loadingText?: string;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#007bff',
    border: '1px solid #007bff',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'currentColor',
    border: 'none',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
  },
};

const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
  sm: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
  },
  md: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
  },
  lg: {
    padding: '0.75rem 1.5rem',
    fontSize: '1.125rem',
  },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      loadingText,
      disabled = false,
      className = '',
      style = {},
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      ...(fullWidth && { width: '100%' }),
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!loading && !disabled && onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={className}
        style={computedStyle}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-busy={loading}
        {...rest}
      >
        {loading ? loadingText || children : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
