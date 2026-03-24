/**
 * Switch Component - Toggle switch for boolean state
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../../types';

export interface SwitchProps extends BaseComponentProps, DisableableProps, SizeProps {
  /**
   * Switch label
   */
  label?: string;
  /**
   * Controlled checked state
   */
  checked?: boolean;
  /**
   * Default checked state
   */
  defaultChecked?: boolean;
  /**
   * Callback when switched
   */
  onChange?: (checked: boolean) => void;
  /**
   * Color of the switch
   */
  color?: 'primary' | 'secondary' | 'success' | 'danger';
}

const sizeConfig: Record<'sm' | 'md' | 'lg', { width: string; height: string; circleSize: string }> = {
  sm: { width: '40px', height: '20px', circleSize: '16px' },
  md: { width: '50px', height: '24px', circleSize: '20px' },
  lg: { width: '60px', height: '28px', circleSize: '24px' },
};

const colorMap: Record<'primary' | 'secondary' | 'success' | 'danger', string> = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
};

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      label,
      checked,
      defaultChecked = false,
      disabled = false,
      onChange,
      size = 'md',
      color = 'primary',
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    const config = sizeConfig[size];
    const colorValue = colorMap[color];

    const switchStyle: React.CSSProperties = {
      position: 'relative',
      width: config.width,
      height: config.height,
      backgroundColor: isChecked ? colorValue : '#ccc',
      borderRadius: config.height,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s ease',
      opacity: disabled ? 0.6 : 1,
      border: 'none',
      padding: '2px',
      boxSizing: 'border-box',
      ...style,
    };

    const circleStyle: React.CSSProperties = {
      position: 'absolute',
      width: config.circleSize,
      height: config.circleSize,
      backgroundColor: '#fff',
      borderRadius: '50%',
      transition: 'left 0.2s ease',
      left: isChecked ? `calc(100% - ${parseInt(config.circleSize) + 2}px)` : '2px',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    };

    const handleClick = () => {
      if (!disabled) {
        const newValue = !isChecked;
        if (!isControlled) {
          setInternalChecked(newValue);
        }
        if (onChange) {
          onChange(newValue);
        }
      }
    };

    return (
      <div style={containerStyle}>
        <button
          ref={ref}
          style={switchStyle}
          className={className}
          onClick={handleClick}
          disabled={disabled}
          role="switch"
          aria-checked={isChecked}
          aria-label={label}
          {...rest}
        >
          <div style={circleStyle} />
        </button>
        {label && <span style={{ userSelect: 'none', color: disabled ? '#999' : 'inherit' }}>{label}</span>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
