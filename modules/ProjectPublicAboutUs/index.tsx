import React, { FC } from "react";
import styles from "./ProjectPublicAboutUs.module.scss"

interface ProjectPublicAboutUsProps { }

const ProjectPublicAboutUs: FC<ProjectPublicAboutUsProps> = (props) => {
    return (
        <div className={styles["aboutus"]}>
            <div className={styles["result"]}>
                <table>
                    <thead>
                        <tr><th>Результат</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Гитхаб проекта - { }</td></tr>
                        <tr><td>Рабочий файл проекта - { }</td></tr>
                        <tr><td>Статья об этом проекте { }</td></tr>
                    </tbody>
                </table>
            </div>
            <div className={styles["roles"]}>
                <table>
                    <thead>
                        <tr><th>Студенты и их роли</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Продакт-менеджер:  { }</td></tr>
                        <tr><td>Бэкенд-азработчик: { }</td></tr>
                        <tr><td>Фронтэнд-разработичк: { }</td></tr>
                        <tr><td>Тестировщик: { }</td></tr>
                        < tr><td> Менеджер: { }</td></tr>
                    </tbody>
                 </table>                                                       
            </div>                                                       
        </div>       
    );                 
}

export default ProjectPublicAboutUs;