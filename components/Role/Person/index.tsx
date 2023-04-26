import React, { FC, useEffect, useRef, useState } from "react";
// import { IRole } from "..";
import styles from "./Person.module.sass";
import Image from "next/image";
// import add from "../../../public/admin-name-add.svg";
// import remove from "../../../public/admin-name-remove.svg";
// import { IFormData } from "../../pages/project_admin";


interface PersonProps {
  nameOfrole: string
  nameOfPerson: string
  checkbox: boolean
}

const Role: FC<PersonProps> = (props) => {
  
  return (
    <div>
      <div className={styles.NameOfRole}> {props.nameOfrole}</div>
      <input type ="text"
      placeholder={props.nameOfPerson}
      className={styles.NameOfPerson}></input>
      
      <input type="radio"
      name="Lead"
      // checked = {props.checkbox}
      className={styles.RadioBox}></input>  
    </div>
  );
};

export default Role;
