import { HTMLAttributes } from 'react';
import Slider, { Settings } from 'react-slick';
import { PROJECTS } from './ProjectCard.data.ts';
import { DefaultCardProfile } from '@ui/card/profile-card/DefaultCardProfile';
import arrowprev from '../../../../public/assets/svg/arrow-prev.svg';
import arrowpnext from '../../../../public/assets/svg/arrow-next.svg';

import styles from './PopularCarousel.module.scss';

type ArrowProps = HTMLAttributes<HTMLDivElement>;

function SampleNextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div>
      <img
        src={arrowpnext}
        className={className}
        style={{
          ...style,
          display: 'block',
          width: 10,
          height: 18,
          cursor: 'pointer'
        }}
        onClick={onClick}
      />
    </div>
  );
}

function SamplePrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <img
      src={arrowprev}
      className={className}
      style={{
        ...style,
        display: 'block',
        width: 10,
        height: 18,
        cursor: 'pointer'
      }}
      onClick={onClick}
    />
  );
}

export const PopularCarousel = () => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
          arrows: false
        }
      }
    ]
  };
  return (
    <div className={styles.container} id="popular">
      <Slider {...settings}>
        {PROJECTS.map(({ nameCard, buttonDelete, published }, i) => (
          <div key={i} className={styles.wrap}>
            <DefaultCardProfile
              nameCard={nameCard}
              // buttonFirst={"Редактировать"}
              // buttonLast={"Опубликовать"}
              // buttonLastDisabled={buttonLastDisabled}
              buttonDelete={buttonDelete}
              published={published}
              className={styles.cards}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
