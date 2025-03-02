import { ReactElement } from 'react';
import styles from './Section.module.scss';

type Section1Props = {
  title: string;
  children: ReactElement | ReactElement[] | null;
};

export const Section1 = ({ title, children }: Section1Props) => {
  return (
    <section className={styles.section1}>
      <h4>{title}</h4>
      {children}
    </section>
  );
};
