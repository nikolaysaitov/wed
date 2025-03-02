import styles from './EditorPlug.module.scss';

type EditorPlugProps = {
  text: string;
};
export const EditorPlug = ({ text }: EditorPlugProps) => {
  return <div className={styles.plug}>{text}</div>;
};
