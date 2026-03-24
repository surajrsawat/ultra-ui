/**
 * Accordion Component - Collapsible sections
 */

import React, { forwardRef, useState } from 'react';
import { BaseComponentProps } from '../../types';

export interface AccordionItem {
  id: string | number;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps extends BaseComponentProps {
  /**
   * Accordion items
   */
  items: AccordionItem[];
  /**
   * Allow multiple items open simultaneously
   */
  multiple?: boolean;
  /**
   * Currently open item IDs
   */
  openIds?: (string | number)[];
  /**
   * Default open items
   */
  defaultOpenIds?: (string | number)[];
  /**
   * Change handler
   */
  onChange?: (openIds: (string | number)[]) => void;
  /**
   * Accordion border
   */
  bordered?: boolean;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      multiple = false,
      openIds,
      defaultOpenIds = [],
      onChange,
      bordered = true,
      className = '',
      style = {},
      ...rest
    },
    ref
  ) => {
    const [internalOpenIds, setInternalOpenIds] = useState<(string | number)[]>(defaultOpenIds);
    const isControlled = openIds !== undefined;
    const currentOpenIds = isControlled ? openIds : internalOpenIds;

    const handleToggle = (itemId: string | number) => {
      let newOpenIds: (string | number)[];

      if (multiple) {
        if (currentOpenIds.includes(itemId)) {
          newOpenIds = currentOpenIds.filter((id) => id !== itemId);
        } else {
          newOpenIds = [...currentOpenIds, itemId];
        }
      } else {
        newOpenIds = currentOpenIds.includes(itemId) ? [] : [itemId];
      }

      if (!isControlled) {
        setInternalOpenIds(newOpenIds);
      }

      if (onChange) {
        onChange(newOpenIds);
      }
    };

    const containerStyle: React.CSSProperties = {
      ...style,
      border: bordered ? '1px solid #ddd' : 'none',
      borderRadius: '4px',
      overflow: 'hidden',
    };

    const itemStyle: React.CSSProperties = {
      borderBottom: bordered ? '1px solid #ddd' : 'none',
    };

    const headerStyle = (isOpen: boolean, disabled?: boolean): React.CSSProperties => ({
      padding: '1rem',
      backgroundColor: isOpen ? '#f5f5f5' : '#fff',
      cursor: disabled ? 'not-allowed' : 'pointer',
      userSelect: 'none',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'all 0.2s ease',
      opacity: disabled ? 0.6 : 1,
    });

    const titleStyle: React.CSSProperties = {
      margin: 0,
      fontSize: '1rem',
      fontWeight: 500,
    };

    const iconStyle = (isOpen: boolean): React.CSSProperties => ({
      transition: 'transform 0.2s ease',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      fontSize: '1.25rem',
    });

    const contentStyle: React.CSSProperties = {
      padding: '1rem',
      backgroundColor: '#fafafa',
      maxHeight: '500px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
    };

    return (
      <div ref={ref} style={containerStyle} className={className} {...rest}>
        {items.map((item) => {
          const isOpen = currentOpenIds.includes(item.id);

          return (
            <div key={item.id} style={itemStyle}>
              <button
                style={headerStyle(isOpen, item.disabled)}
                onClick={() => !item.disabled && handleToggle(item.id)}
                disabled={item.disabled}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
              >
                <h3 style={titleStyle}>{item.title}</h3>
                <span style={iconStyle(isOpen)}>▼</span>
              </button>
              {isOpen && (
                <div style={contentStyle} id={`accordion-content-${item.id}`} role="region">
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
