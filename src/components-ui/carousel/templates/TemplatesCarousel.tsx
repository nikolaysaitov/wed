import Slider, { Settings } from 'react-slick';

import { TEMPLATES } from './TemplatesCarousel.ts';
import styles from './TemplatesCarousel.module.scss';
import { useState } from 'react';

export function TemplatesCarousel(props: { className: string }) {
  const settings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  const [image, setImage] = useState(false);

  return (
    <div className={`${styles.container}`} id={'section-templates'}>
      <div className={styles.bangs}></div>
      <div className="slider-container">
        <Slider {...settings}>
          {TEMPLATES.map(({src, alt, gifSrc}, i) => (
            <img key={i} src={image ? gifSrc : src} alt={alt} className={`${props.className}`} onMouseOut={() => setImage((value) => !value)} onMouseOver={() => setImage((value) => !value)}/>
          ))}
        </Slider>
      </div>
    </div>
  );
}
