import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from './UserContext.ts';
import { User, getUserData$, resetUser, getUserData } from '@api/user';
import { api } from '@api/api.ts';

interface UserProviderProps {
  children: ReactNode | ReactNode[] | null;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [requestInterceptor, setRequestInterceptor] = useState<number | null>(
    null
  );
  const [responseInterceptor, setResponseInterceptor] = useState<number | null>(
    null
  );

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    setRequestInterceptor(
      api.interceptors.request.use((config) => {
        if (config.headers && jwt) {
          config.headers['Authorization'] = `Bearer ${jwt}`;
        }

        return config;
      })
    );

    setResponseInterceptor(
      api.interceptors.response.use(
        (success) => success,
        (error) => {
          console.log(error);
        }
      )
    );

    return () => {
      if (requestInterceptor) {
        api.interceptors.request.eject(requestInterceptor);
      }

      if (responseInterceptor) {
        api.interceptors.request.eject(responseInterceptor);
      }
    };
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt !== null) {
      getUserData$()
        .then(() => {})
        .catch((err) => {
          console.log(`Переданный токен некорректен: ${err}`);
          localStorage.removeItem('jwt');
          navigate('/login', { replace: true });
        });
    } else {
      resetUser();
    }
  }, []);

  useEffect(() => {
    getUserData().then((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
