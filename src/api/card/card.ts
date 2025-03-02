export interface Card {
  _id: string;
  nameCard: string;
  description: string;
  categories: CardCategory[];
  image: string;
}

export interface ICard {
  link: string;
  name: string;
  description: string;
  categories: CardCategory[];
  image: string;
}

export interface LikedCard extends Card {
  like: boolean;
}

export enum CardCategory {
  HIT = 'HIT',
  FLOWERS = 'FLOWERS',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  PHOTO = 'PHOTO',
  NO_PHOTO = 'NO_PHOTO',
  MINIMAL = 'MINIMAL',
  COLORS = 'COLORS',
  ABSTRACT = 'ABSTRACT'
}

export const isCard = (card: unknown): card is Card => {
  return !!card && typeof card === 'object' && 'nameCard' in card;
};

export const parseQueryParams = (query: string): CardCategory | string => {
  switch (query.toUpperCase()) {
    case CardCategory.HIT:
      return CardCategory.HIT;
    case CardCategory.FLOWERS:
      return CardCategory.FLOWERS;
    case CardCategory.LIGHT:
      return CardCategory.LIGHT;
    case CardCategory.DARK:
      return CardCategory.DARK;
    case CardCategory.PHOTO:
      return CardCategory.PHOTO;
    case 'NO-PHOTO':
      return CardCategory.NO_PHOTO;
    case CardCategory.MINIMAL:
      return CardCategory.MINIMAL;
    case CardCategory.COLORS:
      return CardCategory.COLORS;
    case CardCategory.ABSTRACT:
      return CardCategory.ABSTRACT;
    default:
      return query;
  }
};
