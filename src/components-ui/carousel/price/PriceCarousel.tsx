import Slider, { Settings } from "react-slick";
import { PRICE_CARDS } from "../../../components/price/price.model.ts";
import { PriceCard } from "../../card/price-card/PriceCard.tsx";
import styles from "./PriceCarousel.module.scss";

export function PriceCarousel() {
  const settings: Settings = {
    className: "slider center variable-width",
    centerMode: true,
    infinite: true,
    arrows: false,
    focusOnSelect: true,
    dots: false,
    speed: 500,
    centerPadding: "0",
    slidesToShow: 1,
    slidesToScroll: 1,

    variableWidth: true,
    // adaptiveHeight: true,
  };
  return (
    <div>
      <Slider {...settings}>
        {PRICE_CARDS.map((card, i) => (
          <div key={i}>
            <PriceCard className={styles.card} {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
