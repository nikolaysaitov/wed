import styles from './FormEmail.module.scss';

export type FormProps = {
  // valueEmail: string;
  onSubmitEmail: (e: React.FormEvent) => void;
  handleChangeAuth: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormEmail({ onSubmitEmail, handleChangeAuth }: FormProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Войти</h2>
      <form className={styles.form} onSubmit={onSubmitEmail}>
        <input
          type="text"
          placeholder="E-mail"
          className={styles.input}
          name="email"
          // value={valueEmail}
          onChange={handleChangeAuth}
        />
        <button className={styles.button}>Получить код</button>
      </form>
    </div>
  );
}
