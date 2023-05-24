import React, { FC, useEffect, useState } from "react";
import { IAPIProject, IAPIStudent } from "../../../../types";
import styles from "./AdminRoles.module.sass";
import checkedIcon from "../../../../public/admin-roles-checked.svg";
import Image from "next/image";
import AdminRole from "../AdminRole";
import { ILocalRole } from "../../types";

interface AdminRolesProps {
  projectRef: React.RefObject<IAPIProject>;
  students: IAPIStudent[];
}

const AdminRoles: FC<AdminRolesProps> = ({ projectRef, students }) => {
  const [roles, setRoles] = useState<ILocalRole[]>(
    projectRef.current
      ? projectRef.current.projectRoles!.map((role) => {
          return {
            roleId: role.roleId,
            studentName: role.student ? role.student.name : "",
            roleName: role.role,
            isTeamLead: false,
          };
        })
      : []
  );

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

  const handleAdd = () => {
    setRoles([
      ...roles,
      {
        roleId: null,
        roleName: "",
        studentName: "",
        isTeamLead: false,
      },
    ]);
  };

  const handleDelete = (index: number) => {
    console.log(roles[index]);
    setRoles(roles.filter((role, mappedIndex) => index != mappedIndex));
  };

  return (
    <>
      <h2 className={styles.title}>Роли</h2>
      <ul>
        {roles.map((role, index) => (
          <AdminRole
            key={"" + role.roleId + index + role.roleName + role.studentName}
            projectRef={projectRef}
            initialRole={role}
            index={index}
            onLeadChange={generateHandleLeadChange(index)}
            students={students}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </ul>
      <div className={styles.add} onClick={handleAdd}>
        +
      </div>
    </>
  );
};

export default AdminRoles;
