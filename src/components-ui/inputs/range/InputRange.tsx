import { useEffect, useState } from 'react';
import { Slider } from '@mui/base/Slider';

import { fillArray, InputRangeMark } from './InputRange.model.ts';
import styles from './InputRange.module.scss';

interface InputRangeProps {
  defaultValue?: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  start?: number;
  end?: number;
}

export const InputRange = ({
  defaultValue,
  value,
  start = 1,
  step = 1,
  end = 5,
  onChange
}: InputRangeProps) => {
  const [marks, setMarks] = useState<InputRangeMark[]>([]);

  useEffect(() => {
    setMarks(fillArray(start, end, step));
  }, []);

  return (
    <Slider
      marks={marks}
      defaultValue={defaultValue}
      value={value}
      min={start}
      max={end}
      step={step}
      slotProps={{
        root: { className: styles.root },
        rail: { className: styles.rail },
        track: { className: styles.track },
        thumb: { className: styles.thumb },
        mark: { className: styles.mark },
        markLabel: { className: styles.markLabel }
      }}
      onChange={(_, value) => onChange(Array.isArray(value) ? value[0] : value)}
    />
  );
};
