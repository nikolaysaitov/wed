import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import Ya from '../../../public/assets/svg/ya.svg';
import { loginOAuth, getUserData$, OAuthRequest } from '@api/user';
const YandexLogin: React.FC = () => {
  const navigate = useNavigate();

  const CLIENT_ID: string = 'e958609fb64e4af88eff14bc3cacf280';
  const domain = window.location.hostname;
  console.log('domain', domain)
  const REDIRECT_URI: string = `https://${domain}/login`;
  const handleLoginYa = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=token&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = authUrl;
  };

  const fetchUserInfo = async ({ type, token }: OAuthRequest) => {
    await loginOAuth({ type: type, token: token }).then(({ newToken }) => {
      if (newToken) {
        getUserData$(newToken).then((info) => {
          console.log('getUserData', info);
        });
      }
    });
  };

  useEffect(() => {
    const hash = window.location.hash.substring(1); // Получаем часть после #
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    console.log('window.location.hash', window.location.hash);
    if (accessToken) {
      const credentials: OAuthRequest = {
        type: 'yandex',
        token: accessToken
      };

      fetchUserInfo(credentials);
    }
  }, [navigate]);

  return (
    <div onClick={handleLoginYa}>
      <a href="#" className={styles.socialIconAuth}>
        <img className={styles.socialIconAuth} src={Ya} alt={'link to Ya'} />
      </a>
    </div>
  );
};
export default YandexLogin;
