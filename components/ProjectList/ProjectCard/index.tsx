import React, { FC } from "react";

interface ProjectCardProps {
  project: ProjectCardInList;
  className: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className }) => {
  return (
    <div className={className}>
      <div>
        <h2>{project.header}</h2>
        <p>Клиника: {project.clinic}</p>
        <p>Задача: {project.task}</p>
        <p>Статус: {project.status}</p>
      </div>
      <p>от {project.date}</p>
    </div>
  );
};

export default ProjectCard;
