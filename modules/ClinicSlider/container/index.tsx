import React, { FC, useRef } from "react";
import styles from "./ClinicSlider.module.sass";
import Slider from "react-slick";
import ClinicCard from "../components/ClinicCard";

const settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  infinite: false,
  responsive: [
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

interface ClinicSliderProps {}

const ClinicSlider: FC<ClinicSliderProps> = () => {
  const sliderRef: React.RefObject<Slider> = useRef(null);

  const handleArrowLeft = () => {
    if (sliderRef.current) sliderRef.current.slickPrev();
  };

  const handleArrowRight = () => {
    if (sliderRef.current) sliderRef.current.slickNext();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Клиники</h2>
      <Slider {...settings} ref={sliderRef} className={"clinic-slider-main"}>
        <ClinicCard index={0} />
        <ClinicCard index={1} />
        <ClinicCard index={2} />
        <ClinicCard index={3} />
        <ClinicCard index={4} />
        <ClinicCard index={5} />
        <ClinicCard index={6} />
      </Slider>
      <div className={styles.arrowLeft} onClick={handleArrowLeft} />
      <div className={styles.arrowRight} onClick={handleArrowRight} />
    </div>
  );
};

export default ClinicSlider;
