import React from 'react';

export type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: React.ElementType;
};

export const Box: React.FC<BoxProps> = ({ as: As = 'div', children, ...rest }) => {
  return <As {...rest}>{children}</As>;
};