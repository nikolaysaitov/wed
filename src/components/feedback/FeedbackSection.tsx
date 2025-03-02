import { Parallax } from 'react-scroll-parallax';
import { FeedbackCarousel } from '../../components-ui/carousel/feedback/FeedbackCarousel.tsx';
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import styles from './FeedbackSection.module.scss';

export const FeedbackSection = () => {
  return (
    <CheckCurrentSection
      id={'section-feedback'}
      className={styles.container}
      sectionName={'feedback'}
      options={{ margin: '0px 0px -70% 0px' }}>
      <h1 className={styles.title}>{`что о нас говорят`}</h1>

      <div className={styles.cards}>
        <FeedbackCarousel />
      </div>
      <Parallax speed={13} className={styles.imageFeedbackPosition}>
        <img
          className={styles.imageFeedback}
          src={'assets/images/imageFeedback.png'}
          alt={'heart'}
        />
      </Parallax>
    </CheckCurrentSection>
  );
};
