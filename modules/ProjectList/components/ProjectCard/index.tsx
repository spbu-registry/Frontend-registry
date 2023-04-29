import React, { FC } from "react";
import { Project } from "../../../../pages/api/data/projects";
import { IAPIProject } from "../../../../types";

interface ProjectCardProps {
  project: IAPIProject;
  className: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  return (
    <div className={className}>
      <div>
        <h2>{project.name}</h2>
        <p>Клиника: {project.clinics![0].name}</p>
        <p>Задача: {project.description}</p>
        <p>Статус: в процессе</p>
      </div>
      <p>от {project.start ? project.start : "04.04.2023"}</p>
    </div>
  );
};

export default ProjectCard;
