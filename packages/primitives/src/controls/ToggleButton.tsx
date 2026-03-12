/**
 * ToggleButton Component - Button that toggles between two states
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../types';

export interface ToggleButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'onChange'>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Controlled active state
   */
  active?: boolean;
  /**
   * Default active state
   */
  defaultActive?: boolean;
  /**
   * Callback when toggled
   */
  onChange?: (active: boolean) => void;
  /**
   * Active background color
   */
  activeColor?: string;
  /**
   * Inactive background color
   */
  inactiveColor?: string;
}

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

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(
  (
    {
      active,
      defaultActive = false,
      size = 'md',
      disabled = false,
      onChange,
      activeColor = '#007bff',
      inactiveColor = '#e9ecef',
      className = '',
      style = {},
      children,
      onClick,
      ...rest
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = useState(defaultActive);
    const isControlled = active !== undefined;
    const isActive = isControlled ? active : internalActive;

    const buttonStyle: React.CSSProperties = {
      ...sizeStyles[size],
      ...style,
      backgroundColor: isActive ? activeColor : inactiveColor,
      color: isActive ? '#fff' : '#000',
      border: '1px solid #ddd',
      borderRadius: '4px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.5 : 1,
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        const newActive = !isActive;
        if (!isControlled) {
          setInternalActive(newActive);
        }
        if (onChange) {
          onChange(newActive);
        }
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <button
        ref={ref}
        className={className}
        style={buttonStyle}
        disabled={disabled}
        onClick={handleClick}
        aria-pressed={isActive}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

ToggleButton.displayName = 'ToggleButton';
