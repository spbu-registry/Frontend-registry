import React from "react";
import Image from "next/image";
import styles from "./ClinicCard.module.sass";

import clinicPic from "../../public/ClinicImage/1.jpg";

const ClinicCard = () => {
  return (
    <div className={styles.ClinicCard}>
      <div className={styles.workingArea}>
        <h1>Музейно-архитектурная клиника</h1>
        <div className={styles.ClinicCardImages}>
          <Image src={clinicPic} />
        </div>
        <ul className={styles.ClinicCardLinks}>
          <li>
            <a href="https://spbu.ru/universitet/klinika-spbgu"><u>Подробнее</u></a>
          </li>
          <li>К проектам клиники</li>
        </ul>
      </div>
    </div>
  );
};
export default ClinicCard;
