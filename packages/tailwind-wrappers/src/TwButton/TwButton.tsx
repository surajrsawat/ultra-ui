import type { ButtonHTMLAttributes, FC } from 'react';

export const TwButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  const classes = [className, 'px-3 py-1 rounded-md bg-blue-600 text-white']
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
