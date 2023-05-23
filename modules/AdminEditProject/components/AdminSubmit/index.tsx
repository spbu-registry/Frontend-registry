import React, { FC } from "react";
import { IAPIProject, IAPIProjectToSave } from "../../../../types";
import styles from "./AdminSubmit.module.sass";
import { setProject } from "../../../shared/lib/projects";

interface AdminSubmitProps {
  projectRef: React.RefObject<IAPIProject>;
}

const AdminSubmit: FC<AdminSubmitProps> = ({ projectRef }) => {
  const save = async (projectData: IAPIProjectToSave) => {
    const result = await setProject(projectData);
  };

  const handleSave = () => {
    if (projectRef.current) {
      const { clinics, clients, curators, supervisors, ...projectToSave } = {
        ...projectRef.current,
        clinicIds: projectRef.current.clinics
          ? projectRef.current.clinics.map((clinic) => clinic.clinicId!)
          : null,
        clientsIds: projectRef.current.clients
          ? projectRef.current.clients.map((curator) => curator.clientId!)
          : null,
        curatorsIds: projectRef.current.curators
          ? projectRef.current.curators.map((curator) => curator.curatorId!)
          : null,
        supervisorsIds: projectRef.current.supervisors
          ? projectRef.current.supervisors.map(
              (supervisor) => supervisor.supervisorId!
            )
          : null,
        projectRoles: projectRef.current.projectRoles
          ? projectRef.current.projectRoles.map((role) => ({
              ...role,
              student: { studentId: role.student!.studentId },
            }))
          : [],
      };

      save(projectToSave);
    }
  };

  return (
    <div className={styles.submit} onClick={handleSave}>
      Сохранить изменения
    </div>
  );
};

export default AdminSubmit;
