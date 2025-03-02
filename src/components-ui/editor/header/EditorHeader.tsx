import { Button } from '@ui/button/Button.tsx';

import styles from './EditorHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@context/user/UserContext.ts';

type EditorHeaderProps = {
  type: 'view' | 'editor';
  onEdit?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
};

export const EditorHeader = ({
  type,
  onEdit,
  onPreview,
  onSave
}: EditorHeaderProps) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      {type === 'view' ? (
        <>
          <Button wide link={'/'}>
            На главную
          </Button>
          {user && (
            <Button wide link={'/profile/project'}>
              Мои приглашения
            </Button>
          )}
          <Button wide disabled={!onEdit} onClick={onEdit}>
            Редактировать
          </Button>
        </>
      ) : (
        <>
          <Button wide onClick={() => navigate(-1)}>
            Выйти из редактора
          </Button>
          <Button wide link={'/gallery'}>
            Выбрать другой макет
          </Button>
          <Button wide disabled={!onPreview} onClick={onPreview}>
            Предпросмотр
          </Button>
          <Button wide disabled={!onSave} onClick={onSave}>
            Сохранить
          </Button>
        </>
      )}
    </div>
  );
};
