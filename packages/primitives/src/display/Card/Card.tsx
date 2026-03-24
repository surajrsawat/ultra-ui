/**
 * Card Component - Container with header, body, and footer support
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../../types';

export interface CardProps extends ChildrenComponentProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card subtitle
   */
  subtitle?: string;
  /**
   * Card header content
   */
  header?: React.ReactNode;
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  /**
   * Card elevation level (0-24)
   */
  elevation?: number;
  /**
   * Hover elevation effect
   */
  hoverable?: boolean;
  /**
   * Card background color
   */
  bg?: string;
  /**
   * Padding of the card
   */
  padding?: string | number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      header,
      footer,
      elevation = 1,
      hoverable = false,
      bg = '#fff',
      padding = '1rem',
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const shadowElevations: Record<number, string> = {
      0: 'none',
      1: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      2: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
      3: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
      4: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)',
    };

    const cardStyle: React.CSSProperties = {
      ...style,
      backgroundColor: bg,
      borderRadius: '8px',
      boxShadow: shadowElevations[Math.min(elevation, 4)] as string,
      transition: hoverable ? 'box-shadow 0.2s ease' : undefined,
      cursor: hoverable ? 'pointer' : 'default',
    };

    const headerStyle: React.CSSProperties = {
      padding,
      borderBottom: '1px solid #eee',
    };

    const titleStyle: React.CSSProperties = {
      margin: '0 0 0.25rem 0',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#333',
    };

    const subtitleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: '0.875rem',
      color: '#666',
    };

    const bodyStyle: React.CSSProperties = {
      padding,
    };

    const footerStyle: React.CSSProperties = {
      padding,
      borderTop: '1px solid #eee',
      backgroundColor: '#f9f9f9',
      borderRadius: '0 0 8px 8px',
    };

    const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        event.currentTarget.style.boxShadow = shadowElevations[Math.min(elevation + 2, 4)];
      }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
      if (hoverable) {
        event.currentTarget.style.boxShadow = shadowElevations[Math.min(elevation, 4)];
      }
    };

    return (
      <div
        ref={ref}
        style={cardStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {(header || title) && (
          <div style={headerStyle}>
            {header || (
              <>
                <h3 style={titleStyle}>{title}</h3>
                {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
              </>
            )}
          </div>
        )}
        {children && <div style={bodyStyle}>{children}</div>}
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';
