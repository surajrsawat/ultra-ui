/**
 * Slider Component - Numeric range input slider
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps, DisableableProps } from '../types';

export interface SliderProps extends BaseComponentProps, DisableableProps {
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  /**
   * Step increment
   */
  step?: number;
  /**
   * Current value
   */
  value?: number;
  /**
   * Default value
   */
  defaultValue?: number;
  /**
   * Label text
   */
  label?: string;
  /**
   * Show value label
   */
  showValueLabel?: boolean;
  /**
   * Callback when value changes
   */
  onChange?: (value: number) => void;
  /**
   * Color of the slider
   */
  color?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue = min,
      label,
      showValueLabel = false,
      disabled = false,
      onChange,
      color = '#007bff',
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      width: '100%',
    };

    const labelContainerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    };

    const sliderInputStyle: React.CSSProperties = {
      width: '100%',
      height: '4px',
      borderRadius: '2px',
      background: `linear-gradient(to right, ${color} 0%, ${color} ${((currentValue - min) / (max - min)) * 100}%, #ddd ${((currentValue - min) / (max - min)) * 100}%, #ddd 100%)`,
      outline: 'none',
      WebkitAppearance: 'none',
      appearance: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      ...style,
    } as React.CSSProperties;

    // Chrome, Safari, Edge, Opera
    const trackStyles = `
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${color};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${color};
        cursor: ${disabled ? 'not-allowed' : 'pointer'};
        border: 2px solid #fff;
        box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      }
    `;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(e.target.value);
      if (!isControlled) {
        setInternalValue(newValue);
      }
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <div style={containerStyle}>
        <style>{trackStyles}</style>
        {(label || showValueLabel) && (
          <div style={labelContainerStyle}>
            {label && <label style={{ fontWeight: 500 }}>{label}</label>}
            {showValueLabel && <span style={{ fontSize: '0.875rem', color: '#666' }}>{currentValue}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={currentValue}
          onChange={handleChange}
          disabled={disabled}
          style={sliderInputStyle}
          className={className}
          {...rest}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';
