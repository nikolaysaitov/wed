import { HTMLAttributes } from "react";
import Slider, { Settings } from "react-slick";

import { FEEDBACK_CARDS } from "../../../components/feedback/feedback.model";
import { FeedbackCard } from "../../card/feedback-card/FeedbackCard.tsx";
import arrowprev from "../../../../public/assets/svg/arrow-prev.svg";
import arrowpnext from "../../../../public/assets/svg/arrow-next.svg";
import styles from "./FeedbackCarousel.module.scss";
import "../carousel.scss";

type ArrowProps = HTMLAttributes<HTMLDivElement>;

function SampleNextArrow({ className, style, onClick }: ArrowProps) {
  return (
    <div>
      <img
        src={arrowpnext}
        className={className}
        style={{
          ...style,
          display: "block",
          width: 10,
          height: 18,
          cursor: "pointer",
        }}
        onClick={onClick}
      />
    </div>
  );
}

function SamplePrevArrow({ className, style, onClick }: ArrowProps) {
  return (
    <img
      src={arrowprev}
      className={className}
      style={{
        ...style,
        display: "block",
        width: 10,
        height: 18,
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}

export function FeedbackCarousel() {
  const settings: Settings = {
    className: "slider center",
    centerMode: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    // centerPadding: "30px",
    dots: true,
    speed: 500,
    focusOnSelect: true,
    variableWidth: true,
    adaptiveHeight: true,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // autoplaySpeed: 2000,
    // pauseOnHover: true,
    responsive: [
      {
        breakpoint: 767.9,
        settings: {
          arrows: false,
          slidesToShow: 1,
          centerPadding: "0",
          dots: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1299.9,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          centerPadding: "0",
          variableWidth: true,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>
        {FEEDBACK_CARDS.map((card, i) => (
          <div key={i}>
            <FeedbackCard className={styles.card} {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
