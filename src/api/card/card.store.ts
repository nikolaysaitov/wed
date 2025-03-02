import { createEffect, createStore } from 'effector';

import { Card } from './card.ts';
import { createCard, getAllCards } from './card.api.ts';

export const $cards = createStore<Card[]>([]);

export const getCards$ = createEffect(async () => {
  return await getAllCards();
});

export const crateCard$ = createEffect(async (card: Partial<Card>) => {
  return await createCard(card);
});

$cards.on(getCards$.doneData, (_, cards) => cards);
$cards.on(crateCard$.doneData, (cards, card) => [...cards, card]);
