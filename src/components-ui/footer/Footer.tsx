import { forwardRef } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../../public/assets/svg/logoSquare.svg';
import VK from '../../../public/assets/svg/icVk.svg';
import TG from '../../../public/assets/svg/icTg.svg';
import WA from '../../../public/assets/svg/icWa.svg';
import { Button } from '../button/Button.tsx';
import styles from './Footer.module.scss';

export const Footer = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <footer id={'section-footer'} className={styles.footer} ref={ref}>
      <div className={styles.contain}>
        <Link to={'/'}>
          <img className={styles.logo} src={logo} alt={'logo'} />
        </Link>

        <div className={styles.footerContacts}>
          <div className={styles.footerFeedback}>
            <p className={styles.text}>{`Подпишись и получи подборку текстов для твоего приглашения`}</p>
            <form className={styles.form}>
              <input className={styles.input} type="email" placeholder={'Введите e-mail'} />
              <Button wide={true} width={true} className={styles.buttonBuy}>Готово</Button>
            </form>
          </div>

          <div className={styles.footerInfo}>
            <div className={styles.footerInfoContainer}>
              <h5 className={styles.footerInfoContainerTitle}>Меню</h5>

              <nav className={styles.footerInfoContainerContent}>
                <NavLink
                  to={`/catalog`}
                  className={styles.footerInfoContainerLink}>
                    Каталог
                </NavLink>
                <NavLink
                  to={`/#section-price`}
                  className={styles.footerInfoContainerLink}>
                    Стоимость
                </NavLink>
                <NavLink
                  to={`/#section-faq`}
                  className={styles.footerInfoContainerLink}>
                    FAQ
                </NavLink>
                <NavLink
                  to={`/login`}
                  className={styles.footerInfoContainerLink}>
                    Войти
                </NavLink>
              </nav>
            </div>

            <address className={styles.footerInfoContainer}>
              <h5 className={styles.footerInfoContainerTitle}>Свяжитесь с нами</h5>

              <nav className={styles.footerInfoContainerContent}>
                <a href="tel:+79999999999" className={styles.footerInfoContainerLink}>
                  +7 (999) 999-99-99
                </a>
                <a href="mailto:Yandex@ya.ru" className={styles.footerInfoContainerLink}>
                  Yandex@ya.ru
                </a>
                <div className={styles.footerInfoSocials}>
                <a href="#" className={styles.footerInfoSocialsNetwork}>
                  <img className={styles.footerInfoSocialsIcon} src={VK} alt={'link to VK'} />
                </a>
                <a href="#" className={styles.footerInfoSocialsNetwork}>
                  <img className={styles.footerInfoSocialsIcon} src={TG} alt={'link to TG'} />
                </a>
                <a href="#" className={styles.footerInfoSocialsNetwork}>
                  <img className={styles.footerInfoSocialsIcon} src={WA} alt={'link to WA'} />
                </a>
                </div>
              </nav>
            </address>

            <div className={styles.footerInfoContainer}>
              <h5 className={styles.footerInfoContainerTitle}>Поддержка</h5>

              <nav className={styles.footerInfoContainerContent}>
                <a href="#section-faq" className={styles.footerInfoContainerLink}>
                  Правила сервиса
                </a>
                <a className={styles.footerInfoContainerLink}>
                  Политика приватности
                </a>
                <a className={styles.footerInfoContainerLink}>
                  Пользовательское соглашение и Оферта
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className={styles.copyright}>
          © аааа 2023 Все права защищены.
        </div>
      </div>
    </footer>
  );
});
