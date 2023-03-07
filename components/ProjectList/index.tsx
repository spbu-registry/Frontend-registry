import React, { FC } from "react";
import styles from "./ProjectList.module.sass";
import { projects } from "./projects";
import ProjectCard from "./ProjectCard";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  return (
    <div>
      <div>поиск</div>
      <div>сортировка тегов</div>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard
            key={project.header}
            project={project}
            className={styles.project}
          ></ProjectCard>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
