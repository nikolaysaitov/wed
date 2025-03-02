import styles from './FormAuth.module.scss';


export type FormProps = {
  // valuePass: string;
  onSubmitPass: (e: React.FormEvent) => void;
  handleChangeAuth:(e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormAuth({ onSubmitPass, handleChangeAuth }: FormProps) {


  return (
      <div id={'form'} className={styles.container}>
        <h2 className={styles.title}>Войти</h2>
          <form className={styles.form} onSubmit={onSubmitPass}>
            <input 
              type="text"
              placeholder='Код'
              name='password'
              className={styles.input}
              // value={valuePass}
              onChange={handleChangeAuth}
            />
            <button className={styles.button}>Войти</button>
          </form>
      </div>
  );
}
