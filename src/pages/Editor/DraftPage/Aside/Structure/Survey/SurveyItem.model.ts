import { v4 as uuid } from 'uuid';

export type questionCardType = 'single' | 'multi' | 'text';

export interface IQuestionCard {
  id: string;
  type: questionCardType;
  variants?: Record<string, string>;
}

export const createQuestionCard = (card?: Partial<IQuestionCard>): IQuestionCard => ({
  id: card?.id ?? uuid(),
  type: card?.type ?? 'single',
  variants: {
    1: ''
  }
});

export const ALL_QUESTION_CARD_TYPES: questionCardType[] = ['single', 'multi', 'text'];

export const ALL_OPTIONS_QUESTION_CARD_TYPES: { key: questionCardType; value: string }[] = [
  { key: 'single', value: 'Один вариант выбора' },
  { key: 'multi', value: 'Несколько вариантов выбора' },
  { key: 'text', value: 'Свободное поле' }
];

export const MAX_QUESTION_CARDS = 5;
