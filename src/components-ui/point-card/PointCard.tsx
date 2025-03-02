import { HTMLAttributes, useState } from 'react';

import styles from './PointCard.module.scss';
import { Point } from './point.model.ts';
import { Icon } from '../icon/icon.tsx';

export type PointCardProps = HTMLAttributes<HTMLDivElement> &
  Point & {
    size?: 'small' | 'big';
  };

export const PointCard = ({ className, title, text, marker, initialOpen, size }: PointCardProps) => {
  const [open, setOpen] = useState(initialOpen ?? false);

  return (
    <div
      className={`${styles.container} ${className ?? ''} ${
        size === 'small' ? styles.containerSmall : styles.containerBig
      }`}
      onClick={() => setOpen((value) => !value)}>
      <div className={styles.point}>
        {!!marker && <p className={`${styles.marker} ${open ? styles.markerOpened : ''}`}>{marker}</p>}
        <div className={`${styles.content} ${open && styles.contentOpened}`}>
          <h3 className={styles.title}>{title}</h3>

          <p className={`${styles.text} ${open ? styles.textOpened : ''}`}>{text}</p>
        </div>
      </div>

      <div className={styles.arrowContainer}>
        <Icon
          icon={'ArrowLongDown'}
          width={35}
          className={`${styles.arrow} ${open && styles.arrowOpened}`}
        />
      </div>
    </div>
  );
};
