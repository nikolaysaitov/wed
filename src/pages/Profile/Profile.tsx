import { NavLink, Outlet } from 'react-router-dom';

import { MenuMobile } from '@ui/menuMobile/MenuMobile.tsx';
import { Layout } from '@ui/layout/Layout.tsx';
import { PROFILE } from './Profile.data.ts';
import styles from './Profile.module.scss';

export function Profile() {
  return (
    <Layout>
      <div className={styles.contain}>
        <div className={styles.menu}>
          <h3 className={styles.title}>Мой профиль</h3>
          <ul className={styles.list}>
            {PROFILE.map(({ link, title }) => (
              <li className={styles.item} key={title}>
                <NavLink
                  to={`/profile/${link}`}
                  style={({ isActive }) => ({ fontWeight: isActive ? '700' : '300' })}
                  className={styles.link}
                  key={link}>
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <MenuMobile />

        <Outlet />
      </div>
    </Layout>
  );
}
