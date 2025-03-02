export interface ProfileMenu {
  title: string;
  link: string;
}

export const PROFILE: ProfileMenu[] = [
  {
    title: 'Личные данные',
    link: 'me',
  },
  {
    title: 'Мои приглашения',
    link: 'project',
  },
  {
    title: 'Избранное',
    link: 'favorites',
  },
  {
    title: 'Ответы гостей',
    link: 'answers',
  },
  {
    title: 'Выход',
    link: 'exit',
  }
];
