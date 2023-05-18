import React, { FC } from "react";
// import Image from "next/image";
import styles from "./AboutProject.module.sass";

// import logo from "../../public/logo.svg";

interface AboutProjectProps {
  description: string | undefined;
}

const AboutProject: FC<AboutProjectProps> = ({ description }) => {
  return (
    <div className={styles.AboutProjectInner}>
      <h1>Описание проекта</h1>
      <p>{description}</p>
    </div>
  );
};

export default AboutProject;
