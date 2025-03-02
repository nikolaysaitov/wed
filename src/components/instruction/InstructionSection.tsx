import { INSTRUCTIONS } from './instructions.model.ts';
import { PointCard } from '../../components-ui/point-card/PointCard.tsx';
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import styles from './InstructionSection.module.scss';
import { Parallax } from 'react-scroll-parallax';

export const InstructionSection = () => {
  return (
    <CheckCurrentSection
      id={'instruction'}
      className={styles.container}
      sectionName={'instruction'}
      options={{ margin: '0px 0px -60% 0px' }}>
      <h1 className={styles.title}>{`как это работает`}</h1>

      <div className={styles.points}>
        {INSTRUCTIONS.map(({ title, text, marker, initialOpen }, i) => (
          <PointCard key={i} title={title} text={text} marker={marker} initialOpen={initialOpen} />
        ))}
      </div>
      <Parallax speed={10} className={styles.imageInstruction1Position}>
        <img
          className={styles.imageInstruction1}
          src={'assets/images/imageInstruction1.png'}
          alt={'heart'}
        />
      </Parallax>
      <Parallax speed={6} className={styles.imageInstruction2Position}>
        <img
          className={styles.imageInstruction2}
          src={'assets/images/imageInstruction2.png'}
          alt={'rings'}
        />
      </Parallax>
    </CheckCurrentSection>
  );
};
