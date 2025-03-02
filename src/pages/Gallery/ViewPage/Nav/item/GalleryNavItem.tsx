import { useNavigate } from 'react-router-dom';

import { Button } from '@ui/button/Button.tsx';
import styles from './GalleryNavItem.module.scss';

type EditorNavItemProps = {
  image?: string;
  name: string;
  link: string;
  editable?: boolean;
  onEdit: () => void;
};

export const GalleryNavItem = ({
  name,
  link,
  onEdit,
  editable = false
}: EditorNavItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.card} ${editable && styles.editable}`}
      onClick={() => {
        navigate(`/gallery/${link}`);
      }}
    >
      <img
        src={`/api/v1/templates/assets/${link}`}
        className={styles.img}
        alt={`${name} preview`}
      ></img>
      <p className={styles.title}>{name}</p>
      <Button
        wide
        disabled={!editable}
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
      >
        Редактировать
      </Button>
    </div>
  );
};
