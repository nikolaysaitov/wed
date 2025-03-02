import moment from 'moment';

import { IUserInfo } from '@api/user';
import { Button } from '@ui/button/Button.tsx';
import styles from './UserInfoForm.module.scss';

import { Controller, useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ValidationError from '@ui/validationError/ValidationError';

import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';

export type UserInfoFormProps = {
  isLoading: boolean;
  initialInfo: Partial<IUserInfo>;
  onSubmit: (info: IUserInfo) => void;
};

export default function UserInfoForm({
  initialInfo,
  isLoading,
  onSubmit
}: UserInfoFormProps) {
  const SignInSchema = yup.object().shape({
    name: yup.string().required('Введите имя'),
    email: yup
      .string()
      .email('Некорректная электронная почта')
      .test(
        'is-valid-email',
        'Введите действительный адрес электронной почты',
        function (value: unknown) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string);
        }
      )
      .required('Введите почту'),
    weddingDate: yup.string().required('Введите дату свадьбы')
  });
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      name: initialInfo?.name || '',
      email: initialInfo?.email || '',
      weddingDate: initialInfo?.weddingDate
        ? moment(initialInfo.weddingDate).format('YYYY-MM-DD')
        : moment().format('YYYY-MM-DD')
    }
  });

  function onSubmitHandler(data: Partial<IUserInfo>) {
    const updatedData = {
      ...data,
      email: data.email || '',
      name: data.name || '',
      weddingDate: data.weddingDate
        ? String(moment(data.weddingDate).format('YYYY-MM-DD'))
        : ''
    };

    onSubmit(updatedData);
  }
  const wedDate = useWatch({ control, name: 'weddingDate' });

  useEffect(() => {
    console.log(
      document.querySelectorAll('.react-date-picker__inputGroup__divider')
    );
    const hideDividers = (display: string) => {
      document
        .querySelectorAll('.react-date-picker__inputGroup__divider')
        .forEach((el) => {
          (el as HTMLElement).style.display = display;
        });
    };
    if (!wedDate) {
      hideDividers('none');
    } else {
      hideDividers('inline-block');
    }
  }, [wedDate]);
  return (
    <div className={styles.form}>
      <div>
        <div className={styles.borderInput}>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            render={({ field }) => (
              <input
                className={styles.input}
                placeholder="Имя"
                autoComplete="name"
                {...field}
                value={field.value || ''}
              />
            )}
            name="name"
          />
        </div>
        {errors.name && <ValidationError errorText={errors.name.message} />}
      </div>
      <div>
        <div className={styles.borderInput}>
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
        {errors.email && <ValidationError errorText={errors.email.message} />}
      </div>
      <div>
        <div className={styles.borderInput}>
          <Controller
            control={control}
            name="weddingDate"
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                className={styles.customDatePicker}
                dayPlaceholder="Дата свадьбы"
                monthPlaceholder=""
                yearPlaceholder=""
                format="dd-MM-y"
                value={field.value || null}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>
        {errors.weddingDate && (
          <ValidationError errorText={errors.weddingDate.message} />
        )}
      </div>

      <Button wide disabled={isLoading} onClick={handleSubmit(onSubmitHandler)}>
        {isLoading ? 'Сохранение' : 'Сохранить'}
      </Button>
    </div>
  );
}
