import React, { FC, useEffect, useRef, useState } from "react";
// import { IRole } from "..";
import styles from "./Role.module.sass";
import Image from "next/image";
// import add from "../../../public/admin-name-add.svg";
// import remove from "../../../public/admin-name-remove.svg";
// import { IFormData } from "../../pages/project_admin";
import Person from "./Person"

interface RoleProps {
  
}

const Role: FC<RoleProps> = ({}) => {
  
  return (
    <div className={styles.box}>
      <div className={styles.header}>Роли:</div>
      <Person
      nameOfrole = "ФИО" 
      nameOfPerson= "введите роль для выбранного студента..."
      checkbox= {false}
      />
      <Person
      nameOfrole = "ФИО" 
      nameOfPerson= "введите роль для выбранного студента..."
      checkbox= {true}
      />
    </div>
  );
};

export default Role;
