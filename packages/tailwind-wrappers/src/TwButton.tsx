import React from 'react';

export const TwButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...rest }) => {
  const cls = (className ? className + ' ' : '') + 'px-3 py-1 rounded-md bg-blue-600 text-white';
  return <button className={cls} {...rest}>{children}</button>;
};