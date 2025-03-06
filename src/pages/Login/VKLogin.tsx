// import { useEffect, useRef, useState } from "react";

// declare global {
//   interface Window {
//     VKIDSDK: any;
//   }
// }

// const VKLogin: React.FC = () => {
//   const vkContainerRef = useRef<HTMLDivElement>(null);
//   const [userData, setUserData] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [test, setTest] = useState("no auth");
//   const loadVKSDK = () => {
//     if (!window.VKIDSDK) {
//       console.error("VKID SDK не загружен");
//       setError("Ошибка загрузки VKID SDK");
//       return;
//     }

//     const VKID = window.VKIDSDK;

//     VKID.Config.init({
//       app: 53174679,
//       redirectUrl: "https://siteinvite.ru/login",
//       responseMode: VKID.ConfigResponseMode.Callback,
//       source: VKID.ConfigSource.LOWCODE,
//       scope: "email", // Заполните нужными доступами по необходимости
//     });

//     const oneTap = new VKID.OneTap();

//     oneTap
//       .render({
//         container: vkContainerRef.current!,
//         showAlternativeLogin: true,
//         styles: {
//           borderRadius: 32,
//           width: 40,
//           height: 40,
//         },
//       })
//       .on(VKID.WidgetEvents.ERROR, (error: string) => {
//         console.error("Ошибка VK:", error);
//         setError("Ошибка авторизации");
//       })
//       .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, async (payload) => {
//         try {
//           setTest("Успешный вход:");
//           const { code, device_id } = payload;
//           const authData = await VKID.Auth.exchangeCode(code, device_id);
//           setUserData(authData);

//           console.log("Успешный вход:", authData);
//           if (authData?.access_token) {
//             // Получаем данные пользователя
//             const userInfo = await VKID.Auth.userInfo(authData.access_token);
//             console.log("Информация о пользователе:", userInfo);
//             setUserData(userInfo);
//           } else {
//             setError("Не удалось получить access_token");
//           }
//         } catch (error) {
//           console.error("Ошибка обмена кода VK:", error);
//           alert("Ошибка обмена кода");
//           setError("Ошибка обмена кода");
//         }
//       });
//     return () => {
//       oneTap.destroy();
//     };
//   };
//   useEffect(() => {
//     if (window.VKIDSDK) {
//       loadVKSDK();
//     } else {
//       const script = document.createElement("script");
//       script.src = "https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js";
//       script.async = true;
//       script.onload = loadVKSDK;
//       script.onerror = () => setError("Ошибка загрузки VKID SDK");
//       document.body.appendChild(script);
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Вход через ВКонтакте</h2>
//       <p>v3 17.38</p>
//       <div ref={vkContainerRef}></div>
//       {test && <p style={{ color: test === "no auth" ? "red" : "green" }}>{test}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
//     </div>
//   );
// };

// export default VKLogin;
import { useEffect, useRef, useState } from 'react';
import styles from './Login.module.scss';
import { getUserData$, loginOAuth, OAuthRequest } from '@api/user';
declare global {
  interface Window {
    VKIDSDK: any;
  }
}

const VKLogin: React.FC = () => {
  const vkContainerRef = useRef<HTMLDivElement>(null);
  // const [userData, setUserData] = useState<any>(null);

  const fetchUserInfo = async ({ type, token }: OAuthRequest) => {
    await loginOAuth({ type: type, token: token }).then(({ newToken }) => {
      if (newToken) {
        getUserData$(newToken).then((info) => {
          console.log('getUserData', info);
        });
      }
    });
  };

  const loadVKSDK = () => {
    if (!window.VKIDSDK) {
      console.error('VKID SDK не загружен');

      return;
    }

    const VKID = window.VKIDSDK;
    const domain = window.location.hostname;
    console.log('domain', domain)
    VKID.Config.init({
      app: 53174679,
      redirectUrl: `https://${domain}/login`,
      responseMode: VKID.ConfigResponseMode.Callback,
      source: VKID.ConfigSource.LOWCODE,
      scope: 'email' // Заполните нужными доступами по необходимости
    });

    const oneTap = new VKID.OneTap();

    oneTap
      .render({
        container: vkContainerRef.current!,
        showAlternativeLogin: true,
        styles: {
          borderRadius: 32,
          width: 40,
          height: 40
        }
      })
      .on(VKID.WidgetEvents.ERROR, (error: string) => {
        console.error('Ошибка VK:', error);
      })
      .on(
        VKID.OneTapInternalEvents.LOGIN_SUCCESS,
        async (payload: { code: string; device_id: string }) => {
          try {
            const { code, device_id } = payload;
            const authData = await VKID.Auth.exchangeCode(code, device_id);
            //  setUserData(authData);

            console.log('Успешный вход:', authData);
            if (authData?.access_token) {
              const credentials: OAuthRequest = {
                type: 'vk',
                token: authData.access_token
              };

              fetchUserInfo(credentials);
              const credentials2: OAuthRequest = {
                type: 'vk',
                token: code
              };

              fetchUserInfo(credentials2);

              // Получаем данные пользователя
              // const userInfo = await VKID.Auth.userInfo(authData.access_token);
              // console.log('Информация о пользователе:', userInfo);
              //setUserData(userInfo);
            } else {
              console.log('Не удалось получить access_token');
            }
          } catch (error) {
            console.error('Ошибка обмена кода VK:', error);
            alert('Ошибка обмена кода');
            console.log('Ошибка обмена кода');
          }
        }
      );
    return () => {
      oneTap.destroy();
    };
  };
  useEffect(() => {
    if (window.VKIDSDK) {
      loadVKSDK();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js';
      script.async = true;
      script.onload = loadVKSDK;
      script.onerror = () => console.log('Ошибка загрузки VKID SDK');
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div ref={vkContainerRef} className={styles.socialIconAuth}></div>
    </div>
  );
};

export default VKLogin;
