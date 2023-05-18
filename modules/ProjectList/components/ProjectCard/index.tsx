import React, { FC } from "react";
import { Project } from "../../../../pages/api/data/projects";
import { IAPIProject } from "../../../../types";

interface ProjectCardProps {
  project: IAPIProject;
  className: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  const formatTime = (str: string) => {
    const date = new Date(str);
    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();

    return day + "." + month + "." + date.getFullYear();
  };

  return (
    <div className={className}>
      <a href={"./project/" + project.projectId}>
        <div>
          <h2>{project.name}</h2>
          <p>Клиника: {project.clinics![0].name}</p>
          <p>Задача: {project.description}</p>
          <p>Статус: в процессе</p>
        </div>
      </a>
      <p>
        от {project.startTime ? formatTime(project.startTime) : "04.04.2023"}
      </p>
    </div>
  );
};

export default ProjectCard;
