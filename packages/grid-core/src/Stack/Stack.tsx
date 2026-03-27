/**
 * Stack Component - One-dimensional layout for stacking items with uniform spacing
 */

import React, { Children, forwardRef, isValidElement, Fragment } from 'react';
import type { ChildrenGridProps } from '../types';
import { Divider } from '../Divider/Divider';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';

export interface StackProps extends ChildrenGridProps {
  /**
   * Render as a different HTML element or component
   */
  as?: React.ElementType;
  /**
   * Direction in which items are stacked
   */
  direction?: StackDirection;
  /**
   * Spacing between items
   */
  spacing?: string | number;
  /**
   * Align items along the cross axis
   */
  align?: React.CSSProperties['alignItems'];
  /**
   * Justify content along the main axis
   */
  justify?: React.CSSProperties['justifyContent'];
  /**
   * Whether to wrap overflowing children
   */
  wrap?: React.CSSProperties['flexWrap'] | boolean;
  /**
   * Insert a Divider between each child element
   */
  divider?: boolean | React.ReactElement;
  /**
   * All-sides padding
   */
  padding?: string | number;
  /**
   * Horizontal padding
   */
  paddingX?: string | number;
  /**
   * Vertical padding
   */
  paddingY?: string | number;
  /**
   * All-sides margin
   */
  margin?: string | number;
  /**
   * Width of the stack container
   */
  width?: string | number;
  /**
   * Height of the stack container
   */
  height?: string | number;
  /**
   * Background color
   */
  bg?: string;
  /**
   * Whether children should share equal width/height (flex: 1 on each child)
   */
  shouldWrapChildren?: boolean;
}

function toPx(value: string | number): string {
  return typeof value === 'number' ? `${value}px` : value;
}

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      as: Component = 'div',
      direction = 'column',
      spacing,
      align,
      justify,
      wrap,
      divider,
      padding,
      paddingX,
      paddingY,
      margin,
      width,
      height,
      bg,
      shouldWrapChildren = false,
      className = '',
      style = {},
      children,
      ...rest
    },
    ref
  ) => {
    const isHorizontal = direction === 'row' || direction === 'row-reverse';

    const resolvedWrap: React.CSSProperties['flexWrap'] =
      wrap === true ? 'wrap' : wrap === false ? 'nowrap' : (wrap as React.CSSProperties['flexWrap']);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction,
      ...(spacing !== undefined && !divider && { gap: toPx(spacing) }),
      ...(align !== undefined && { alignItems: align }),
      ...(justify !== undefined && { justifyContent: justify }),
      ...(resolvedWrap !== undefined && { flexWrap: resolvedWrap }),
      ...(padding !== undefined && { padding: toPx(padding) }),
      ...(paddingX !== undefined && { paddingLeft: toPx(paddingX), paddingRight: toPx(paddingX) }),
      ...(paddingY !== undefined && { paddingTop: toPx(paddingY), paddingBottom: toPx(paddingY) }),
      ...(margin !== undefined && { margin: toPx(margin) }),
      ...(width !== undefined && { width: toPx(width) }),
      ...(height !== undefined && { height: toPx(height) }),
      ...(bg !== undefined && { backgroundColor: bg }),
      ...style,
    };

    const childArray = Children.toArray(children).filter(isValidElement);

    if (!divider && !shouldWrapChildren) {
      return (
        <Component ref={ref} className={className} style={containerStyle} {...rest}>
          {children}
        </Component>
      );
    }

    const dividerEl: React.ReactElement =
      divider === true ? (
        <Divider
          orientation={isHorizontal ? 'vertical' : 'horizontal'}
          spacing={spacing}
        />
      ) : isValidElement(divider) ? (
        divider as React.ReactElement
      ) : (
        <Divider orientation={isHorizontal ? 'vertical' : 'horizontal'} />
      );

    const wrappedChildren = childArray.map((child, index) => {
      const isLast = index === childArray.length - 1;
      const wrappedChild = shouldWrapChildren ? (
        <div key={index} style={{ display: 'contents' }}>
          {child}
        </div>
      ) : (
        child
      );

      if (divider && !isLast) {
        return (
          <Fragment key={index}>
            {wrappedChild}
            {React.cloneElement(dividerEl, { key: `divider-${index}` })}
          </Fragment>
        );
      }

      return wrappedChild;
    });

    return (
      <Component ref={ref} className={className} style={containerStyle} {...rest}>
        {wrappedChildren}
      </Component>
    );
  }
);

Stack.displayName = 'Stack';

/** Convenience alias for a horizontal Stack */
export const HStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="row" {...props} />
));
HStack.displayName = 'HStack';

/** Convenience alias for a vertical Stack */
export const VStack = forwardRef<HTMLElement, Omit<StackProps, 'direction'>>((props, ref) => (
  <Stack ref={ref} direction="column" {...props} />
));
VStack.displayName = 'VStack';
