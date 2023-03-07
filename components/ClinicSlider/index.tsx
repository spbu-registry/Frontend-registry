import React, { FC } from "react";
import styles from "./ClinicSlider.module.sass";
import Slider from "react-slick";
import ClinicCard from "../ClinicCard";

const settings = {
  slidesToShow: 4,
  slidesToScroll: 4,
  infinite: true,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToSroll: 3,
      },
    },
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
  return (
    <div className={styles.container}>
      <Slider {...settings} className={"clinic-slider-main"}>
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
        <ClinicCard />
      </Slider>
    </div>
  );
};

export default ClinicSlider;
