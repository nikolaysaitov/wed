import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputString } from '@ui/inputs/string/InputString.tsx';
import { Button } from '@ui/button/Button.tsx';
import { Layout } from '@ui/layout/Layout.tsx';
import { login, sendCode, getUserData$, UserRequirements } from '@api/user';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// import VK from '../../../public/assets/svg/icVkBW.svg';
// import Google from '../../../public/assets/svg/icGoogleBW.svg';
import Apple from '../../../public/assets/svg/icAppleBW.svg';

import styles from './Login.module.scss';

import otherStyles from '../Profile/info/UserInfo.module.scss';
import ValidationError from '../../components-ui/validationError/ValidationError.tsx';
import VKLogin from './VKLogin.tsx';
import YandexLogin from './YandexLogin.tsx';
export const Login = () => {
  const [currentUser, setCurrentUser] = useState<UserRequirements | undefined>(
    undefined
  );
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [disabledButton, setDisabledButton] = useState<boolean>(false);
  const navigate = useNavigate();

  const SignInSchema = yup.object().shape({
    email: yup
      .string()
      .email('Некорректная электронная почта')
      .test(
        'is-valid-email',
        'Введите адрес электронной почты',
        function (value: unknown) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
        }
      )
      .required('Введите почту')
  });
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: ''
    }
  });

  const handleEmail = async (data: { email: string }) => {
    console.log('data', data);
    setEmail(data.email);
    setDisabledButton(true);
    await sendCode({ email: data.email }).then((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  };

  const handleCode = async () => {
    await login({ email, password: code }).then(({ token }) => {
      console.log(token);

      if (token) {
        getUserData$(token).then((info) => {
          console.log(info);
          navigate('/profile/me', { replace: true });
        });
      }
    });
  };

  return (
    <CheckCurrentSection sectionName={'login'}>
      <Layout>
        <div className={styles.contain}>
          {!currentUser && (
            <>
              <h4 className={styles.title}>Войти</h4>
              <div className={styles.box}>
                <div>
                  <div className={otherStyles.borderInput}>
                    <Controller
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field }) => (
                        <input
                          className={styles.input}
                          placeholder="E-mail"
                          autoComplete="email"
                          type="email"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                      name="email"
                    />
                  </div>

                  {errors.email && (
                    <ValidationError errorText={errors.email?.message} />
                  )}
                </div>

                <Button
                  wide
                  onClick={handleSubmit(handleEmail)}
                  disabled={disabledButton ? true : false}
                >
                  Получить код
                </Button>

                {/* <Button
                  wide
                  onClick={handleEmail}
                  disabled={disabledButton ? true : false}
                >
                  Получить код
                </Button> */}
                <div className={styles.alternative}>
                  <p className={styles.text}>или авторизация через:</p>
                  <div className={styles.socials}>
                    {/* <a href="#" className={styles.socialIconLink}>
                      <img
                        className={styles.socialIcon}
                        src={VK}
                        alt={'link to VK'}
                      />
                    </a> */}
                    <VKLogin />
                    {/* <a href="#" className={styles.socialIconLink}>
                      <img
                        className={styles.socialIcon}
                        src={Google}
                        alt={'link to Google'}
                      />
                    </a> */}
                    <YandexLogin />
                    <a href="#" className={styles.socialIconLink}>
                      <img
                        className={styles.socialIcon}
                        src={Apple}
                        alt={'link to Apple'}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentUser && (
            <>
              <h4 className={styles.title}>Войти</h4>
              <div className={styles.box}>
                <InputString
                  theme={'transparent'}
                  autoComplete={'none'}
                  rootClassName={styles.input}
                  placeholder="Код"
                  onEnter={setCode}
                />

                <Button wide onClick={handleCode}>
                  Войти
                </Button>
              </div>
            </>
          )}
        </div>
      </Layout>
    </CheckCurrentSection>
  );
};
