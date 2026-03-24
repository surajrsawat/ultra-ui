/**
 * Modal Component - Centered overlay dialog with backdrop
 */

import React, { forwardRef, useState, useEffect } from 'react';
import { ChildrenComponentProps } from '../../types';

export interface ModalProps extends ChildrenComponentProps {
  /**
   * Modal title
   */
  title?: string;
  /**
   * Open/closed state
   */
  open: boolean;
  /**
   * Close callback
   */
  onClose: () => void;
  /**
   * Modal footer content
   */
  footer?: React.ReactNode;
  /**
   * Close button text
   */
  closeButtonText?: string;
  /**
   * Confirm button text
   */
  confirmButtonText?: string;
  /**
   * Confirm button callback
   */
  onConfirm?: () => void;
  /**
   * Size of modal
   */
   size?: 'sm' | 'md' | 'lg';
  /**
   * Allow click outside to close
   */
  closeOnBackdropClick?: boolean;
}

const sizeMap: Record<'sm' | 'md' | 'lg', string> = {
  sm: '400px',
  md: '600px',
  lg: '800px',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      title,
      open,
      onClose,
      footer,
      closeButtonText = 'Cancel',
      confirmButtonText = 'Confirm',
      onConfirm,
      size = 'md',
      closeOnBackdropClick = true,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = () => {
      if (closeOnBackdropClick) {
        onClose();
      }
    };

    const backdropStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    };

    const modalStyle: React.CSSProperties = {
      ...style,
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      maxWidth: sizeMap[size],
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      animation: 'modalSlideIn 0.3s ease',
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.5rem',
      borderBottom: '1px solid #eee',
    };

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
    };

    const closeButtonStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#666',
    };

    const bodyStyle: React.CSSProperties = {
      padding: '1.5rem',
    };

    const defaultFooterStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '0.75rem',
      padding: '1rem 1.5rem',
      borderTop: '1px solid #eee',
      backgroundColor: '#f9f9f9',
    };

    const buttonStyle: React.CSSProperties = {
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: 500,
      transition: 'all 0.2s ease',
    };

    const cancelButtonStyle: React.CSSProperties = {
      ...buttonStyle,
      backgroundColor: '#e9ecef',
      color: '#333',
    };

    const confirmButtonStyle: React.CSSProperties = {
      ...buttonStyle,
      backgroundColor: '#007bff',
      color: '#fff',
    };

    return (
      <>
        <style>{`
          @keyframes modalSlideIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
        <div style={backdropStyle} onClick={handleBackdropClick}>
          <div
            ref={ref}
            style={modalStyle}
            className={className}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            {...rest}
          >
            {title && (
              <div style={headerStyle}>
                <h2 style={titleStyle}>{title}</h2>
                <button style={closeButtonStyle} onClick={onClose} aria-label="Close modal">
                  ✕
                </button>
              </div>
            )}
            <div style={bodyStyle}>{children}</div>
            {footer !== undefined ? (
              footer
            ) : (
              <div style={defaultFooterStyle}>
                <button style={cancelButtonStyle} onClick={onClose}>
                  {closeButtonText}
                </button>
                {onConfirm && (
                  <button style={confirmButtonStyle} onClick={onConfirm}>
                    {confirmButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

Modal.displayName = 'Modal';
