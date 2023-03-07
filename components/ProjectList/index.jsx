import React from "react";
import styles from "./ProjectList.module.sass"
import {projects} from "./projects";
import ProjectCard from "./ProjectCard";

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

                    <ProjectCard header={project.header}
                                 clinic={project.clinic}
                                 task={project.task}
                                 status={project.status}
                                 date={project.date}
                                 className={styles.project}
                                 key={project.header}>

                    </ProjectCard>

                    ))}
            </div>
        </div>
    );
};

export default ProjectList;
