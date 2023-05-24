import React, { FC } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./ClinicCard.module.sass";

import Link from "next/link";
import { title } from "process";

interface ClinicCardProps {
  index: number;
  title: string;
  image: StaticImageData;
}

const backgroundClasses = [styles.opal, styles.yellow, styles.gray];

const ClinicCard: FC<ClinicCardProps> = ({ index, title, image }) => {
  return (
    <div className={styles.ClinicCard + " " + backgroundClasses[index % 3]}>
      <div className={styles.workingArea}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.ClinicCardImages}>
          <Image src={image} alt="" />
        </div>
        <ul className={styles.ClinicCardLinks}>
          <li>
            <a href="https://spbu.ru/universitet/klinika-spbgu">
              <u>Подробнее</u>
            </a>
          </li>
          <li>
            <Link href="./projects">К проектам клиники</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClinicCard;
