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
      e.preventDefault();
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
    return (e: React.MouseEvent) => {
      e.preventDefault();
      setRoles(
        roles.map((role, mappedIndex) =>
          mappedIndex == index
            ? { ...role, isTeamLead: !role.isTeamLead }
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
    }
  }, [roles]);

  return (
    <>
      <h2 className={styles.title}>Роли</h2>
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
            <div
              className={styles.isTeamLeadContainer}
              onClick={generateHandleLeadChange(index)}
            >
              <Image
                src={checkedIcon}
                alt="Тимлид"
                className={role.isTeamLead ? styles.active : ""}
              />
              <input
                type="radio"
                name="teamlead"
                defaultChecked={role.isTeamLead}
                onChange={() => {}}
                className={styles.isTeamLead}
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AdminRoles;
