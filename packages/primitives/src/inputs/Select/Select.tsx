/**
 * Select Component - Dropdown select input
 */

import React, { forwardRef } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../../types';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Select options
   */
  options?: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Helper text
   */
  helperText?: string;
  /**
   * Show error state
   */
  error?: boolean;
}

const sizeStyles: Record<'sm' | 'md' | 'lg', React.CSSProperties> = {
  sm: {
    padding: '0.25rem 0.75rem',
    fontSize: '0.875rem',
  },
  md: {
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
  },
  lg: {
    padding: '0.75rem 1rem',
    fontSize: '1.125rem',
  },
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options = [],
      placeholder,
      label,
      helperText,
      error = false,
      disabled = false,
      size = 'md',
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const selectStyle: React.CSSProperties = {
      ...sizeStyles[size],
      ...style,
      width: '100%',
      boxSizing: 'border-box',
      border: error ? '1px solid #dc3545' : '1px solid #ddd',
      borderRadius: '4px',
      backgroundColor: '#fff',
      color: '#333',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'border-color 0.2s ease',
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    };

    const labelStyle: React.CSSProperties = {
      fontWeight: 500,
      fontSize: '0.875rem',
      color: error ? '#dc3545' : '#333',
    };

    const helperStyle: React.CSSProperties = {
      fontSize: '0.75rem',
      color: error ? '#dc3545' : '#666',
    };

    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <select
          ref={ref}
          disabled={disabled}
          style={selectStyle}
          className={className}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
        {helperText && <span style={helperStyle}>{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
