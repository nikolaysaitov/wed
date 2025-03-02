import { useState } from 'react';

import { Card } from '../shared/card/card.model.ts';
import { Icon } from '../icon/icon.tsx';
import styles from './CardCarousel.module.scss';
import { AdvantageCard } from '../card/advantage-card/AdvatageCard.tsx';

export type CardCarouselProps = {
  data: Card[];
};

export default function CardCarousel({ data }: CardCarouselProps) {
  const [index, setIndex] = useState(Math.floor(data.length / 2));

  const handlePrevious = () => {
    setIndex((i) => (i - 1 < 0 ? data.length - 1 : i - 1));
  };

  const handleNext = () => {
    setIndex((i) => (i + 1 >= data.length ? 0 : i + 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data.map(({ title, text }, i) => (
          <AdvantageCard
            key={i}
            title={title}
            text={text}
            className={`
                ${styles.card} ${i === index ? styles.cardActive : ''} ${
                  Math.abs(i - index) === 1 ? styles.cardSibling : ''
                }
                `}></AdvantageCard>
        ))}
      </div>

      <div className={styles.slider}>
        <Icon icon={'ChevronLeft'} onClick={handlePrevious} width={15}></Icon>
        <div className={styles.points}>
          {data.map((_, i) => (
            <div key={i} className={`${styles.point} ${i === index && styles.pointActive}`}></div>
          ))}
        </div>
        <Icon icon={'ChevronRight'} onClick={handleNext} width={15}></Icon>
      </div>
    </div>
  );
}
