export interface CatalogFilter {
  title: string;
  link: string;
}

export const CATALOG: CatalogFilter[] = [
  {
    title: 'Все макеты',
    link: 'all'
  },
  {
    title: 'Цветочные',
    link: 'flowers'
  },
  {
    title: 'Минимализм',
    link: 'minimal'
  },
  {
    title: 'Яркие цвета',
    link: 'colors'
  },
  {
    title: 'Абстракция',
    link: 'abstract'
  }
];

export const FILTER: CatalogFilter[] = [
  {
    title: 'Популярные',
    link: 'hit'
  },
  {
    title: 'С фото',
    link: 'photo'
  },
  {
    title: 'Без фото',
    link: 'no-photo'
  },
  {
    title: 'Светлые',
    link: 'light'
  },
  {
    title: 'Темные',
    link: 'dark'
  }
];

export type FilterOption =
  | 'hit'
  | 'flowers'
  | 'light'
  | 'dark'
  | 'photo'
  | 'no-photo'
  | 'minimal'
  | 'colors'
  | 'abstract'
  | 'all';
