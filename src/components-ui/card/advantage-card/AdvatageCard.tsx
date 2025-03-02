import { HTMLAttributes } from 'react';

import { Card } from '../../shared/card/card.model.ts';
import styles from './AdvatageCard.module.scss';
import cardStyles from '../../shared/card/card.module.scss';

export type AdvantageCardProps = HTMLAttributes<HTMLDivElement> & Card;

export const AdvantageCard = ({ title, text, className }: AdvantageCardProps) => {
  return (
    <div className={`${cardStyles.default} ${styles.container} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
