import { useCallback } from 'react';

import { InputString } from '@ui/editor/inputs/string/InputString.tsx';
import { Button } from '@ui/button/Button.tsx';
import { Section2 } from '@ui/editor/sections/Section2.tsx';
import { InputRange } from '@ui/editor/inputs/range/InputRange.tsx';
import { IColorCard, MAX_COUNT, MIN_COUNT, randomHexColor } from './DressCode.model.ts';
import styles from './DressCode.module.scss';
import { useInvitationStore } from '@api/invitation/invitation-last.store.ts';

type ColorCardProps = { index: number } & IColorCard;

export const ColorCard = ({ index, value }: ColorCardProps) => {
  return (
    <div className={styles.card}>
      <p className={styles.cardTitle}>{`Цвет ${index + 1}`}</p>

      <InputString
        type={'color'}
        theme={'transparent'}
        value={value}
        rootClassName={styles.colorRootInput}
      />
    </div>
  );
};

export const DressCode = () => {
  const cards = useInvitationStore(({ sections }) => sections.dresscode.palette);
  const addPaletteItem = useInvitationStore(({ addPaletteItem }) => addPaletteItem);
  const deleteLastPaletteItem = useInvitationStore(
    ({ deleteLastPaletteItem }) => deleteLastPaletteItem
  );

  const changeRange = useCallback(
    (value: number) => {
      if (value > cards.length) {
        addPaletteItem(randomHexColor());
      } else if (value < cards.length) {
        deleteLastPaletteItem();
      }
    },
    [cards]
  );

  return (
    <Section2 sectionId={'dresscode'} title={'Дресс-код'}>
      <div className={styles.container}>
        <InputRange value={cards.length} start={MIN_COUNT} end={MAX_COUNT} onChange={changeRange} />

        <div className={styles.cards}>
          {cards.map((card, i) => (
            <ColorCard key={card.id} index={i} {...card} />
          ))}
        </div>

        <div className={styles.actions}>
          <Button
            wide
            disabled={cards.length >= MAX_COUNT}
            onClick={() => addPaletteItem(randomHexColor())}>
            Добавить
          </Button>
          <Button wide disabled={cards.length <= MIN_COUNT} onClick={() => deleteLastPaletteItem()}>
            Удалить
          </Button>
        </div>
      </div>
    </Section2>
  );
};
