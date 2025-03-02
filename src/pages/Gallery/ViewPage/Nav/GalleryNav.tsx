import { ITemplate } from '@api/templates/template.ts';
import { GalleryNavItem } from '@pages/Gallery/ViewPage/Nav/item/GalleryNavItem.tsx';
import styles from './GalleryNav.module.scss';

type EditorNavProps = {
  cards: ITemplate[];
  onEdit: (id: string) => void;
};

export const GalleryNav = ({ cards, onEdit }: EditorNavProps) => {
  return (
    <nav className={styles.nav}>
      {cards.map(({ name, link, editable }) => (
        <GalleryNavItem
          key={link}
          name={name}
          link={link}
          editable={editable}
          onEdit={() => (editable ? onEdit(link) : undefined)}
        />
      ))}
    </nav>
  );
};
