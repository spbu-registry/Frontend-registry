import React, { FC } from "react";
import { IAPIProject } from "../../../../types";
import { statusNames } from "../../../shared/static/status";
import styles from "./ProjectCard.module.sass";
import deleteIcon from "../../../../public/admin-delete-icon.svg";
import Image from "next/image";

interface ProjectCardProps {
  project: IAPIProject;
  className: string;
  type: "public" | "admin";
}

const ProjectCard: FC<ProjectCardProps> = ({ project, className, type }) => {
  const formatTime = (str: string) => {
    const date = new Date(str);
    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
    const month =
      date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();

    return day + "." + month + "." + date.getFullYear();
  };

  return (
    <div className={styles.card + " " + className}>
      <a
        href={
          (type == "admin" ? "/admin" : "") + "/project/" + project.projectId
        }
      >
        <div>
          <h2>{project.name}</h2>
          <p>
            Клиника:{" "}
            {project.clinics && project.clinics[0]
              ? project.clinics[0].name
              : ""}
          </p>
          <p>Задача: {project.description}</p>
          <p>Статус: {statusNames[project.status || "ACTIVE"]}</p>
        </div>
      </a>
      <p>
        от {project.startTime ? formatTime(project.startTime) : "04.04.2023"}
      </p>
      {type == "admin" && (
        <div className={styles.delete}>
          <Image src={deleteIcon} alt="Удалить проект" data-delete-project />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
