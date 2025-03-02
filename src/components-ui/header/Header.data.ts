import { sectionType } from '../../context/current-view/CurrentViewContext.ts';

export interface HeaderItem {
  title: string;
  link: string;
  type: sectionType;
}

export const HEADER: HeaderItem[] = [
  {
    title: 'Главная',
    link: '#main',
    type: 'main'
  },
  {
    title: 'Как это работает',
    link: '#instruction',
    type: 'instruction'
  },
  {
    title: 'Каталог',
    link: 'catalog',
    type: 'catalog'
  },
  {
    title: 'Стоимость',
    link: '#price',
    type: 'price'
  },
  {
    title: 'Индивидуальный дизайн',
    link: '#footer',
    type: 'faq'
  }
];
