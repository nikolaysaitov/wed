import { createEffect, createEvent, createStore } from 'effector';
import { User, UserLikeCard } from './user.ts';
import {
  deleteUserById,
  dislikeCardUserById,
  getUserData,
  likeCardUserById,
  updateUser
} from './user.api.ts';

export const $user = createStore<User | null>(null);
export const resetUser = createEvent<void>('Reset current user');

export const getUserData$ = createEffect(async (token?: string) => {
  return await getUserData(token);
});

export const updateUser$ = createEffect(async (user: Partial<User> & { id: string }) => {
  return await updateUser(user.id, user);
});

export const likeCard$ = createEffect(async ({ cardId, userId }: UserLikeCard) => {
  return await likeCardUserById(userId, cardId);
});

export const dislikeCard$ = createEffect(async ({ cardId, userId }: UserLikeCard) => {
  return await dislikeCardUserById(userId, cardId);
});

export const deleteUser$ = createEffect(async (id: string) => {
  return await deleteUserById(id);
});

$user.on(resetUser, () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('lastVisitedProfilePage');
  return null;
});

$user.on(getUserData$.doneData, (_, payload) => payload);

$user.on(updateUser$.doneData, (state, payload) => {
  if (state) {
    state = { ...state, ...payload };
  }

  return state;
});

$user.on(likeCard$.doneData, (state, payload) => {
  if (state) {
    state = { ...state, ...payload };
  }

  return state;
});

$user.on(dislikeCard$.doneData, (state, payload) => {
  if (state) {
    state = { ...state, ...payload };
  }

  return state;
});

$user.on(deleteUser$.doneData, () => {
  localStorage.removeItem('jwt');
  return null;
});
