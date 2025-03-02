import { useEffect, useState, useRef, ReactNode } from 'react';

import cardLike from '../../../../public/assets/svg/cardLike.svg';
import cardLikeActive from '../../../../public/assets/svg/likeCardActive.svg';
import closeIcon from '../../../../public/assets/svg/close.svg';
import infoIcon from '../../../../public/assets/images/infoIcon.png';
import styles from './DefaultCard.module.scss';
import { ITemplate } from '@api/templates/template.ts';
import { useCurrentView } from '../../../context/current-view/CurrentViewContext.ts';

type DefaultCardProps = {
  like: boolean;
  buttonLike: boolean;
  buttonDelete: boolean;
  handleLikeCard: (id: string, like: boolean) => void;
  children?: ReactNode[];
} & ITemplate;

export const DefaultCard = ({
  like,
  link,
  name,
  description,
  handleLikeCard,
  buttonDelete,
  buttonLike,
  children
}: DefaultCardProps) => {
  const { mediaView } = useCurrentView();

  const [isDescription, setIsDescription] = useState(false);
  const [isLike, setIsLike] = useState(like);
  const arrHotButtons: string[] = ['С фото', 'Хит'];

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef?.current?.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOpen]);

  useEffect(() => {
    setIsLike(like);
  }, [like]);

  //Они специально разделены
  function visibilityDescription() {
    setIsDescription(true);
  }

  function visibilityDescriptionOut() {
    setIsDescription(false);
  }

  function changeLike(id: string) {
    setIsLike((value) => !value);
    handleLikeCard(id, !isLike);
  }

  return (
    <div className={styles.contain}>
      {buttonDelete && <button className={styles.deleteButton}></button>}
      <div className={styles.hotWordContainer}>
        {arrHotButtons.map((hotButton: string) => (
          <div key={hotButton} className={styles.hotWord}>
            {hotButton}
          </div>
        ))}
      </div>

      {buttonLike && (
        <button
          id={link}
          onClick={() => changeLike(link)}
          className={styles.likeButton}
        >
          <img
            className={styles.icon}
            src={isLike ? cardLikeActive : cardLike}
            alt="like card"
          />
        </button>
      )}

      <div className={styles.containerImage}>
        <img
          src={`/api/v1/templates/assets/${link}`}
          className={styles.image}
          onMouseOver={
            mediaView !== 'mobile' ? visibilityDescription : undefined
          }
          alt={''}
        />

        <div
          className={isDescription ? styles.description : styles.noneVisibility}
          onMouseOver={visibilityDescription}
          onMouseOut={visibilityDescriptionOut}
        >
          <h5 className={styles.descriptionTitle}>Описание:</h5>
          <p className={styles.descriptionText}>{description}</p>
        </div>
      </div>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{name}</p>
        <img
          className={
            isModalOpen ? styles.iconDecriptionActive : styles.iconDecription
          }
          src={infoIcon}
          alt="info"
          onClick={() => {
            mediaView !== 'mobile'
              ? setIsDescription(!isDescription)
              : setIsModalOpen(true);
          }}
        />
      </div>

      <div className={styles.buttons}>{children}</div>
      <div className={styles.modalContainer}>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <div className={styles.modalHeader}>
                <img
                  className={styles.iconDecription}
                  src={closeIcon}
                  alt="info"
                  onClick={closeModal}
                />
              </div>
              <p className={styles.modalTitle}>Описание:</p>
              <p className={styles.modalText}>{description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
