import styles from './Preloader.module.scss'

const Preloader = () => {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
        </div>
      </div>
    )
};

export default Preloader;