import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./ProjectCalendar.module.sass";
import { IFormData } from "../../types";
import DatePicker from "react-datepicker";
import Image from "next/image";

interface ProjectCalendarProps {
  formDataRef: React.RefObject<IFormData>;
}

const ProjectCalendar: FC<ProjectCalendarProps> = ({ formDataRef }) => {
  const [Timeline, setTimeline] = useState(
    formDataRef.current!.projectTimeline
  );

  useEffect(() => {
    formDataRef.current!.projectTimeline = Timeline;
    // посмотреть изменения ?
    console.log(JSON.stringify(formDataRef.current!.projectTimeline));
  }, [Timeline]);

  const statusBox = useRef<HTMLDivElement>(null);

  // выделить переданное значение статуса
  useEffect(() => {
    if (statusBox.current) {
      statusBox.current.childNodes.forEach((el) => {
        if (el instanceof HTMLElement)
          if (
            el.textContent == formDataRef.current!.projectTimeline.projectStatus
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
        <div>
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
        <div>
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
        <div>
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
        <div>
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
