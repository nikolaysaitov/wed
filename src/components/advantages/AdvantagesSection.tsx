import { ADVANTAGE_CARDS } from './advantages.model.ts';
import { AdvantageCard } from '../../components-ui/card/advantage-card/AdvatageCard.tsx';
import { DecorateButton } from '../../components-ui/button/decorate/DecorateButton.tsx';
import { useCurrentView } from '../../context/current-view/CurrentViewContext.ts';
import { AdvantagesCarousel } from '../../components-ui/carousel/advantages/AdvantagesCarousel.tsx';
import styles from './AdvantagesSection.module.scss';
import { Link } from 'react-router-dom';
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import { Parallax } from 'react-scroll-parallax';

export const AdvantagesSection = () => {
  const { mediaView } = useCurrentView();

  return (
    <CheckCurrentSection
      id={'section-advantages'}
      className={styles.container}
      sectionName={'advantages'}
      options={{ margin: '0px 0px -70% 0px' }}>
      {mediaView === 'mobile' ? (
        <AdvantagesCarousel className={styles.advantages} />
      ) : (
        <div className={styles.advantages}>
          {ADVANTAGE_CARDS.map(({ title, text }, i) => (
            <AdvantageCard key={i} title={title} text={text} />
          ))}
        </div>
      )}
      <Link to={'/catalog'}>
        <DecorateButton className={styles.action} text={'Выбрать приглашение'} />
      </Link>
      <Parallax speed={13} className={styles.imageAdvantagesPosition}>
        <img
          className={styles.imageAdvantages}
          src={'assets/images/imageAdvantages1.png'}
          alt={'heart'}
        />
      </Parallax>
    </CheckCurrentSection>
  );
};
