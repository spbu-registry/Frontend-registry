import React, { FC, useRef } from "react";
import styles from "./ClinicSlider.module.sass";
import Slider from "react-slick";
import ClinicCard from "../components/ClinicCard";


import It from '../../../public/ClinicImage/IT.jpg';
import Eco from '../../../public/ClinicImage/Eco.jpg';
import Lang from '../../../public/ClinicImage/Lang.jpg';
import Media from '../../../public/ClinicImage/Media.jpg';
import Mus from '../../../public/ClinicImage/Mus.jpg';
import Soc from '../../../public/ClinicImage/Soc.jpg';


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
      <Slider {...settings} ref={sliderRef} className={'clinic-slider-main'}>
        <ClinicCard
          index={0}
          title='ИТ-клиника'
          image={It}
        />
        <ClinicCard
          index={1}
          title='Экологическая клиника'
          image={Eco}
        />
        <ClinicCard
          index={2}
          title='Лингвистическая клиника'
          image={Lang}
        />
        <ClinicCard
          index={3}
          title='Медиацентр'
          image={Media}
        />
        <ClinicCard
          index={4}
          title='Музейно-архитектурная клиника'
          image={Mus}
        />
        <ClinicCard
          index={5}
          title='Социальная клиника'
          image={Soc}
        />
      </Slider>
      <div className={styles.arrowLeft} onClick={handleArrowLeft} />
      <div className={styles.arrowRight} onClick={handleArrowRight} />
    </div>
  );
};

export default ClinicSlider;
