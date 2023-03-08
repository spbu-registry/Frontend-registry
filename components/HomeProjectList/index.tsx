import React, { FC } from "react";
import Image from "next/image";
import styles from "./HomeProjectList.module.scss";

import logo from "../../public/logo.svg";

interface HomeProjectListProps { }

const HomeProjectList: FC<HomeProjectListProps> = () => {
  return (<>
    <div className={styles["projects_container"]}>
      <div className={styles["project_1"]}>
        <div className={styles["project_name"] + " " + styles["project_1_color"]}>
          <p>
            Название
          </p>
        </div>
        <div className={styles["project_info"] + " " + styles["project_1_color"]}>
          <p>
            Клиника: Цетр прикладных экономических исследований СПБГУ
          </p>
          <p>
            Заказчик: ООО “какое то там и еще что нибудь”
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
        </div>
      </div>
      <div className={styles["project_2"]}>
        <div className={styles["project_name"] + " " + styles["project_2_color"]}>
          <p>
            Название немного подлинее и еще подлинее и еще немножко чтобы наверняка
          </p>
        </div>
        <div className={styles["project_info"] + " " + styles["project_2_color"]}>
          <p>
            Клиника: Цетр финансовой грамотности
          </p>
          <p>
            Заказчик: ООО “какое то там и еще что нибудь”
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>
        </div>
      </div>
      <div className={styles["project_3"]}>
        <div className={styles["project_name"] + " " + styles["project_3_color"]}>
          <p>
            Название
          </p>
        </div>
        <div className={styles["project_info"] + " " + styles["project_3_color"]}>
          <p>
            Клиника: ИТ-клиника
          </p>
          <p>
            Заказчик: ООО “какое то там и еще что нибудь”
          </p>
          <p>
            Участники: первый участник, второй участник, третий участник, четвертый участник
          </p>

        </div>
      </div>
    </div>
  </>
  );
};

export default HomeProjectList;