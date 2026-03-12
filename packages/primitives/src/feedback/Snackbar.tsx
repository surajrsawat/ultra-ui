/**
 * Snackbar Component - Floating notification message
 */

import React, { forwardRef, useState, useEffect } from 'react';
import { BaseComponentProps } from '../types';

export interface SnackbarProps extends BaseComponentProps {
  /**
   * Message to display
   */
  message: string;
  /**
   * Snackbar variant
   */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  /**
   * Duration in milliseconds (0 = indefinite)
   */
  duration?: number;
  /**
   * Action button label
   */
  action?: string;
  /**
   * Callback when action is clicked
   */
  onAction?: () => void;
  /**
   * Callback when snackbar is dismissed
   */
  onDismiss?: () => void;
  /**
   * Position on screen
   */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /**
   * Control visibility externally
   */
  open?: boolean;
}

const variantColors: Record<string, { bg: string; text: string }> = {
  default: { bg: '#323232', text: '#fff' },
  success: { bg: '#4caf50', text: '#fff' },
  error: { bg: '#f44336', text: '#fff' },
  warning: { bg: '#ff9800', text: '#fff' },
  info: { bg: '#2196f3', text: '#fff' },
};

const positionMap: Record<string, React.CSSProperties> = {
  'top-left': { top: '20px', left: '20px' },
  'top-right': { top: '20px', right: '20px' },
  'bottom-left': { bottom: '20px', left: '20px' },
  'bottom-right': { bottom: '20px', right: '20px' },
};

export const Snackbar = forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      message,
      variant = 'default',
      duration = 4000,
      action,
      onAction,
      onDismiss,
      position = 'bottom-right',
      open = true,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
      setIsOpen(open);
      if (!open) return;

      if (duration === 0) return;

      const timer = setTimeout(() => {
        handleDismiss();
      }, duration);

      return () => clearTimeout(timer);
    }, [open, duration]);

    const handleDismiss = () => {
      setIsOpen(false);
      if (onDismiss) {
        onDismiss();
      }
    };

    const handleAction = () => {
      if (onAction) {
        onAction();
      }
      handleDismiss();
    };

    if (!isOpen) return null;

    const colors = variantColors[variant];

    const snackbarStyle: React.CSSProperties = {
      ...style,
      ...positionMap[position],
      position: 'fixed',
      backgroundColor: colors.bg,
      color: colors.text,
      padding: '1rem 1.5rem',
      borderRadius: '4px',
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      zIndex: 10000,
      minWidth: '300px',
      maxWidth: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      animation: 'slideIn 0.3s ease',
    };

    const messageStyle: React.CSSProperties = {
      flex: 1,
      fontSize: '0.875rem',
    };

    const actionButtonStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      fontWeight: 600,
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      transition: 'background-color 0.2s ease',
    };

    return (
      <>
        <style>{`
          @keyframes slideIn {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
        <div ref={ref} style={snackbarStyle} className={className} role="status" {...rest}>
          <span style={messageStyle}>{message}</span>
          {action && (
            <button style={actionButtonStyle} onClick={handleAction}>
              {action}
            </button>
          )}
        </div>
      </>
    );
  }
);

Snackbar.displayName = 'Snackbar';
