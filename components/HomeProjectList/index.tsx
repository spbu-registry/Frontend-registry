import React, { FC } from "react";
import Image from "next/image";
import styles from "./HomeProjectList.module.scss";
import logo from "../../public/logo.svg";

interface HomeProjectListProps { }

const HomeProjectList: FC<HomeProjectListProps> = () => {

  async function HomeProjectListResize() {

    function alignHeight(allElems) {

      function alignBlockHeight(elems) {
        let height = 0;
        for (let elem of elems) {
          let childHeight = 26; //padding: 13px
          for (let child of elem.children) {
            childHeight += child.offsetHeight;
          }
          height = Math.max(height, childHeight);
        }
        for (let elem of elems) {
          elem.style.height = `${height}px`;
        }
      }

      if (document.documentElement.clientWidth < 604) {
        for (let elem of allElems) {
          elem.style.height = `auto`;
        }
      } else if (document.documentElement.clientWidth < 1808) {
        alignBlockHeight([allElems[0], allElems[1]]);
        alignBlockHeight([allElems[2], allElems[3]]);
      } else {
        alignBlockHeight(allElems);
      }
    }

    let projectNames = document.querySelectorAll(".HomeProjectList_project_name__qa6iK");
    let projectInfo = document.querySelectorAll(".HomeProjectList_project_info__3w9p9");

    alignHeight(projectNames);
    alignHeight(projectInfo);

    window.onresize = function () {
      alignHeight(projectNames);
      alignHeight(projectInfo);
    }
  }

  HomeProjectListResize();

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
      <div className={styles["project_break"]}></div>
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
      <div className={styles["project_4"]}>
        <div className={styles["project_name"] + " " + styles["project_4_color"]}>
          <p>
            Название
          </p>
        </div>
        <div className={styles["project_info"] + " " + styles["project_4_color"]}>
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
    </div>
  </>
  );
};

export default HomeProjectList;