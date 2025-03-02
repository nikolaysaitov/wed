import { useState } from 'react';

import { InputString } from '@ui/editor/inputs/string/InputString.tsx';
import { Icon } from '@ui/icon/icon.tsx';
import { Button } from '@ui/button/Button.tsx';
import { createScheduleEvent, ScheduleEvent } from './Schedule.model.ts';
import styles from './Schedule.module.scss';

type ScheduleItemProps = { onDelete: (id: string) => void } & ScheduleEvent;

const ScheduleItem = ({ id, eventName, time, onDelete }: ScheduleItemProps) => {
  return (
    <div className={styles.row}>
      <InputString type={'time'} defaultValue={time} rootClassName={styles.time} wide={false} />
      <InputString placeholder={'Событие'} defaultValue={eventName} />
      <div className={styles.reset} onClick={() => onDelete(id)}>
        <Icon icon={'IcNo'} width={12} />
      </div>
    </div>
  );
};

type ScheduleProps = {
  items: ScheduleEvent[];
};
export const Schedule = ({ items }: ScheduleProps) => {
  const [scheduleItems, setScheduleItems] = useState(items);

  return (
    <div className={styles.container}>
      {scheduleItems.map((item) => (
        <ScheduleItem
          key={item.id}
          {...item}
          onDelete={(deletedId) =>
            setScheduleItems((current) => current.filter(({ id }) => id !== deletedId))
          }
        />
      ))}

      <Button
        wide
        onClick={() => setScheduleItems((current) => [...current, createScheduleEvent()])}>
        Добавить
      </Button>
    </div>
  );
};
