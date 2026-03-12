/**
 * Checkbox Component - Accessible checkbox input
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../types';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Label text
   */
  label?: string;
  /**
   * Indeterminate state
   */
  indeterminate?: boolean;
  /**
   * Callback when checked state changes
   */
  onChange?: (checked: boolean) => void;
}

const sizeStyles: Record<'sm' | 'md' | 'lg', { checkbox: React.CSSProperties; label: React.CSSProperties }> = {
  sm: {
    checkbox: { width: '16px', height: '16px' },
    label: { fontSize: '0.875rem' },
  },
  md: {
    checkbox: { width: '20px', height: '20px' },
    label: { fontSize: '1rem' },
  },
  lg: {
    checkbox: { width: '24px', height: '24px' },
    label: { fontSize: '1.125rem' },
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      disabled = false,
      indeterminate = false,
      checked,
      defaultChecked,
      onChange,
      className = '',
      style = {},
      id,
      ...rest
    },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`;
    const sizeStyle = sizeStyles[size];

    const checkboxStyle: React.CSSProperties = {
      ...sizeStyle.checkbox,
      ...style,
      cursor: disabled ? 'not-allowed' : 'pointer',
      accentColor: '#007bff',
    };

    const labelStyle: React.CSSProperties = {
      ...sizeStyle.label,
      marginLeft: '0.5rem',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: disabled ? '#999' : 'inherit',
      userSelect: 'none',
    };

    const wrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      opacity: disabled ? 0.6 : 1,
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.checked);
      }
    };

    // Use internal state if uncontrolled
    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    return (
      <label style={wrapperStyle}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          checked={isChecked as boolean}
          onChange={(e) => {
            if (!isControlled) {
              setInternalChecked(e.target.checked);
            }
            handleChange(e);
          }}
          style={checkboxStyle}
          className={className}
          aria-label={label}
          {...rest}
        />
        {label && <span style={labelStyle}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
