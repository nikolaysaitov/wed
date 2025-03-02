import React, { ReactNode } from 'react';
import Header from '../header/Header.tsx';
import { Footer } from '../footer/Footer.tsx';
import styles from './Layout.module.scss';

type LayoutProps = {
  onScroll?: ({ currentTarget }: React.UIEvent<HTMLElement>) => void;
  children: ReactNode | ReactNode[];
};

export const Layout = ({ children, onScroll }: LayoutProps) => {
  return (
    <div className={styles.page} onScroll={(e) => (onScroll ? onScroll(e) : undefined)}>
      <Header />

      <div className={styles.layout}>
        {children}
        <Footer />
      </div>
    </div>
  );
};
