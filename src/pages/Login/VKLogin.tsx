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
//   const[test, setTest] = useState('no auth')
//   const loadVKSDK = () => {
//     if (!window.VKIDSDK) {
//       console.error("VKID SDK не загружен");
//       setError("Ошибка загрузки VKID SDK");
//       return;
//     }

//     const VKID = window.VKIDSDK;

//     VKID.Config.init({
//       app: 53174679, // Замените на свой ID приложения
//       redirectUrl: "https://wed-izl1.vercel.app/login",
//       responseMode: VKID.ConfigResponseMode.Callback,
//       source: VKID.ConfigSource.LOWCODE,
//       scope: "email",
//     });

//     const oAuth = new VKID.OAuthList();
//     oAuth
//       .render({
//         container: vkContainerRef.current!,
//         oauthList: ["vkid"],
//       })
//       .on(VKID.WidgetEvents.ERROR, (error: string) => {
//         console.error("Ошибка VK:", error);
//         setError("Ошибка авторизации");
//       })
//       .on(VKID.OAuthListInternalEvents.LOGIN_SUCCESS, async (payload: any) => {
//         try {
//             setTest("Успешный вход:");
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
//           alert("Ошибка обмена кода")
//           setError("Ошибка обмена кода");
//         }
//       });

//     return () => {
//       oAuth.destroy();
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
//       {test && <p style={{ color: test === 'no auth' ? "red" : "green" }}>{test}</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
//     </div>
//   );
// };

// export default VKLogin;
import { useEffect, useState } from "react";

declare global {
  interface Window {
    VKIDSDK: any;
  }
}

const VKLogin: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [test, setTest] = useState("no auth");

  useEffect(() => {
    if (!window.VKIDSDK) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@vkid/sdk@latest/dist-sdk/umd/index.js";
      script.async = true;
      script.onload = () => console.log("VKID SDK загружен");
      script.onerror = () => setError("Ошибка загрузки VKID SDK");
      document.body.appendChild(script);
    }
  }, []);

  const handleLogin = async () => {
    if (!window.VKIDSDK) {
      setError("VKID SDK не загружен");
      return;
    }

    const VKID = window.VKIDSDK;

    VKID.Config.init({
      app: 53174679, // ID вашего приложения
      redirectUrl: "https://wed-izl1.vercel.app/login",
      responseMode: VKID.ConfigResponseMode.Callback,
      scope: "email",
    });

    try {
      const authData = await VKID.Auth.openOAuthPopup();
      console.log("Авторизация успешна:", authData);
      
      if (authData?.code) {
        const tokenData = await VKID.Auth.exchangeCode(authData.code, authData.device_id);
        console.log("Токены:", tokenData);
        setUserData(tokenData);
        setTest("Успешный вход!");

        if (tokenData?.access_token) {
          const userInfo = await VKID.Auth.userInfo(tokenData.access_token);
          console.log("Информация о пользователе:", userInfo);
          setUserData(userInfo);
        } else {
          setError("Не удалось получить access_token");
        }
      } else {
        setError("Не удалось получить код авторизации");
      }
    } catch (error) {
      console.error("Ошибка авторизации VK:", error);
      setError("Ошибка авторизации");
    }
  };

  return (
    <div>
      <h2>Вход через ВКонтакте</h2>
      <p>v3 17.38</p>

      {/* Кастомная кнопка для входа */}
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#0077FF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Войти через VK
      </button>

      {test && <p style={{ color: test === "no auth" ? "red" : "green" }}>{test}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
};

export default VKLogin;
