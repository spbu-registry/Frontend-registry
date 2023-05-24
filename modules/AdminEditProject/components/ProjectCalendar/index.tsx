import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./ProjectCalendar.module.sass";
import { IFormData } from "../../types";
import DatePicker from "react-datepicker";
import Image from "next/image";
import { IAPIProject, IAPIStatus } from "../../../../types";

const statusNames = {
  OPEN_ENROLLMENT: "Набор открыт",
  CLOSED: "Набор закрыт",
  ACTIVE: "Активный",
  TEST: "Тестирование",
  DEFENSE: "Защита",
  COMPLETE: "Завершён",
};

interface ProjectCalendarProps {
  projectRef: React.RefObject<IAPIProject>;
}

const formatTime = (stringTime: string | undefined) => {
  if (!stringTime) return undefined;
  const date = new Date(stringTime);
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
  return date.getFullYear() + "-" + month + "-" + day;
};

const ProjectCalendar: FC<ProjectCalendarProps> = ({ projectRef }) => {
  const [Timeline, setTimeline] = useState(
    projectRef.current
      ? {
          dateAdd: formatTime(projectRef.current.startTime),
          applicationDeadline: {
            from: formatTime(projectRef.current.startFiling),
            to: formatTime(projectRef.current.endFiling),
          },
          projectImplementationDates: {
            from: formatTime(projectRef.current.startImplementation),
            to: formatTime(projectRef.current.endImplementation),
          },
          projectProtection: {
            from: formatTime(projectRef.current.startDefense),
            to: formatTime(projectRef.current.endDefense),
          },
          projectStatus: statusNames[projectRef.current.status || "CLOSED"],
        }
      : {
          dateAdd: "",
          applicationDeadline: {
            from: "",
            to: "",
          },
          projectImplementationDates: {
            from: "",
            to: "",
          },
          projectProtection: {
            from: "",
            to: "",
          },
          projectStatus: "",
        }
  );

  useEffect(() => {
    if (projectRef.current) {
      projectRef.current.startTime = Timeline.dateAdd;
      projectRef.current.startFiling = Timeline.applicationDeadline.from;
      projectRef.current.endFiling = Timeline.applicationDeadline.to;
      projectRef.current.startImplementation =
        Timeline.projectImplementationDates.from;
      projectRef.current.endImplementation =
        Timeline.projectImplementationDates.to;
      projectRef.current.startDefense = Timeline.projectProtection.from;
      projectRef.current.endDefense = Timeline.projectProtection.to;
      projectRef.current.status = (Object.keys(statusNames).find(
        (key) =>
          statusNames[key as keyof typeof statusNames] == Timeline.projectStatus
      ) || "CLOSED") as IAPIStatus;
    }
  }, [Timeline]);

  const statusBox = useRef<HTMLDivElement>(null);

  // выделить переданное значение статуса
  useEffect(() => {
    if (statusBox.current) {
      statusBox.current.childNodes.forEach((el) => {
        if (el instanceof HTMLElement)
          if (
            el.textContent ==
            statusNames[projectRef.current!.status || "CLOSED"]
          ) {
            el.classList.add(styles["statusChange"]);
          }
      });
    }
  }, []);

  function statusChange(e: React.MouseEvent) {
    if (e.target instanceof HTMLElement && e.target != e.currentTarget) {
      e.currentTarget.childNodes.forEach((el) => {
        if (el instanceof HTMLElement)
          el.classList.remove(styles["statusChange"]);
      });
      e.target.classList.add(styles["statusChange"]);

      // сохраняем изменения
      const _ = Object.assign({}, Timeline);
      if (e.target.textContent) _.projectStatus = e.target.textContent;
      setTimeline(_);
    }
  }
  return (
    <>
      <div className={styles.stage}>Этапы:</div>
      <div className={styles.dateAdd}>
        <div>Дата добавления:</div>
        <div className={styles.dateAddInput}>
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.dateAdd}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.dateAdd = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
      </div>
      <div className={styles.applicationDeadline}>
        <div className={styles.align}>Сроки подачи заявок:</div>
        <div className={styles.dateBlock}>
          от{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.applicationDeadline.from}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.applicationDeadline.from = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
        <div className={styles.dateBlock}>
          до{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.applicationDeadline.to}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.applicationDeadline.to = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
      </div>
      <div className={styles.projectImplementationDates}>
        <div className={styles.align}>Сроки реализации проекта:</div>
        <div className={styles.dateBlock}>
          от{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.projectImplementationDates.from}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.projectImplementationDates.from = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
        <div className={styles.dateBlock}>
          до{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.projectImplementationDates.to}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.projectImplementationDates.to = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
      </div>
      <div className={styles.projectProtection}>
        <div className={styles.align}>Защита проекта:</div>
        <div className={styles.dateBlock}>
          от{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.projectProtection.from}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.projectProtection.from = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
        <div className={styles.dateBlock}>
          до{" "}
          <input
            className={styles.inputField}
            type="date"
            value={Timeline.projectProtection.to}
            onChange={(e) => {
              const _ = Object.assign({}, Timeline);
              _.projectProtection.to = e.target.value;
              setTimeline(_);
            }}
          />
        </div>
      </div>
      <div className={styles.projectStatus}>
        <div className={styles.align}>Статус проекта:</div>
        <div
          className={styles.status}
          onClick={(e) => statusChange(e)}
          ref={statusBox}
        >
          <div className={styles.state}>Набор открыт</div>
          <div className={styles.state}>Набор закрыт</div>
          <div className={styles.state}>Активный</div>
          <div className={styles.state}>Тестирование</div>
          <div className={styles.state}>Защита</div>
          <div className={styles.state}>Завершен</div>
        </div>
      </div>
    </>
  );
};

export default ProjectCalendar;
