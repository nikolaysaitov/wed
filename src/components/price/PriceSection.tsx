import { PriceCarousel } from '../../components-ui/carousel/price/PriceCarousel.tsx';
import { useCurrentView } from '../../context/current-view/CurrentViewContext.ts';
import { PRICE_CARDS } from './price.model.ts';
import { PriceCard } from '../../components-ui/card/price-card/PriceCard.tsx';
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import styles from './PriceSection.module.scss';
import { Parallax } from 'react-scroll-parallax';

export const PriceSection = () => {
  const { mediaView } = useCurrentView();

  return (
    <CheckCurrentSection
      id={'price'}
      className={styles.container}
      sectionName={'price'}
      options={{ margin: '0px 0px -30% 0px' }}>
      <div className={styles.textContent}>
        <h1>{`Стоимость`}</h1>

        <p className={styles.text}>
          Мы предлагаем 3 тарифных плана, чтобы вы смогли выбрать оптимальное решение в соответствии
          с вашим запросом. В каждом тарифе вы можете использовать базовые настройки цвета и
          шрифтов, дизайна и структуры
        </p>
      </div>

      {mediaView === 'desktop' ? (
        <div className={styles.cards}>
          {PRICE_CARDS.map((card, i) => (
            <PriceCard
              key={i}
              className={`${i !== 1 ? styles.cardSmall : styles.card}`}
              {...card}
            />
          ))}
        </div>
      ) : (
        <div className={styles.cards}>
          <PriceCarousel />
        </div>
      )}

      <Parallax speed={7} className={styles.imagePrice1Position}> 
        <img
          className={styles.imagePrice1}
          src={'assets/images/imagePrice1.png'}
          alt={'calendar'}
        />
      </Parallax>
      <Parallax speed={10} className={styles.imagePrice2Position}> 
        <img
          className={styles.imagePrice2}
          src={'assets/images/imagePrice2.png'}
          alt={'calendar'}
        />
      </Parallax>
      <Parallax speed={15} className={styles.imagePrice3Position}> 
        <img
          className={styles.imagePrice3}
          src={'assets/images/imagePrice3.png'}
          alt={'calendar'}
        />
      </Parallax>
    </CheckCurrentSection>
  );
};
