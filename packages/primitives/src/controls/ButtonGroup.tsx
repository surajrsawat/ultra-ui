/**
 * ButtonGroup Component - Groups multiple buttons together
 */

import React, { forwardRef } from 'react';
import { ChildrenComponentProps } from '../types';

export interface ButtonGroupProps extends ChildrenComponentProps {
  /**
   * Orientation of button group
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Size of buttons in group
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Exclusive selection (only one button active)
   */
  exclusive?: boolean;
  /**
   * Currently active button value
   */
  value?: string | number;
  /**
   * Callback when button is clicked
   */
  onChange?: (value: string | number) => void;
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      orientation = 'horizontal',
      size = 'md',
      exclusive = false,
      value,
      onChange,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const computedStyle: React.CSSProperties = {
      ...style,
      display: 'inline-flex',
      flexDirection: orientation === 'vertical' ? 'column' : 'row',
      borderRadius: '4px',
      overflow: 'hidden',
      border: '1px solid #ddd',
    };

    // Clone children and add group styling
    const enhancedChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const childProps = child.props as any;
      const isActive = exclusive && childProps.value === value;

      return React.cloneElement(child, {
        ...childProps,
        onClick: (e: React.MouseEvent) => {
          if (exclusive && onChange) {
            onChange(childProps.value);
          }
          childProps.onClick?.(e);
        },
        style: {
          ...childProps.style,
          flex: 1,
          borderRadius: 0,
          ...(isActive && { backgroundColor: '#007bff', color: '#fff' }),
        },
      });
    });

    return (
      <div ref={ref} className={className} style={computedStyle} role="group" {...rest}>
        {enhancedChildren}
      </div>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';
