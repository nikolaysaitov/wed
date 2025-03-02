import styles from './DefaultCardProfile.module.scss';
import { ReactNode } from 'react';

type DefaultCardProps = {
  nameCard: string;
  image?: string;
  buttonDelete: boolean;
  published: boolean;
  className?: string;
  children?: ReactNode[];
};

export const DefaultCardProfile = ({
  nameCard,
  image,
  buttonDelete,
  published,
  className,
  children
}: DefaultCardProps) => {
  return (
    <div className={`${styles.contain} ${className}`}>
      <button
        className={buttonDelete ? styles.deleteButton : styles.noneVisibility}
      ></button>

      <div className={styles.containerImage}>
        <img className={styles.image} alt={''} src={image} />
        <div className={`${published ? styles.banner : styles.noBanner}`}>
          Опубликовано
        </div>
      </div>

      <p className={styles.title}>{nameCard}</p>

      <div className={styles.buttons}>
        {children}
        {/*<Button wide>{buttonFirst}</Button>*/}

        {/*{buttonLast && (*/}
        {/*  <Button wide disabled={buttonLastDisabled}>*/}
        {/*    {buttonLast}*/}
        {/*  </Button>*/}
        {/*)}*/}
      </div>
    </div>
  );
};
