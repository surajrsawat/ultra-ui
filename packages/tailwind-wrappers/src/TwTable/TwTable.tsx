import type { FC, TableHTMLAttributes } from 'react';

export const TwTable: FC<TableHTMLAttributes<HTMLTableElement>> = ({
  children,
  className,
  ...rest
}) => {
  const classes = [className, 'min-w-full divide-y divide-gray-200']
    .filter(Boolean)
    .join(' ');

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};
