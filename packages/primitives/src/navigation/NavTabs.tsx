/**
 * NavTabs Component - Tab switching navigation
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps } from '../types';

export interface Tab {
  id: string | number;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface NavTabsProps extends BaseComponentProps {
  /**
   * Array of tabs
   */
  tabs: Tab[];
  /**
   * Currently active tab ID
   */
  activeTabId?: string | number;
  /**
   * Default active tab ID
   */
  defaultTabId?: string | number;
  /**
   * Tab change handler
   */
  onChange?: (tabId: string | number) => void;
  /**
   * Tab variant
   */
  variant?: 'bordered' | 'pills' | 'underlined';
  /**
   * Show tab content
   */
  showContent?: boolean;
}

const variantStyles: Record<
  'bordered' | 'pills' | 'underlined',
  { tab: React.CSSProperties; active: React.CSSProperties; container: React.CSSProperties }
> = {
  bordered: {
    container: { borderBottom: '1px solid #ddd' },
    tab: {
      padding: '0.75rem 1rem',
      border: '1px solid transparent',
      borderBottom: 'none',
      cursor: 'pointer',
      backgroundColor: '#f9f9f9',
    },
    active: {
      borderColor: '#007bff #007bff transparent #007bff',
      backgroundColor: '#fff',
      color: '#007bff',
    },
  },
  pills: {
    container: { gap: '0.5rem', display: 'flex' },
    tab: {
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      backgroundColor: '#e9ecef',
      cursor: 'pointer',
      border: 'none',
    },
    active: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  },
  underlined: {
    container: { borderBottom: '2px solid #dee2e6', display: 'flex' },
    tab: {
      padding: '0.75rem 1rem',
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
      borderBottom: '2px solid transparent',
      marginBottom: '-2px',
    },
    active: {
      borderBottomColor: '#007bff',
      color: '#007bff',
      fontWeight: 600,
    },
  },
};

export const NavTabs = forwardRef<HTMLDivElement, NavTabsProps>(
  (
    {
      tabs,
      activeTabId,
      defaultTabId,
      onChange,
      variant = 'underlined',
      showContent = false,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const [internalActiveId, setInternalActiveId] = useState(defaultTabId || tabs[0]?.id);
    const isControlled = activeTabId !== undefined;
    const currentActiveId = isControlled ? activeTabId : internalActiveId;

    const styles = variantStyles[variant];

    const handleTabClick = (tabId: string | number) => {
      if (!isControlled) {
        setInternalActiveId(tabId);
      }
      if (onChange) {
        onChange(tabId);
      }
    };

    const containerStyle: React.CSSProperties = {
      ...style,
      ...styles.container,
    };

    const tabStyle = (isActive: boolean): React.CSSProperties => ({
      ...styles.tab,
      ...(isActive && styles.active),
      transition: 'all 0.2s ease',
    });

    const contentContainerStyle: React.CSSProperties = {
      marginTop: '1rem',
    };

    const activeTab = tabs.find((t) => t.id === currentActiveId);

    return (
      <div ref={ref} className={className} {...rest}>
        <div style={containerStyle} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              style={tabStyle(tab.id === currentActiveId)}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
              role="tab"
              aria-selected={tab.id === currentActiveId}
              aria-controls={`tab-panel-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {showContent && activeTab?.content && (
          <div style={contentContainerStyle} role="tabpanel" id={`tab-panel-${activeTab.id}`}>
            {activeTab.content}
          </div>
        )}
      </div>
    );
  }
);

NavTabs.displayName = 'NavTabs';
