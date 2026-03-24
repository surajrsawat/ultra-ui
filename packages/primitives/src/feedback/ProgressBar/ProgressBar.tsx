/**
 * ProgressBar Component - Progress indicator
 */

import React, { forwardRef } from 'react';
import { BaseComponentProps } from '../../types';

export interface ProgressBarProps extends BaseComponentProps {
  /**
   * Progress value (0-100)
   */
  value: number;
  /**
   * Progress bar color
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Progress bar size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show percentage label
   */
  label?: boolean | string;
  /**
   * Animated progress bar
   */
  animated?: boolean;
  /**
   * Striped progress bar
   */
  striped?: boolean;
  /**
   * Background color
   */
  bgColor?: string;
}

const colorMap: Record<string, string> = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

const sizeConfig: Record<'sm' | 'md' | 'lg', { height: string; fontSize: string }> = {
  sm: { height: '0.5rem', fontSize: '0.65rem' },
  md: { height: '1rem', fontSize: '0.8rem' },
  lg: { height: '1.5rem', fontSize: '0.9rem' },
};

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      color = 'primary',
      size = 'md',
      label,
      animated = false,
      striped = false,
      bgColor = '#e9ecef',
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), 100);
    const sizeConfig_ = sizeConfig[size];
    const colorValue = colorMap[color];

    const containerStyle: React.CSSProperties = {
      ...style,
      width: '100%',
      height: sizeConfig_.height,
      backgroundColor: bgColor,
      borderRadius: '4px',
      overflow: 'hidden',
      position: 'relative',
    };

    const barStyle: React.CSSProperties = {
      height: '100%',
      width: `${clampedValue}%`,
      backgroundColor: colorValue,
      transition: 'width 0.3s ease',
      position: 'relative',
      backgroundImage: striped
        ? `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.15) 10px, rgba(255,255,255,.15) 20px)`
        : undefined,
      animation: animated ? 'progress-animation 1s linear infinite' : undefined,
    };

    const labelStyle: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      fontSize: sizeConfig_.fontSize,
      fontWeight: 600,
      color: '#333',
      whiteSpace: 'nowrap',
      pointerEvents: 'none',
    };

    return (
      <>
        <style>{`
          @keyframes progress-animation {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 50px 0;
            }
          }
        `}</style>
        <div
          ref={ref}
          style={containerStyle}
          className={className}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
          {...rest}
        >
          <div style={barStyle}>
            {(label || typeof label === 'string') && (
              <span style={labelStyle}>{typeof label === 'string' ? label : `${clampedValue}%`}</span>
            )}
          </div>
        </div>
      </>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';
