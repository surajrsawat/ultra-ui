import React from 'react';
import { Box, BoxProps } from './Box';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button' | 'a' | React.ElementType;
};

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest}>
      {children}
    </button>
  );
};