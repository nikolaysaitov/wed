import { Input } from '@mui/base/Input';
import styles from './InputString.module.scss';
import { HTMLAttributes, HTMLInputTypeAttribute } from 'react';

export type InputStringProp = {
  id?: string;
  label?: string;
  name?: string;
  wide?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  initialValue?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  theme?: 'light' | 'transparent';
  rootClassName?: string;
  inputClassName?: string;
  onEnter?: (value: string) => void;
  onDelete?: () => void;
} & HTMLAttributes<HTMLInputElement>;

export const InputString = ({
  initialValue,
  value,
  placeholder,
  type,
  wide = true,
  theme = 'light',
  rootClassName,
  inputClassName
}: InputStringProp) => {
  return (
    <Input
      type={type ?? 'text'}
      defaultValue={initialValue}
      value={value}
      placeholder={placeholder}
      slotProps={{
        root: {
          className: `${styles.root} ${wide && styles.wide} ${styles[theme]} ${rootClassName ?? ''}`
        },
        input: { className: `${styles.input} ${inputClassName ?? ''}` }
      }}
    />
  );
};
