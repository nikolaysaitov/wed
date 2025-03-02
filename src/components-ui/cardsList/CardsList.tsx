import { DefaultCard } from '../card/defaultCard/DefaultCard';
import Preloader from '../Preloader/Preloader';
import styles from './CardList.module.scss';
import { ITemplate } from '@api/templates/template.ts';
import { Button } from '@ui/button/Button.tsx';
import { useUnit } from 'effector-react';
import { $user } from '@api/user';
import { useCallback } from 'react';
import invitationService from '@api/invitation/invitation.service.ts';
import { useNavigate } from 'react-router-dom';

type CardListProps = {
  cards: ITemplate[];
  likedCards?: string[];
  buttonLast: string;
  buttonFirst: string;
  buttonLike: boolean;
  buttonDelete: boolean;
  buttonFirstNone: boolean;
  handleLikeCard: (id: string, like: boolean) => void;
  counter: number;
  isLoading: boolean;
};

export const CardList = ({
  cards,
  likedCards = [],
  handleLikeCard,
  ...props
}: CardListProps) => {
  const user = useUnit($user);
  const navigate = useNavigate();

  const createInvitation = useCallback(
    (templateId: string) => {
      if (!user) return;

      invitationService
        .createInvitation({ userId: user.id, templateId })
        .then(({ id }) => {
          if (!id) return;
          navigate(`/editor/${id}`);
        });
    },
    [user, navigate]
  );

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {cards.map((card) => (
          <DefaultCard
            key={card.link}
            {...card}
            like={likedCards?.includes(card.link)}
            handleLikeCard={handleLikeCard}
            {...props}
          >
            <Button
              wide
              onClick={() => createInvitation(card.link)}
              disabled={!card.editable}
            >
              Редактировать
            </Button>

            <Button
              wide
              link={`/gallery/${card.link}`}
              disabled={!card.editable}
            >
              Демо-версия
            </Button>
          </DefaultCard>
        ))}
      </div>
      {props.isLoading && <Preloader />}
    </div>
  );
};
