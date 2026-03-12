import React from 'react';

export const TwTable: React.FC<React.TableHTMLAttributes<HTMLTableElement>> = ({ children, className, ...rest }) => {
  const cls = (className ? className + ' ' : '') + 'min-w-full divide-y divide-gray-200';
  return <table className={cls} {...rest}>{children}</table>;
};