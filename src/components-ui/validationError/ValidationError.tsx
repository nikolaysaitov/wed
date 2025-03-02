import styles from './ValidationError.module.scss';

export default function ValidationError({ errorText }: { errorText?: string }) {
  return <p className={styles.errorText}>{errorText}</p>;
}
