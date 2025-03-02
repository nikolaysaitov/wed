import { MUISelect } from './mui/MUIInputSelect.tsx';
import { Option } from '@mui/base/Option';
import styles from './InputSelect.module.scss';

type InputSelectProps = {
  defaultValue: string;
  multi?: boolean;
  options: Record<string, string | number>;
  onChange: (value: string | string[] | null) => void;
};

export const InputSelect = ({ defaultValue, multi, options, onChange }: InputSelectProps) => {
  return (
    <MUISelect
      defaultValue={defaultValue}
      multiple={!!multi}
      onChange={(_, key) => {
        return onChange(key);
      }}>
      {Object.entries(options).map(([key, value]) => (
        <Option key={key} value={key} className={styles.option}>
          {value}
        </Option>
      ))}
    </MUISelect>
  );
};
