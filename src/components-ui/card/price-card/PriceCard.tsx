import { HTMLAttributes } from 'react';

import { PriceCard as IPriceCard } from '../../shared/card/card.model.ts';
import { Icon } from '../../icon/icon.tsx';
import cardStyles from '../../shared/card/card.module.scss';
import styles from './PriceCard.module.scss';
import { Button } from '../../button/Button.tsx';

export type PriceCardProps = HTMLAttributes<HTMLDivElement> & IPriceCard;

export const PriceCard = ({ title, conditions, price, className }: PriceCardProps) => {
  return (
    <div className={`${cardStyles.default} ${styles.container} ${className} priceCard`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.price}>{price}</p>
      </div>

      <div className={styles.conditions}>
        {conditions.map(({ text, present }, i) => (
          <div className={`${styles.condition} ${!present && styles.conditionNoPresent}`} key={i}>
            {!!present && <Icon icon={'IcYes'} width={15} className={styles.check} />}
            {!present && <Icon icon={'IcNo'} width={12} className={styles.noCheck} />}
            <p className={styles.text}>{text}</p>
          </div>
        ))}
      </div>

      <Button wide={true} high={true}>Купить</Button>
    </div>
  );
};
