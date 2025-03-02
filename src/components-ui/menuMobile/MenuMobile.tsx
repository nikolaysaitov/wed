import { Link } from 'react-router-dom';
import styles from './MenuMobile.module.scss';
import IconAnswer from '../../../public/assets/svg/IconAnswer.svg';
import IconLikes from '../../../public/assets/svg/IconLikes.svg';
import IconProject from '../../../public/assets/svg/IconProject.svg';
import IconProfile from '../../../public/assets/svg/iconProfile.svg';
import IconExit from '../../../public/assets/svg/IconExit.svg';

export function MenuMobile() {
  return (
    <div className={styles.menuMobile}>
      <nav className={styles.listMobile}>
        <Link to="me" className={styles.itemMobile}>
          <img src={IconProfile} className={styles.iconMobile}></img>
          <p className={styles.linkMobile}>Профиль</p>
        </Link>

        <Link to="project" className={styles.itemMobile}>
          <img src={IconProject} className={styles.iconMobile}></img>
          <p className={styles.linkMobile}>Приглашения</p>
        </Link>

        <Link to="favorites" className={styles.itemMobile}>
          <img src={IconLikes} className={styles.iconMobile}></img>
          <p className={styles.linkMobile}>Избранное</p>
        </Link>

        <Link to="answers" className={styles.itemMobile}>
          <img src={IconAnswer} className={styles.iconMobile}></img>
          <p className={styles.linkMobile}>Ответы</p>
        </Link>

        <Link to="exit" className={styles.itemMobile}>
          <img src={IconExit} className={styles.iconMobile}></img>
          <p className={styles.linkMobile}>Выход</p>
        </Link>
      </nav>
    </div>
  );
}
