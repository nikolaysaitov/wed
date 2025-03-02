import { useCallback, useEffect, useState } from 'react';
import { InputRange } from '@ui/editor/inputs/range/InputRange.tsx';
import { Section2 } from '@ui/editor/sections/Section2.tsx';
import styles from './Survey.module.scss';

import {
  ALL_OPTIONS_QUESTION_CARD_TYPES,
  createQuestionCard,
  IQuestionCard,
  MAX_QUESTION_CARDS,
  questionCardType
} from './SurveyItem.model.ts';
import { RadioInput } from '@ui/editor/inputs/radio/RadioInput.tsx';
import { Button } from '@ui/button/Button.tsx';
import { InputString } from '@ui/editor/inputs/string/InputString.tsx';
import { Icon } from '@ui/icon/icon.tsx';
import { v4 as uuid } from 'uuid';

type QuestionCardProps = { index: number; onDelete: (id: string) => void } & IQuestionCard;

const QuestionCard = ({ id, index, type, variants, onDelete }: QuestionCardProps) => {
  const [cardType, setCardType] = useState<questionCardType>(type);
  const [answers, setAnswers] = useState<{ key: string; value: string }[]>([
    { key: uuid(), value: '' }
  ]);

  useEffect(() => {
    if (variants) {
      setAnswers(Object.entries(variants).map(([key, value]) => ({ key, value })));
    }
  }, [variants]);

  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{`Вопрос ${index + 1}`}</p>
      <RadioInput
        value={cardType}
        onChange={(value) => {
          setCardType(value as questionCardType);
          console.log(value);
        }}
        options={ALL_OPTIONS_QUESTION_CARD_TYPES}
      />

      {((type) => {
        switch (type) {
          case 'text':
            return null;
          case 'single':
          case 'multi':
            return (
              <div className={styles.variants}>
                <p className={styles.variantsTitle}>Варианты ответа:</p>
                {answers.map(({ key, value }) => (
                  <div className={styles.variant} key={key}>
                    <InputString
                      value={value}
                      theme={'transparent'}
                      rootClassName={styles.variantInput}
                    />
                    <div
                      className={styles.reset}
                      onClick={() => {
                        if (answers.length > 1) {
                          setAnswers((current) => current.filter((v) => v.key !== key));
                        }
                      }}>
                      <Icon icon={'IcNo'} width={12} />
                    </div>
                  </div>
                ))}

                <Button
                  wide
                  onClick={() => {
                    if (answers.length < 6) {
                      setAnswers((current) => [...current, { key: uuid(), value: '' }]);
                    }
                  }}>
                  Добавить вариант ответа
                </Button>
              </div>
            );
        }
      })(cardType)}

      <Button wide onClick={() => onDelete(id)}>
        Удалить вопрос
      </Button>
    </div>
  );
};

type SurveyProps = {
  questions: IQuestionCard[];
};

export const Survey = ({ questions }: SurveyProps) => {
  const [cards, setCards] = useState<IQuestionCard[]>(questions);

  const changeRange = useCallback(
    (value: number) => {
      if (value > cards.length) {
        setCards((current) => [...current, createQuestionCard()]);
      } else if (value < cards.length) {
        setCards((current) => current.filter((_, i) => i !== current.length - 1));
      }
    },
    [cards]
  );

  return (
    <Section2 sectionId={'questions'} title={'Опрос'}>
      <InputRange value={cards.length} onChange={changeRange} />

      <div className={styles.cards}>
        {cards.map((card, i) => (
          <QuestionCard
            key={card.id}
            index={i}
            {...card}
            onDelete={(deletedId) =>
              setCards((current) => current.filter(({ id }) => id !== deletedId))
            }
          />
        ))}
      </div>

      <Button
        wide
        disabled={cards.length >= MAX_QUESTION_CARDS}
        onClick={() => setCards((current) => [...current, createQuestionCard()])}>
        Создать вопрос
      </Button>
    </Section2>
  );
};
