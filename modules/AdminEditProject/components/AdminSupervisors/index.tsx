import React, { FC, useState } from "react";

import styles from "./AdminSupervisors.module.sass";
import Image from "next/image";
import Supervisor from "../Supervisor";
import { IFormData } from "../../types";

interface AdminSupervisorsProps {
  formDataRef: React.RefObject<IFormData>;
}

const AdminSupervisors: FC<AdminSupervisorsProps> = ({ formDataRef }) => {
  // Для дропдауна будет использоваться отдельный компонент, который ещё не сделан
  const [clinic, setClinic] = useState("Клиника");

  const titleBgColors = ["#E8C5CC", "#B5E6ED", "#C4DAFF"];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.clinic}>Дропдаун</div>
        <div className={styles.supervisors}>
          {formDataRef.current!.supervisors.map((supervisor, index) => (
            <Supervisor
              key={index + "-" + supervisor.names.length}
              index={index}
              formDataRef={formDataRef}
              initialNames={supervisor.names}
              className={styles.supervisor}
              titleColor={titleBgColors[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSupervisors;
