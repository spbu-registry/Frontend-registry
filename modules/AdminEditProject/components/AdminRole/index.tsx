import React, { FC, useEffect, useMemo, useState } from "react";
import { IAPIProject, IAPIRole, IAPIStudent } from "../../../../types";
import styles from "../AdminRoles/AdminRoles.module.sass";
import Image from "next/image";
import checkedIcon from "../../../../public/admin-roles-checked.svg";
import { mockUpMembers } from "../../../AdminTeamList/components/modals/mockUpMembers";
import { SuggestedSearchSelect } from "../../../shared/components/Multiselect";
import { Theme } from "../../../shared/components/Multiselect/Components/enums";
import deleteIcon from "../../../../public/admin-delete-icon.svg";
import { ILocalRole } from "../../types";

interface AdminRoleProps {
  projectRef: React.RefObject<IAPIProject>;
  initialRole: ILocalRole;
  index: number;
  onLeadChange: (e: React.MouseEvent) => any;
  students: IAPIStudent[];
  onDelete: () => any;
}

const AdminRole: FC<AdminRoleProps> = ({
  projectRef,
  initialRole,
  index,
  onLeadChange,
  students,
  onDelete,
}) => {
  const [name, setName] = useState(initialRole.studentName || "");
  const [role, setRole] = useState(initialRole.roleName || "");

  // Suggested search using mockUp data
  const [nameInput, setNameInput] = useState(initialRole.studentName || "");
  const potentialMembers = useMemo(() => {
    return new Map(
      students
        .map((student) => student.name!)
        .filter((mockname) =>
          mockname.toLowerCase().includes(nameInput.toLowerCase())
        )
        .map((mockname) => [mockname, mockname === name])
    );
  }, [name, nameInput]);

  useEffect(() => {
    if (projectRef.current && projectRef.current.projectRoles) {
      projectRef.current.projectRoles[index] = {
        ...projectRef.current.projectRoles[index],
        role: role,
        roleId: initialRole.roleId,
        projectId: projectRef.current.projectId,
        student: students.find((student) => student.name == name),
      };
    }
  }, [name, role]);

  const handleDelete = () => {
    if (projectRef.current && projectRef.current.projectRoles) {
      projectRef.current.projectRoles = projectRef.current.projectRoles.filter(
        (role, mappedIndex) => mappedIndex != index
      );
    }
    onDelete();
  };

  return (
    <li className={styles.role} key={initialRole.studentName}>
      <h3 className={styles.studentName}>
        <SuggestedSearchSelect
          id={"editmember-name"}
          startingValue={name}
          options={potentialMembers}
          toggleOption={setName}
          setOuterInput={setNameInput}
          lable={name}
          height={3}
          theme={Theme.Form}
        />
      </h3>
      <input
        type="text"
        value={role}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRole(e.target.value);
        }}
        className={styles.roleName}
      />
      <div className={styles.isTeamLeadContainer} onClick={onLeadChange}>
        <Image
          src={checkedIcon}
          alt="Тимлид"
          className={initialRole.isTeamLead ? styles.active : ""}
        />
        <input
          type="radio"
          name="teamlead"
          defaultChecked={initialRole.isTeamLead}
          onChange={() => {}}
          className={styles.isTeamLead}
        />
      </div>
      <div className={styles.delete} onClick={handleDelete}>
        <Image src={deleteIcon} alt="Удалить участника" />
      </div>
    </li>
  );
};

export default AdminRole;
