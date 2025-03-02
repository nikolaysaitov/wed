import React, { forwardRef } from 'react';
import styles from './PopupDelete.module.scss';

const PopupDelete = forwardRef(function(props: {
  title: string,
  onDelete:(e: React.MouseEvent<HTMLElement>) => void;
  onBack: (e: React.MouseEvent<HTMLElement>) => void;
}, ref?: React.LegacyRef<HTMLDivElement>) {

  return (
    <div className={styles.layer}>
      <div className={styles.container} ref={ref}>
        <h2 className={styles.title}>{props.title}</h2>
        <p className={styles.subtitle}>Вы не сможете отменить это действие</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={props.onDelete}>Да</button>
          <button className={styles.button} onClick={props.onBack}>Нет</button>
        </div>
      </div>
    </div>
  );
})

export default PopupDelete;
