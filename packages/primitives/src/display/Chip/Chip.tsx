/**
 * Chip Component - Compact label with optional delete capability
 */

import React, { forwardRef } from 'react';
import { BaseComponentProps, ChipVariant } from '../../types';

export interface ChipProps extends BaseComponentProps {
  /**
   * Chip label
   */
  label: string;
  /**
   * Chip variant
   */
  variant?: ChipVariant;
  /**
   * Show delete button
   */
  onDelete?: () => void;
  /**
   * Chip color
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  /**
   * Chip size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Avatar or icon content
   */
  avatar?: React.ReactNode;
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  primary: { bg: '#e3f2fd', text: '#1976d2', border: '#1976d2' },
  secondary: { bg: '#f3e5f5', text: '#7b1fa2', border: '#7b1fa2' },
  success: { bg: '#e8f5e9', text: '#388e3c', border: '#388e3c' },
  warning: { bg: '#fff3e0', text: '#f57c00', border: '#f57c00' },
  error: { bg: '#ffebee', text: '#d32f2f', border: '#d32f2f' },
};

const sizeConfig: Record<'sm' | 'md' | 'lg', { padding: string; fontSize: string }> = {
  sm: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
  md: { padding: '0.5rem 0.75rem', fontSize: '0.875rem' },
  lg: { padding: '0.75rem 1rem', fontSize: '1rem' },
};

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      label,
      variant = 'filled',
      onDelete,
      color = 'primary',
      size = 'md',
      avatar,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const colorConfig = colorMap[color];
    const sizeConfig_ = sizeConfig[size];

    const chipStyle: React.CSSProperties = {
      ...style,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: sizeConfig_.padding,
      borderRadius: '16px',
      fontSize: sizeConfig_.fontSize,
      fontWeight: 500,
      border: variant === 'outlined' ? `1px solid ${colorConfig.border}` : 'none',
      backgroundColor: variant === 'filled' ? colorConfig.bg : 'transparent',
      color: colorConfig.text,
      cursor: 'default',
      userSelect: 'none',
    };

    const deleteButtonStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'inherit',
      fontSize: '1rem',
      padding: '0 0.25rem',
      display: 'flex',
      alignItems: 'center',
    };

    return (
      <div ref={ref} style={chipStyle} className={className} {...rest}>
        {avatar && <div style={{ display: 'flex', alignItems: 'center' }}>{avatar}</div>}
        <span>{label}</span>
        {onDelete && (
          <button style={deleteButtonStyle} onClick={onDelete} aria-label={`Delete ${label}`}>
            ✕
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';
