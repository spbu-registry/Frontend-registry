import React, { FC } from "react";
import styles from "./AddProject.module.sass";
import { createProject } from "../../../shared/lib/projects";
import { useRouter } from "next/router";

interface AddProjectProps {}

const AddProject: FC<AddProjectProps> = () => {
  const router = useRouter();

  const handleAddProject = async () => {
    const result = await createProject();
    router.push("/admin/project/" + result);
  };

  return (
    <div className={styles.button} onClick={handleAddProject}>
      Создать новый проект
    </div>
  );
};

export default AddProject;
