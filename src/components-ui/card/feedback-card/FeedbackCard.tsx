import { HTMLAttributes } from 'react';

import { Card } from '../../shared/card/card.model.ts';
import cardStyles from '../../shared/card/card.module.scss';
import quoteTop from '../../../../public/assets/svg/“top.svg';
import quoteBottom from '../../../../public/assets/svg/”bottom.svg';
import styles from './FeedbackCard.module.scss';

export type FeedbackCardProps = HTMLAttributes<HTMLDivElement> & Card;

export const FeedbackCard = ({ title, text, className }: FeedbackCardProps) => {
  return (
    <div className={`${cardStyles.default} ${styles.container} ${className} feedbackCard`}>
      <img src={'assets/images/photo-feedback.png'}  className={styles.image}/>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.quotes}>
        <img className={styles.quoteTop} src={quoteTop}/>
        <p className={styles.text}>{text}</p>
        <img className={styles.quoteBottom} src={quoteBottom}/>
      </div>
    </div>
  );
};
