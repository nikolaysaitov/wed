import { Guest } from '@api/guest/guest.ts';

export interface User {
  id: string;
  name: string;
  email: string;
  weddingDate: string;
  gender: genderType;
  cardLike: string[];
  likedTemplates: string[];
  guests: Guest[];
  invitations: string[];
}

export interface UserLikeCard {
  userId: string;
  cardId: string;
}

export type UserRequirements = Partial<User> &
  Required<Pick<User, 'id' | 'email' | 'gender'>>;

export type IUserUpdate = Partial<User> & Required<Pick<User, 'id'>>;

export type ICheckUser = Omit<User, 'id' | 'cardLike'> & Credentials;

export type IUserForCode = Pick<User, 'email'>;

export type IUserInfo = Pick<User, 'email' | 'name' | 'weddingDate'>;

export interface Credentials {
  password: string;
  email: string;
}

export type genderType = 'women' | 'men';
