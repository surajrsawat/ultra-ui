/**
 * Navbar Component - Horizontal navigation container
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../types';

export interface NavbarProps extends ChildrenComponentProps {
  /**
   * Navbar logo/brand
   */
  brand?: React.ReactNode;
  /**
   * Navbar background color
   */
  bg?: string;
  /**
   * Navbar text color
   */
  textColor?: string;
  /**
   * Sticky positioning
   */
  sticky?: boolean;
  /**
   * Navbar elevation
   */
  elevation?: number;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      bg = '#f8f9fa',
      textColor = '#333',
      sticky = false,
      elevation = 1,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const navStyle: React.CSSProperties = {
      ...style,
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: bg,
      color: textColor,
      borderBottom: '1px solid #dee2e6',
      boxShadow: elevation > 0 ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
      ...(sticky && { position: 'sticky', top: 0, zIndex: 100 }),
    };

    const brandStyle: React.CSSProperties = {
      fontWeight: 700,
      fontSize: '1.25rem',
      marginRight: '2rem',
      color: 'inherit',
    };

    const navContentStyle: React.CSSProperties = {
      display: 'flex',
      flex: 1,
      gap: '1rem',
      alignItems: 'center',
    };

    return (
      <nav ref={ref} style={navStyle} className={className} {...rest}>
        {brand && <div style={brandStyle}>{brand}</div>}
        <div style={navContentStyle}>{children}</div>
      </nav>
    );
  }
);

Navbar.displayName = 'Navbar';

export interface NavItemProps extends ChildrenComponentProps {
  /**
   * Navigation item href
   */
  href?: string;
  /**
   * Is current/active item
   */
  active?: boolean;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    { href = '#', active = false, disabled = false, onClick, className = '', style = {}, children, ...rest },
    ref
  ) => {
    const itemStyle: React.CSSProperties = {
      ...style,
      padding: '0.5rem 1rem',
      textDecoration: 'none',
      color: active ? '#007bff' : 'inherit',
      borderBottom: active ? '3px solid #007bff' : 'transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'all 0.2s ease',
      display: 'inline-block',
    };

    return (
      <a ref={ref} href={href} style={itemStyle} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
);

NavItem.displayName = 'NavItem';
