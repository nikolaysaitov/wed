import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Icon } from '../icon/icon.tsx';
import { useCurrentView } from '../../context/current-view/CurrentViewContext.ts';
import { HEADER } from './Header.data.ts';
import logo from '../../../public/assets/svg/logo.svg';
import styles from './Header.module.scss';
import { useUnit } from 'effector-react';
import { $user } from '../../api/user/user.store.ts';

export default function Header() {
  const [opened, setOpened] = useState(false);
  const handleClick = () => setOpened((value) => !value);
  const { currentSection, mediaView } = useCurrentView();
  const user = useUnit($user);

  if (mediaView === 'desktop') {
    return (
      <header className={styles.headerDesktop}>
        <div className={styles.headerContent}>
          <Link to={'/'}>
            <img className={styles.logo} src={logo} alt={'logo'} />
          </Link>

          <nav className={styles.menuDescktop}>
            {HEADER.map(({ link, title, type }) => (
              <NavLink
                to={{
                  pathname: `/${link}`,
                  search: link === 'catalog' ? `?category=all` : ''
                }}
                key={link}
                className={
                  currentSection === type ? styles.activeLink : styles.link
                }
              >
                {title}
              </NavLink>
            ))}
          </nav>

          <div className={styles.icons}>
            <Link to="/profile/favorites">
              <div
                className={`${styles.icon} ${
                  currentSection === 'like' ? styles.iconActive : ''
                } ${user ? '' : styles.iconVisible}`}
              >
                <Icon icon={'Like'} width={27} />
              </div>
            </Link>
            <Link to="/login">
              <div
                className={`${styles.icon} ${
                  currentSection === 'profile' || currentSection === 'login'
                    ? styles.iconActive
                    : ''
                }`}
              >
                <Icon icon={'Account'} width={30} />
              </div>
            </Link>
          </div>

          <Link to={'/gallery'} className={styles.button}>
            Попробовать бесплатно
          </Link>
        </div>
      </header>
    );
  } else {
    return (
      <header className={styles.mobile}>
        <div className={styles.mobileHeader}>
          <Link to={'/'} className={styles.logo}>
            <img
              className={styles.logo}
              src={logo}
              alt={'logo'}
              onClick={() => setOpened(false)}
            />
          </Link>
          <Icon
            icon={'Burger'}
            onClick={handleClick}
            className={styles.burger}
          />
        </div>

        <div
          className={`${styles.mobileMenu} ${
            opened ? '' : styles.mobileMenuClose
          }`}
        >
          {HEADER.map(({ link, title, type }) => (
            <NavLink
              to={{
                pathname: `/${link}`,
                search: link === 'catalog' ? `?category=all` : ''
              }}
              key={link}
              onClick={() => setOpened(false)}
              className={`${
                currentSection === type ? styles.activeLink : styles.link
              }`}
            >
              {title}
            </NavLink>
          ))}

          <Link to="/login">
            <div className={styles.login}>
              <Icon
                icon={'AccountMobile'}
                width={mediaView === 'tablet' ? 18 : 13}
              />
              <p className={styles.link}>{user ? 'Профиль' : 'Войти'}</p>
            </div>
          </Link>

          <Link to="/profile/favorites">
            <div className={`${user ? styles.login : styles.loginNone}`}>
              <Icon icon={'Like'} width={mediaView === 'tablet' ? 18 : 13} />
              <p className={styles.link}>{user && 'Избранное'}</p>
            </div>
          </Link>
        </div>
      </header>
    );
  }
}
