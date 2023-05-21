import React, { FC, useState } from "react";

import styles from "./AdminSupervisors.module.sass";
import Image from "next/image";
import Supervisor from "../Supervisor";
import { IFormData } from "../../types";
import { Multiselect } from "../../../shared";
import { Theme } from "../../../shared/components/Multiselect/Components/enums";


interface AdminSupervisorsProps {
  formDataRef: React.RefObject<IFormData>;
}

const AdminSupervisors: FC<AdminSupervisorsProps> = ({ formDataRef }) => {
  // Для дропдауна будет использоваться отдельный компонент, который ещё не сделан
  const [clinic, setClinic] = useState("Клиника");

  const titleBgClasses = [styles.pink, styles.easternBlue, styles.dodgerBlue];

  // Для мультиселекта
  const [clinicsOptions, setOptions] = useState<Map<string, boolean>>(new Map([
    ['ИТ-Клиника', false],
    ['Клиника цифрового сопровождения образовательных проектов СПБГУ',false],
    ['Лингвистическая клиника', false],
    ['Архивный центр',false],
    ['Психологическая клиника',false],
    ["Клиника коммуникационных проектов",false],
    ["Юридическая клиника",false],
    ["Экологическая клиника", false],
  ]))

  const toggleOption = (option : string) => setOptions(prev => {
    const newMap = new Map(prev)
    prev.forEach((val, key) => newMap.set(key, false))
    newMap.set(option, !prev.get(option))
    return newMap
  })

  return (
    <>
      <div className={styles.container}>
          <div className={styles.clinic}>
            <Multiselect
              options={clinicsOptions}
              toggleOption={toggleOption}
              id='ClinicsMultiselect'
              lable='Клиника'
              theme={Theme.Blue}
            />
          </div>
          <div className={styles.supervisors}>
            {formDataRef.current!.supervisors.map((supervisor, index) => (
              <Supervisor
                key={index + '-' + supervisor.names.length}
                index={index}
                formDataRef={formDataRef}
                initialNames={supervisor.names}
                className={styles.supervisor}
                titleClass={titleBgClasses[index]}
              />
            ))}
          </div>
        </div>
    </>
  );
};

export default AdminSupervisors;
