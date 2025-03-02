import { PaginatedData } from '@api/utils/chunk.ts';

export interface ITemplate {
  name: string;
  description: string;
  categories: cardCategory[];
  editable?: boolean;
  link: string;
  image: string;
}

export type cardCategory =
  | 'hit'
  | 'flowers'
  | 'light'
  | 'dark'
  | 'photo'
  | 'no-photo'
  | 'minimal'
  | 'colors'
  | 'ab';

export type PaginatedTemplate = PaginatedData<ITemplate>;
