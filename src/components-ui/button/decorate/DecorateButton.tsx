import { HTMLAttributes } from 'react';

import styles from './DecorateButton.module.scss';
import { Icon } from '../../icon/icon.tsx';

export type ButtonProps = {
  size?: 'big' | 'small';
  width?: number;
  text?: string;
  onClick?: () => void;
} & HTMLAttributes<HTMLButtonElement>;

export const DecorateButton = ({ className, onClick, text }: ButtonProps) => {
  return (
    <div className={`${styles.container} ${className ?? ''}`} onClick={onClick}>
      <svg
        className={styles.circle}
        viewBox="0 0 114 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M112.45 90.2448C105.844 101.687 95.6242 110.61 83.3962 115.613C71.1682 120.616 57.6247 121.416 44.893 117.886C32.1614 114.356 20.963 106.697 13.0569 96.1112C5.15088 85.5259 0.985096 72.6142 1.21395 59.4042C1.44281 46.1943 6.05334 33.4346 14.3213 23.1294C22.5893 12.8243 34.0463 5.55764 46.8925 2.47086C59.7388 -0.615914 73.2466 0.652111 85.2939 6.07575C97.3413 11.4994 107.246 20.7714 113.451 32.4352"
          stroke="#2B2B2B"
        />
      </svg>

      <button className={`${styles.default}`} onClick={onClick}>
        <Icon className={styles.arrow} icon={'BtnArrow'} width={10} />

        <span className={styles.text}>{text}</span>
      </button>
    </div>
  );
};
