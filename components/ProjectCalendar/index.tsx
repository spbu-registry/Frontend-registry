import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./ProjectCalendar.module.sass"
import Image from "next/image";

interface ProjectCalendarProps {

}

const ProjectCalendar: FC<ProjectCalendarProps> = ({ }) => {


    return (
        <>
            <div className={styles.stage}>Этапы:</div>
            <div className={styles.dateAdd}>
                <div>Дата добавления:</div>
                <div>
                    <input className={styles.inputField} type="date" placeholder={""} />
                </div>
            </div>
            <div className={styles.applicationDeadline}>
                <div className={styles.align}>Сроки подачи заявок:</div>
                <div>
                    от <input className={styles.inputField} type="date" placeholder={""} />
                    до <input className={styles.inputField} type="date" placeholder={""} />
                </div>
            </div>
            <div className={styles.projectImplementationDates}>
                <div className={styles.align}>Сроки реализации проекта:</div>
                <div>
                    от <input className={styles.inputField} type="date" placeholder={""} />
                    до <input className={styles.inputField} type="date" placeholder={""} />
                </div>
            </div>
            <div className={styles.projectProtection}>
                <div className={styles.align}>Защита проекта:</div>
                <div>
                    от <input className={styles.inputField} type="date" placeholder={""} />
                    до <input className={styles.inputField} type="date" placeholder={""} />
                </div>
            </div>
            <div className={styles.projectStatus}>
                <div className={styles.align}>Статус проекта:</div>
                <div className={styles.status}>
                    <div className={styles.state}>Набор открыт</div>
                    <div className={styles.state}>Набор закрыт</div>
                    <div className={styles.state}>Активный</div>
                    <div className={styles.state}>Тестирование</div>
                    <div className={styles.state}>Защита</div>
                    <div className={styles.state}>Завершен</div>
                </div>
            </div>
        </>
    )
}

export default ProjectCalendar;