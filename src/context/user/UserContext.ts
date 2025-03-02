import { createContext, useContext } from 'react';
import { User } from '@api/user';

interface IUserContext {
  user?: User;
}

export const UserContext = createContext<IUserContext>({ user: undefined });

export const useUser = () => useContext(UserContext);
