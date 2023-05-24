import React, { FC } from "react";
import styles from "./NavButtons.module.sass";
import Link from "next/link";

interface NavButtonsProps {
  projectId: number | undefined;
}

const NavButtons: FC<NavButtonsProps> = ({ projectId }) => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Link
          href={
            typeof projectId == "number" ? "/project/" + projectId : "/projects"
          }
        >
          К странице проекта
        </Link>
      </div>
      <div className={styles.button}>
        <Link href="/admin/metrics">Метрики</Link>
      </div>
    </div>
  );
};

export default NavButtons;
