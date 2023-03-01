import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";

import clinicPic from "../../public/examplesOfClinicPic/1.jpg";



const ProjectCard = () => {
  return(
  <div className={styles.ProjectCard}>
      <h1>Музейно-архитектурная клиника</h1>
        <div className={styles.ProjectCardImages}>
          <Image src={clinicPic} />
        </div>
      <ul className={styles.ProjectCardLinks}>
            <li><a href="https://spbu.ru/universitet/klinika-spbgu">Подробнее</a></li>
            <li>К проектам клиники</li>
      </ul>
  </div>
  );
}
export default ProjectCard;
