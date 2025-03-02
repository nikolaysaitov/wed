import { Button } from '@ui/button/Button.tsx';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';
import { logout, resetUser } from '@api/user';
import styles from './UserExit.module.scss';

export function UserExit() {
  return (
    <CheckCurrentSection className={styles.contain} sectionName={'profile'}>
      <div className={styles.popup}>
        <h3 className={styles.title}>Выйти из аккаутна?</h3>
        <div className={styles.buttons}>
          <Button
            wide
            onClick={() => {
              logout()
                .then(() => resetUser())
                .catch((err) => console.log(err));
            }}>
            Да
          </Button>

          <Button link="/profile/me" wide>
            Нет
          </Button>
        </div>
      </div>
    </CheckCurrentSection>
  );
}
