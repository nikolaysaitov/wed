export interface ProfileFilter {
  title: string;
  link: string;
}

export interface UsersGuests {
  name: string;
  status: boolean;
  additional: Array<string>;
}

export interface GuestAnswers {
  'key1': string;
  'key2': string;
  'key3': string;
  'key4': string;
}

export const FILTER: ProfileFilter[] = [
  {
    title: 'Все',
    link: 'all',
  },
  {
    title: 'Принятые',
    link: 'true',
  },
  {
    title: 'Отклоненные',
    link: 'false',
  },
  {
    title: 'Опрос',
    link: 'survey',
  }
];

export const GUESTS: UsersGuests[] = [
  {
    name: 'Олег',
    status: true,
    additional: ['Наташа', 'Люба'],
  },
  {
    name: 'Вадим',
    status: false,
    additional: ['Никита'],
  },
  {
    name: 'Петр Иванович',
    status: true,
    additional: []
  }
];

export const ANSWERS: GuestAnswers[] = [
  {
    'key1': 'курица',
    'key2': 'yes',
    'key3': 'yes',
    'key4': 'no'
  },
  {
    'key1': 'курица',
    'key2': 'yes',
    'key3': 'yes',
    'key4': 'no'
  },
  {
    'key1': 'курица',
    'key2': 'yes',
    'key3': 'yes',
    'key4': 'no'
  }
]