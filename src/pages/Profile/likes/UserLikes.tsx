import { UIEvent, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import { $user } from "@api/user";
import { CardList } from "@ui/cardsList/CardsList.tsx";
import { CheckCurrentSection } from "@ui/checkCurrentSection/CheckCurrentSection.tsx";
import styles from "./UserLikes.module.scss";
import TemplateService from "@api/templates/template.service.ts";
import { ITemplate } from "@api/templates/template.ts";

export function UserLikes() {
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(6);
  const user = useUnit($user);

  useEffect(() => {
    if (!user) {
      return;
    }

    setLikedCards(user.likedTemplates);

    TemplateService.getLikedTemplates(user.id).then((tmpls) => {
      console.log(tmpls);
      setTemplates(tmpls);
    });
  }, []);

  function showMoreTemplates({ currentTarget }: UIEvent<HTMLElement>) {
    const bottom =
      Number(
        (currentTarget.scrollHeight - currentTarget.scrollTop).toFixed(0),
      ) -
        currentTarget.clientHeight <
      250;
    const loading =
      Number(
        (currentTarget.scrollHeight - currentTarget.scrollTop).toFixed(0),
      ) -
        currentTarget.clientHeight <
      450;
    if (counter <= templates.length) {
      if (loading) {
        setIsLoading(true);
      }
      if (bottom) {
        setCounter(counter + 6);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <CheckCurrentSection
      className={styles.page}
      sectionName={"like"}
      onScroll={showMoreTemplates}
    >
      <h2 className={styles.title}>Избранное</h2>
      <CardList
        cards={templates}
        likedCards={likedCards}
        buttonLast=""
        buttonFirst="Редактировать"
        buttonFirstNone={true}
        buttonLike={true}
        buttonDelete={false}
        handleLikeCard={() => {}}
        counter={counter}
        isLoading={isLoading}
      />
    </CheckCurrentSection>
  );
}
