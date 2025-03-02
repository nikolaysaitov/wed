import { Input } from '@mui/base/Input';
import styles from './InputString.module.scss';
import { HTMLAttributes, HTMLInputTypeAttribute, useState } from 'react';

export type InputStringProp = {
  id?: string;
  autoComplete?: string;
  label?: string;
  name?: string;
  wide?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  initialValue?: string;
  type?: HTMLInputTypeAttribute;
  inputBorderStyle?: 'solid' | 'bottom';
  theme?: 'light' | 'transparent';
  rootClassName?: string;
  inputClassName?: string;
  onEnter?: (value: string) => void;
  onDelete?: () => void;
} & HTMLAttributes<HTMLInputElement>;

export const InputString = ({
  autoComplete,
  initialValue,
  placeholder,
  type,
  wide = true,
  theme = 'light',
  inputBorderStyle = 'bottom',
  onEnter,
  rootClassName,
  inputClassName
}: InputStringProp) => {
  const [value, setValue] = useState<string>(initialValue ?? '');
  const [, setFocus] = useState<boolean>(false);

  return (
    <Input
      type={type ?? 'text'}
      autoComplete={autoComplete ?? 'off'}
      defaultValue={initialValue}
      placeholder={placeholder}
      slotProps={{
        root: {
          className: `${styles.root} ${wide && styles.wide} ${styles[theme]} ${
            styles[inputBorderStyle] 
          } ${rootClassName ?? ''}`
        },
        input: { className: `${styles.input} ${inputClassName ?? ''}` }
      }}
      value={value}
      onFocus={() => setFocus(true)}
      onChange={(event) => setValue(event.target.value)}
      onBlur={() => {
        setFocus(false);

        return value && onEnter ? onEnter(value) : undefined;
      }}
      onKeyDown={(event) => {
        if (event.code === 'Backspace') {
          event.stopPropagation();
        }

        if (onEnter) {
          const value = (event.target as HTMLInputElement).value;

          if (!event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();
            (event.target as HTMLInputElement).blur();

            return onEnter(value);
          }
        }
      }}
    />
  );
};
