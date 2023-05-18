import React, { FC } from "react";
import styles from "./ProjectPublicAboutUs.module.scss";
import { IAPILink, IAPIRole } from "../../types";

interface ProjectPublicAboutUsProps {
  links: IAPILink[];
  roles: IAPIRole[];
}

const ProjectPublicAboutUs: FC<ProjectPublicAboutUsProps> = ({
  links,
  roles,
}) => {
  return (
    <div className={styles["aboutus"]}>
      <div className={styles["result"]}>
        <div className={styles["result__inner"]}>
          <h2 className={styles["aboutus__title"]}>Результат</h2>
          <ul className={styles["result__list"]}>
            {links &&
              links.map((link) => (
                <li key={link.link}>
                  <button>
                    <a href={link.link}>{link.name}</a>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles["roles"]}>
        <div className={styles["roles__inner"]}>
          <h2 className={styles["aboutus__title"]}>Студенты и их роли</h2>
        </div>
        <ul className={styles["roles__list"]}>
          {roles &&
            roles.map((role) => (
              <li key={role.role}>
                <h3>{role.role}:</h3>
                <p>{role.student && role.student.name}</p>
              </li>
            ))}
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
    </div>
  );
};

export default ProjectPublicAboutUs;
