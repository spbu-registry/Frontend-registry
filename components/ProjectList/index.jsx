import React from "react";
import styles from "./ProjectList.module.sass"
import {projects} from "./projects";

const ProjectList = () => {
    return (
        <div>
            <div>
                поиск
            </div>
            <div>
                сортировка тегов
            </div>
            <div className={styles.container}>
                {projects.map((project) => (
                    <div className={styles.project} key={project.header}>
                        <div>
                            <h2>{project.header}</h2>
                            <p>Клиника: {project.clinic}</p>
                            <p>Задача: {project.task}</p>
                            <p>Статус: {project.status}</p>
                        </div>
                        <p className={styles.date}>от {project.date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
