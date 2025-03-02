import { PointCard } from '../../components-ui/point-card/PointCard.tsx';
import { COLUMNS } from './faq.model.ts';
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import styles from './FaqSection.module.scss';

export const FaqSection = () => {
  return (
    <CheckCurrentSection
      id={'section-faq'}
      className={styles.container}
      sectionName={'faq'}
      options={{ margin: '0px 0px -70% 0px' }}>
      <h1 className={styles.title}>{`популярные вопросы`}</h1>
      <div className={styles.columns}>
        {COLUMNS.map((res, index) => (
          <div className={styles.points} key={index}>
            {res.points.map(({ title, text, initialOpen }, i) => (
              <PointCard
                className={styles.pointCard}
                size={'small'}
                key={i}
                title={title}
                text={text}
                initialOpen={initialOpen}
              />
            ))}
          </div>
        ))}
      </div>
    </CheckCurrentSection>
  );
};
