import styles from './Logo.module.scss';

export type LogoProps = {
  className?: string
}

export const Logo = ({ className }: LogoProps) => {
  return <h1 className={`${styles.logo} ${className}`}>Сайт инвайт</h1>;
};
