import React, { FC, useEffect, useState } from "react";
import { IAPIProject } from "../../../../types";
import styles from "./AdminRoles.module.sass";
import checkedIcon from "../../../../public/admin-roles-checked.svg";
import Image from "next/image";

interface AdminRolesProps {
  projectRef: React.RefObject<IAPIProject>;
}

const AdminRoles: FC<AdminRolesProps> = ({ projectRef }) => {
  const [roles, setRoles] = useState(
    projectRef.current
      ? projectRef.current.projectRoles!.map((role) => {
          return {
            studentName: role!.student!.name,
            roleName: role.role,
            isTeamLead: false,
          };
        })
      : []
  );

  const generateHandleRoleChange = (index: number) => {
    return (e: React.ChangeEvent) => {
      setRoles(
        roles.map((role, mappedIndex) =>
          mappedIndex == index
            ? { ...role, roleName: (e.target as HTMLInputElement).value }
            : role
        )
      );
    };
  };

  const generateHandleLeadChange = (index: number) => {
    return () => {
      setRoles(
        roles.map((role, mappedIndex) =>
          mappedIndex == index
            ? { ...role, isTeamLead: true }
            : { ...role, isTeamLead: false }
        )
      );
    };
  };

  useEffect(() => {
    if (projectRef.current && projectRef.current.projectRoles) {
      projectRef.current.projectRoles = projectRef.current.projectRoles.map(
        (role, index) => {
          return { ...role, role: roles[index].roleName };
        }
      );
      console.log(projectRef.current);
    }
  }, [roles]);

  return (
    <ul>
      {roles.map((role, index) => (
        <li className={styles.role} key={role.studentName}>
          <h3 className={styles.studentName}>{role.studentName}</h3>
          <input
            type="text"
            value={role.roleName}
            onChange={generateHandleRoleChange(index)}
            className={styles.roleName}
          />
          <div className={styles.isTeamLeadContainer}>
            <input
              type="radio"
              name="teamlead"
              checked={role.isTeamLead}
              onChange={generateHandleLeadChange(index)}
              className={styles.isTeamLead}
            />
            <Image
              src={checkedIcon}
              alt="Тимлид"
              className={role.isTeamLead ? styles.active : ""}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AdminRoles;
