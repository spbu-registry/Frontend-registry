import React, { FC } from "react";
import DateBlock from "./components/ProjectDateBlock";

import styles from "./ProjectEnroll.module.sass";

interface ProjectEnrollProps { }

const ProjectEnroll: FC<ProjectEnrollProps> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.datablock}>
        <DateBlock
          dateOfCreate="11.10.2011"
          dateOfRegister="11.10.2011 - 21.10.2012"
          deadline="11.10.2011 - 21.10.2012"
          status="открыт"
        />
      </div>
      <div className={styles.buttonwrapper}>
        <button className={styles.button}>Подать заявку</button>
      </div>
    </div>
  );
};

export default ProjectEnroll;
