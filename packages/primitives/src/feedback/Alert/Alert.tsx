/**
 * Alert Component - Message display with multiple severity levels
 */

import React, { forwardRef, useState } from 'react';
import { ChildrenComponentProps, AlertVariant } from '../../types';

export interface AlertProps extends ChildrenComponentProps {
  /**
   * Alert severity level
   */
  variant?: AlertVariant;
  /**
   * Alert title
   */
  title?: string;
  /**
   * Show close button
   */
  closable?: boolean;
  /**
   * Callback when closed
   */
  onClose?: () => void;
  /**
   * Alert icon
   */
  icon?: React.ReactNode;
}

const variantConfig: Record<AlertVariant, { bg: string; border: string; text: string; icon?: string }> = {
  success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724', icon: '✓' },
  warning: { bg: '#fff3cd', border: '#ffeaa7', text: '#856404', icon: '!' },
  error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24', icon: '✕' },
  info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460', icon: 'ℹ' },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      closable = false,
      onClose,
      icon,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const config = variantConfig[variant];

    if (!isVisible) return null;

    const alertStyle: React.CSSProperties = {
      ...style,
      backgroundColor: config.bg,
      border: `1px solid ${config.border}`,
      borderRadius: '4px',
      padding: '1rem',
      color: config.text,
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    };

    const iconStyle: React.CSSProperties = {
      flexShrink: 0,
      fontSize: '1.25rem',
      fontWeight: 'bold',
    };

    const contentStyle: React.CSSProperties = {
      flex: 1,
    };

    const titleStyle: React.CSSProperties = {
      margin: '0 0 0.5rem 0',
      fontWeight: 600,
      fontSize: '1rem',
    };

    const closeButtonStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.5rem',
      color: 'inherit',
      padding: 0,
      flexShrink: 0,
    };

    const handleClose = () => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    };

    return (
      <div ref={ref} style={alertStyle} className={className} role="alert" {...rest}>
        {icon || (icon === null ? null : <div style={iconStyle}>{config.icon}</div>)}
        <div style={contentStyle}>
          {title && <h4 style={titleStyle}>{title}</h4>}
          {children}
        </div>
        {closable && (
          <button style={closeButtonStyle} onClick={handleClose} aria-label="Close alert">
            ✕
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
