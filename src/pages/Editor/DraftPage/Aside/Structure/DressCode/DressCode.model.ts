import { v4 as uuid } from 'uuid';

export interface IColorCard {
  id: string;
  value: string;
}

export const createColorCard = (card?: Partial<IColorCard>): IColorCard => ({
  id: card?.id ?? uuid(),
  value: card?.value ?? randomHexColor()
});

export function randomHexColor() {
  const hexValues = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f'
  ];
  let hexColor = '#';

  for (let i = 0; i < 6; i++) {
    hexColor += hexValues[Math.floor(Math.random() * 16)];
  }

  return hexColor;
}

export const MIN_COUNT = 3;
export const MAX_COUNT = 6;
