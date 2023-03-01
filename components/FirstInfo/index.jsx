import React from "react";
// import Image from "next/image";
import styles from "./styles.module.css";

// import logo from "../../public/logo.svg";


const FirstInfo = () => {
  return(
  <div className={styles.FistInfoInner}>
      <h1>Практика по модели клиники в СПбГУ</h1>
      <main>
        «Клиническая практика» — уникальный проект Санкт-Петербургского государственного университета. Это форма получения обучающимися практических навыков без отрыва от учебного процесса для решения задач, поставленных клиентом (заказчиком или работодателем).
      </main>
  </div>
  );
}
export default FirstInfo;
