import React, { FC, useEffect, useState } from "react";
import { IAPIProject, IAPIStudent } from "../../../../types";
import styles from "./AdminRoles.module.sass";
import checkedIcon from "../../../../public/admin-roles-checked.svg";
import Image from "next/image";
import AdminRole from "../AdminRole";

interface AdminRolesProps {
  projectRef: React.RefObject<IAPIProject>;
  students: IAPIStudent[];
}

const AdminRoles: FC<AdminRolesProps> = ({ projectRef, students }) => {
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
          <AdminRole
            projectRef={projectRef}
            initialRole={role}
            index={index}
            onLeadChange={generateHandleLeadChange(index)}
            students={students}
          />
        ))}
      </ul>
    </>
  );
};

export default AdminRoles;
