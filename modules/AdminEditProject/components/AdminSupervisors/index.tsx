import React, { FC, useState } from "react";

import styles from "./AdminSupervisors.module.sass";
import Image from "next/image";
import Supervisor from "../Supervisor";
import { IFormData } from "../../types";
import { Multiselect } from "../../../shared";
import { Theme } from "../../../shared/components/Multiselect/Components/enums";
import {
  IAPIClient,
  IAPICurator,
  IAPIProject,
  IAPISupervisor,
} from "../../../../types";

interface AdminSupervisorsProps {
  formDataRef: React.RefObject<IFormData>;
  projectRef: React.RefObject<IAPIProject>;
  supervisorData: [IAPIClient[], IAPICurator[], IAPISupervisor[]];
}

const AdminSupervisors: FC<AdminSupervisorsProps> = ({
  formDataRef,
  projectRef,
  supervisorData,
}) => {
  // Для дропдауна будет использоваться отдельный компонент, который ещё не сделан
  const [clinic, setClinic] = useState("Клиника");

  const titleBgClasses = [styles.pink, styles.easternBlue, styles.dodgerBlue];

  // Для мультиселекта
  const [clinicsOptions, setOptions] = useState<Map<string, boolean>>(
    new Map([
      ["ИТ-Клиника", false],
      ["Клиника цифрового сопровождения образовательных проектов СПБГУ", false],
      ["Лингвистическая клиника", false],
      ["Архивный центр", false],
      ["Психологическая клиника", false],
      ["Клиника коммуникационных проектов", false],
      ["Юридическая клиника", false],
      ["Экологическая клиника", false],
    ])
  );

  const toggleOption = (option: string) =>
    setOptions((prev) => {
      const newMap = new Map(prev);
      prev.forEach((val, key) => newMap.set(key, false));
      newMap.set(option, !prev.get(option));
      return newMap;
    });

  /*
  Я вообще ни разу не горжусь тем, что мне пришлось написать весь этот ужас ниже
  Но времени на переработку особо не было, а данные от бекенда по этому блоку
  принципиально отличаются от того, что изначально предполагалось
  */
  const types: ("client" | "curator" | "supervisor")[] = [
    "client",
    "curator",
    "supervisor",
  ];

  const handleChange = (names: string[], index: number) => {
    if (projectRef.current) {
      projectRef.current[
        (types[index] + "s") as "clients" | "curators" | "supervisors"
      ] = names.map((name) => {
        return supervisorData[index].find((mapped: any) => {
          return mapped.name == name;
        })!;
      });
    }
  };

  const getInitialNames = (index: number) => {
    return (
      projectRef && projectRef.current
        ? projectRef.current[
            (types[index] + "s") as "clients" | "curators" | "supervisors"
          ]?.map((supervisor: any) => {
            return supervisor.name;
          })
        : []
    ) as string[];
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.clinic}>
          <Multiselect
            options={clinicsOptions}
            toggleOption={toggleOption}
            id="ClinicsMultiselect"
            lable="Клиника"
            theme={Theme.Blue}
          />
        </div>
        <div className={styles.supervisors}>
          {formDataRef.current!.supervisors.map((supervisor, index) => (
            <Supervisor
              key={index + "-" + supervisor.names.length}
              index={index}
              formDataRef={formDataRef}
              initialNames={getInitialNames(index)}
              onChange={handleChange}
              allNames={supervisorData[index].map(
                (supervisor) => (supervisor as any).name!
              )}
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
