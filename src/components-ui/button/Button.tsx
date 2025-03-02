import { HTMLAttributes } from 'react';

import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

export type ButtonProps = {
  link?: string;
  wide?: boolean;
  width?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  high?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export const Button = ({
  link,
  wide,
  children,
  onClick,
  disabled,
  width,
  type,
  high
}: ButtonProps) => {
  return link ? (
    <Link
      to={link}
      className={`${styles.default} ${wide && styles.wide} ${
        width && styles.width
      } ${!!disabled && styles.disabled}`}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      disabled={!!disabled}
      className={`${styles.default} ${wide && styles.wide} ${
        width && styles.width
      } ${high && styles.high} ${!!disabled && styles.disabled}`}
      onClick={!disabled ? onClick : () => {}}
    >
      {children}
    </button>
  );
};
