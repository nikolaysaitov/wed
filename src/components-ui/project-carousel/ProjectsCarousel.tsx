import { useEffect, useRef, useState } from 'react';

import { DefaultCardProfile } from '@ui/card/profile-card/DefaultCardProfile';
import { Button } from '../button/Button.tsx';
import plus from '../../../public/assets/svg/plus.svg';
import styles from './ProjectsCarousel.module.scss';
import { ShortProject } from '@api/project/project.ts';
import {
  InvitationTypeI18n,
  ShortInvitation
} from '@api/invitation/invitation.ts';

type Props = {
  project: ShortProject;
  isPosition: boolean;
  deleteProject: (id: string) => void;
};

export function ProjectsCarousel({
  isPosition,
  project,
  deleteProject
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [templateName, setTemplateName] = useState<string>(
    project?.templateName
  );
  const [invitations, setInvitations] = useState<ShortInvitation[]>(
    project?.invitations ?? []
  );

  useEffect(() => {
    setInvitations(project?.invitations ?? []);
  }, [project]);

  useEffect(() => {
    console.log(project);
    setTemplateName(project?.templateName);
  }, [project]);

  function handleBackClick() {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  const buttonClicked = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.block}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>{templateName}</h3>

          <div className={styles.headerActions}>
            <Button width={true} onClick={() => deleteProject(project.id)}>
              Удалить
            </Button>
            <Button width={true} disabled={true}>
              Опубликовать все
            </Button>
          </div>
        </div>

        <div className={styles.cards}>
          <div
            className={`${isPosition ? styles.slider : styles.grid}`}
            onLoad={handleBackClick}
          >
            {invitations.map(({ type, id, status }) => (
              <DefaultCardProfile
                key={id}
                nameCard={InvitationTypeI18n[type]}
                image={`/api/v1/templates/assets/${project.templateId}`}
                buttonDelete={true}
                published={status === 'published'}
                className={''}
              >
                <Button wide link={`/editor/${id}`}>
                  {'Редактировать'}
                </Button>

                <Button wide disabled={status !== 'completed'}>
                  {'Опубликовать'}
                </Button>
              </DefaultCardProfile>
            ))}
            <button className={styles.button} ref={buttonRef}>
              <img
                src={plus}
                alt="кнопка добавления макета"
                className={styles.plus}
                onClick={() => {
                  setIsOpenPopup(true);
                }}
              ></img>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${isOpenPopup ? styles.popup : styles.noPopup}`}
        onClick={() => setIsOpenPopup(false)}
      >
        <div
          className={styles.popupContainer}
          onClick={(e) => buttonClicked(e)}
        >
          <button
            className={styles.popupExit}
            onClick={() => setIsOpenPopup(false)}
          ></button>
          <h4 className={styles.popupTitle}>Добавление гостя</h4>
          <p className={styles.popupText}>
            Вы не сможете отменить это действие
          </p>
          <div className={styles.popupButtons}>
            <Button wide={true} width={true}>
              Готово
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
