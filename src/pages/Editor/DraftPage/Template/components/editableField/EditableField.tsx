import { HTMLInputTypeAttribute, useState } from 'react';
import { Input } from '@mui/base/Input';
import styles from './EditableField.module.scss';

type EditableFieldProps = {
  id: string;
  className: string;
  initialValue?: string;
  placeholder?: string;
  value?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (value: string) => void;
};

export const EditableField = ({
  id,
  className,
  initialValue,
  placeholder,
  // value,
  type,
  onChange
}: EditableFieldProps) => {
  const [value, setValue] = useState(initialValue);
  const [focus, setFocus] = useState<boolean>(false);

  // console.log(initialValue);

  return (
    <Input
      id={id}
      type={type ?? 'text'}
      value={value}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => {
        setFocus(false);

        return value && onChange ? onChange(value) : undefined;
      }}
      onChange={(event) => setValue(event.target.value)}
      slotProps={{
        root: {
          className: `${styles.root} ${focus && styles.focus} ${className ?? ''}`
        },
        input: { className: `${styles.input}` }
      }}
    />
  );
};
