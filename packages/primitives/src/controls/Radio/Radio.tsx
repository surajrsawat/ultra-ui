/**
 * Radio Component - Exclusive selection input
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps, DisableableProps, SizeProps } from '../../types';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'>,
    BaseComponentProps,
    DisableableProps,
    SizeProps {
  /**
   * Radio button label
   */
  label?: string;
  /**
   * Radio group name
   */
  name?: string;
  /**
   * Radio value
   */
  value?: string | number;
  /**
   * Callback when selected
   */
  onChange?: (value: string | number) => void;
}

const sizeStyles: Record<'sm' | 'md' | 'lg', { radio: React.CSSProperties; label: React.CSSProperties }> = {
  sm: {
    radio: { width: '16px', height: '16px' },
    label: { fontSize: '0.875rem' },
  },
  md: {
    radio: { width: '20px', height: '20px' },
    label: { fontSize: '1rem' },
  },
  lg: {
    radio: { width: '24px', height: '24px' },
    label: { fontSize: '1.125rem' },
  },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      size = 'md',
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      value = '',
      className = '',
      style = {},
      id,
      ...rest
    },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).slice(2)}`;
    const sizeStyle = sizeStyles[size];

    const radioStyle: React.CSSProperties = {
      ...sizeStyle.radio,
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
      if (onChange && e.target.checked) {
        onChange(value);
      }
    };

    const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
    const isControlled = checked !== undefined;
    const isChecked = isControlled ? checked : internalChecked;

    return (
      <label style={wrapperStyle}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          disabled={disabled}
          checked={isChecked as boolean}
          onChange={(e) => {
            if (!isControlled) {
              setInternalChecked(e.target.checked);
            }
            handleChange(e);
          }}
          style={radioStyle}
          className={className}
          value={value}
          aria-label={label}
          {...rest}
        />
        {label && <span style={labelStyle}>{label}</span>}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
