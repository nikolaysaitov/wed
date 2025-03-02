import { Link } from "react-router-dom";
import { Parallax } from "react-scroll-parallax";
import { CheckCurrentSection } from '../../components-ui/checkCurrentSection/CheckCurrentSection.tsx';
import { TemplatesCarousel } from '../../components-ui/carousel/templates/TemplatesCarousel.tsx';
import play from '../../../public/assets/svg/play.svg';
import styles from './DescriptionSection.module.scss';

export const DescriptionSection = () => {
  return (
    <CheckCurrentSection
      id={'section-description'}
      className={styles.container}
      sectionName={'description'}
      options={{ margin: '0px 0px -70% 0px' }}>
      <div className={styles.carousel}>
        <TemplatesCarousel className={styles.carouselMask}/>
        <Link to={'/editor'}>
          <button className={styles.button}>
            <p className={styles.buttonText}>Попробовать</p>
            <img className={styles.buttonPlay} src={play}/>
          </button>
        </Link>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{`20 авторских дизайнов на любой вкус`}</h1>

        <div className={styles.texts}>
          <p className={styles.text}>Соберите своё уникальное приглашение за 15 минут!</p>
          <p className={styles.text}>
            Шаблон можно настроить под свой вкус, отправить в любую точку мира, а все ответы гостей
            собираются в удобном личном кабинете.
          </p>
        </div>
      </div>
      <Parallax speed={10} className={styles.imageDescriptionPosition}> 
        <img
            className={styles.imageDescription}
            src={'assets/images/imageDescription.png'}
            alt={'brilliant'}
          />
      </Parallax>
      <Parallax speed={5} className={styles.imageDescription2Position}> 
        <img
            className={styles.imageDescription2}
            src={'assets/images/imageAdvantages2.png'}
            alt={'heart'}
          />
      </Parallax>
    </CheckCurrentSection>
  );
};
