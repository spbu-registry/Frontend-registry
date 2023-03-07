import React, { FC } from "react";
// import Image from "next/image";
import styles from "./FirstInfo.module.sass";

// import logo from "../../public/logo.svg";

interface FirstInfoProps {}

const FirstInfo: FC<FirstInfoProps> = () => {
  return (
    <div className={styles.FistInfoInner}>
      <h1>Практика по модели клиники в СПбГУ</h1>
      <p>
        «Клиническая практика» — уникальный проект Санкт-Петербургского
        государственного университета. Это форма получения обучающимися
        практических навыков без отрыва от учебного процесса для решения задач,
        поставленных клиентом (заказчиком или работодателем).
      </p>
    </div>
  );
};

export default FirstInfo;
