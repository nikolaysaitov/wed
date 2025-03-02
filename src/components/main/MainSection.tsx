import { Parallax } from "react-scroll-parallax";
import styles from "./MainSection.module.scss";
import { DecorateButton } from "../../components-ui/button/decorate/DecorateButton.tsx";
import { Link } from "react-router-dom";
import { CheckCurrentSection } from "../../components-ui/checkCurrentSection/CheckCurrentSection.tsx";

export const MainSection = () => {
  return (
    <CheckCurrentSection
      id={"main"}
      className={styles.container}
      sectionName={"main"}
    >
      <div className={styles.content}>
        <h1
          className={styles.title}
        >{`создайте свой сайт-приглашение на свадьбу`}</h1>

        <p className={styles.text}>
          Стильное приглашение всего за несколько кликов. Ещё никогда не было
          так просто.
        </p>

        <Link to={"/catalog"}>
          <DecorateButton
            className={styles.action}
            text={"Выбрать приглашение"}
          />
        </Link>
      </div>
      <Parallax speed={15} className={styles.imageMainPosition}>
        <img
          className={styles.imageMain}
          src={"assets/images/imageMain.png"}
          alt={"calendar"}
        />
      </Parallax>
      <Parallax speed={5} className={styles.imageMain1Position}>
        <img
          className={styles.imageMain1}
          src={"assets/images/imageMain1.png"}
          alt={"calendar"}
        />
      </Parallax>
      <Parallax speed={10} className={styles.imageMain2Position}>
        <img
          className={styles.imageMain2}
          src={"assets/images/imageMain2.png"}
          alt={"calendar"}
        />
      </Parallax>
    </CheckCurrentSection>
  );
};
