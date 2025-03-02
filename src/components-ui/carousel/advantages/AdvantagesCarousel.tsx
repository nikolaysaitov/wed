import Slider, { Settings } from 'react-slick';

import { ADVANTAGE_CARDS } from '../../../components/advantages/advantages.model.ts';
import { AdvantageCard } from '../../card/advantage-card/AdvatageCard.tsx';
import styles from './AdvantagesCarousel.module.scss';

type AdvantagesCarouselProps = {
  className: string;
};
export function AdvantagesCarousel({ className }: AdvantagesCarouselProps) {
  const settings: Settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    centerPadding: '30px',
    dots: false,
    speed: 500,
    focusOnSelect: true,
    variableWidth: true,
    adaptiveHeight: true,
    swipeToSlide: true,
  };
  return (
    <div className={`${styles.container} ${className}`}>
      <div className="slider-container">
        <Slider {...settings}>
          {ADVANTAGE_CARDS.map((card, i) => (
            <div key={i}>
              <AdvantageCard className={styles.card} {...card} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
