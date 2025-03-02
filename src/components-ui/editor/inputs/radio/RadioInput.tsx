import { RadioGroup } from '@headlessui/react';
import styles from './RadioInput.module.scss';
import { Icon } from '../../../icon/icon.tsx';

type RadioInputProps = {
  value: string;
  onChange: (key: string) => void;
  options: { value: string; key: string }[];
};

export const RadioInput = ({ value, options, onChange }: RadioInputProps) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      {options.map(({ key, value }) => (
        <RadioGroup.Option key={key} value={key}>
          {({ checked }) => (
            <span className={styles.container}>
              <div className={styles.border}>
                <Icon
                  className={`${styles.icon} ${checked && styles.checked}`}
                  icon={'IcYes'}
                  width={15}
                />
              </div>
              <p className={styles.label}>{value}</p>
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
