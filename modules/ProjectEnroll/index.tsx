import React, { FC } from "react";
import DateBlock from "./components/ProjectDateBlock";

import styles from "./ProjectEnroll.module.sass";
import { IAPIStatus } from "../../types";
import { statusNames } from "../shared/static/status";

interface ProjectEnrollProps {
  startTime: string;
  startFiling: string;
  endFiling: string;
  startImplementation: string;
  endImplementation: string;
  status: IAPIStatus | undefined;
}

const ProjectEnroll: FC<ProjectEnrollProps> = ({
  startTime,
  startFiling,
  endFiling,
  startImplementation,
  endImplementation,
  status,
}) => {
  const formatTime = (str: string) => {
    const date = new Date(str);
    if (!date.getDay() || !date.getMonth() || !date.getFullYear())
      return "Неизвестно";
    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();

    return day + "." + month + "." + date.getFullYear();
  };

  return (
    <div className={styles.container}>
      <div className={styles.datablock}>
        <DateBlock
          dateOfCreate={formatTime(startTime)}
          dateOfRegister={
            formatTime(startFiling) + " - " + formatTime(endFiling)
          }
          deadline={
            formatTime(startImplementation) +
            " - " +
            formatTime(endImplementation)
          }
          status={status ? statusNames[status] : "открыт"}
        />
      </div>
      <div className={styles.buttonwrapper}>
        <button className={styles.button}>Подать заявку</button>
      </div>
    </div>
  );
};

export default ProjectEnroll;
