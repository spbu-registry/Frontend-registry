import React, { FC } from "react";
import styles from "./ProjectPublicAboutUs.module.scss";
import { DateBlock } from "../ProjectDateBlock";

interface ProjectPublicAboutUsProps {}

const ProjectPublicAboutUs: FC<ProjectPublicAboutUsProps> = (props) => {
  return (
    <div className={styles["aboutus"]}>
      <div className={styles["result"]}>
        <div className={styles["result__inner"]}>
          <h2 className={styles["aboutus__title"]}>Результат</h2>
          <ul className={styles["result__list"]}>
            <li>
              <button>
                <a href="https://github.com/spbu-registry/Frontend-registry">
                  Гитхаб проекта
                </a>
              </button>
            </li>
            <li>
              <button>
                <a href="https://github.com/spbu-registry/Frontend-registry">
                  Рабочий файл проекта
                </a>
              </button>
            </li>
            <li>
              <button>
                <a href="https://github.com/spbu-registry/Frontend-registry">
                  Статья об этом проекте
                </a>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["roles"]}>
        <div className={styles["roles__inner"]}>
          <h2 className={styles["aboutus__title"]}>Студенты и их роли</h2>
        </div>
        <ul className={styles["roles__list"]}>
          <li>
            <h3>Продакт-менеджер:</h3>
            <p>Соколова Вероника Сергеевна</p>
          </li>
          <li>
            <h3>Бэкенд-азработчик:</h3>
            <p>Смирнова Варвара Ильинична</p>
          </li>
          <li>
            <h3>Фронтэнд-разработичк:</h3>
            <p>Никитин Марк Макарович</p>
          </li>
          <li>
            <h3>Тестировщик:</h3>
            <p>Золотарева Яна Александровна</p>
          </li>
          <li>
            <h3>Менеджер:</h3>
            <p>Давыдова Надежда Игоревна</p>
          </li>
        </ul>
      </div>
      <DateBlock
        dateOfCreate="11.10.2011"
        dateOfRegister="11.10.2011 - 21.10.2012"
        deadline="11.10.2011 - 21.10.2012"
        status="открыт"
      />
      <button>Подать заявку</button>
    </div>
  );
};

export default ProjectPublicAboutUs;
