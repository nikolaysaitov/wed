import styles from './Checkbox.module.scss';
import { Icon } from '../../../icon/icon.tsx';
import { useState } from 'react';

type CheckboxProps = {
  initialValue: boolean;
  label?: string;
  onChange: (value: boolean) => void;
  containerClassName?: string;
};

export const Checkbox = ({ initialValue, label, onChange, containerClassName }: CheckboxProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <div className={`${styles.container} ${containerClassName ?? ''}`}>
      <label className={styles.checkbox}>
        <input
          className={styles.input}
          type={'checkbox'}
          value={`${value}`}
          onChange={() => {
            onChange(!value);
            setValue((prev) => !prev);
          }}
        />
        <div className={styles.border}>
          <Icon className={`${styles.icon} ${value && styles.checked}`} icon={'IcYes'} width={15} />
        </div>
      </label>

      {!!label && (
        <label
          className={styles.label}
          onClick={() => {
            onChange(!value);
            setValue((value) => !value);
          }}>
          {label}
        </label>
      )}
    </div>
  );
};
