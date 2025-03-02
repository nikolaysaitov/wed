import { useState, useCallback, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base';
import { useUnit } from 'effector-react';
import {
  genderType,
  IUserInfo,
  $user,
  deleteUser$,
  updateUser$
} from '@api/user';
import PopupDelete from '@ui/popupDelete/PopupDelete.tsx';
import { Button } from '@ui/button/Button.tsx';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';
import UserInfoForm from './form/UserInfoForm.tsx';
import styles from './UserInfo.module.scss';

export function UserInfo() {
  const currentUser = useUnit($user);
  const [gender, setGender] = useState<genderType>(
    currentUser?.gender ?? 'women'
  );
  const [popupDelete, setPopupDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const switchPopup = () => setPopupDelete((value) => !value);

  useEffect(() => {
    if (currentUser) {
      setGender(currentUser.gender);
    }
  }, [currentUser]);

  const updateGender = useCallback(() => {
    if (currentUser) {
      const newGender = gender === 'women' ? 'men' : 'women';

      updateUser$({ id: currentUser.id, gender: newGender }).then(() => {});
    }
  }, [currentUser, gender]);

  const updateUserInfo = (info: IUserInfo) => {
    if (currentUser) {
      setIsLoading(true);

      updateUser$({ id: currentUser.id, ...info }).then((user) => {
        console.log(user);
        setIsLoading(false);
      });
    }
  };

  return (
    <CheckCurrentSection className={styles.page} sectionName={'profile'}>
      <h2 className={styles.title}>Личные данные</h2>
      <div className={styles.contain}>
        <div className={styles.avatar}>
          <button className={styles.buttonLeft} onClick={updateGender} />
          <div className={`${styles[gender]}`} />
          <button className={styles.buttonRight} onClick={updateGender} />
        </div>

        <div className={styles.information}>
          <h3 className={styles.subtitle}>Обо мне</h3>

          <UserInfoForm
            initialInfo={{ ...currentUser }}
            isLoading={isLoading}
            onSubmit={updateUserInfo}
          />

          <Button wide onClick={switchPopup}>
            Удалить аккаунт
          </Button>

          {popupDelete && (
            <ClickAwayListener onClickAway={switchPopup}>
              <PopupDelete
                title="Удалить аккаунт?"
                onDelete={() =>
                  currentUser?.id ? deleteUser$(currentUser?.id) : {}
                }
                onBack={switchPopup}
              />
            </ClickAwayListener>
          )}
        </div>
      </div>
    </CheckCurrentSection>
  );
}
