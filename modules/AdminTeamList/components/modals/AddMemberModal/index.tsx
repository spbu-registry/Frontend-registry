import React, { FC, useContext, useState } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";
import { IAddMemberData } from "../../../types";
import { TeamsContext } from "../../../context/teams";

interface AddMemberModalProps {
  data: IAddMemberData;
  onClose: () => any;
}

const AddMemberModal: FC<AddMemberModalProps> = ({ data, onClose }) => {
  const [name, setName] = useState(data.member.name);
  const [role, setRole] = useState(data.member.role);

  const { teams, setTeams } = useContext(TeamsContext);

  const handleConfirm = () => {
    if (data.teamId) {
      // fetch
      setTeams(
        teams.map((team) =>
          team.id == data.teamId
            ? {
                ...team,
                members: [
                  ...team.members,
                  { name: name, role: role, isTeamLead: false },
                ],
              }
            : team
        )
      );
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            onClick={handleClose}
          />
        </div>
        <h2 className={styles.title}>Добавление нового участника</h2>
        <div className={styles.field}>
          <label htmlFor="editmember-name" className={styles.label}>
            ФИО:
          </label>
          <input
            id="editmember-name"
            value={name}
            type="text"
            className={styles.input}
            onChange={(e: React.ChangeEvent) => {
              if (e.currentTarget instanceof HTMLInputElement)
                setName(e.currentTarget.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="editmember-role" className={styles.label}>
            Роль:
          </label>
          <input
            id="editmember-role"
            type="text"
            value={role}
            className={styles.input}
            onChange={(e: React.ChangeEvent) => {
              if (e.currentTarget instanceof HTMLInputElement)
                setRole(e.currentTarget.value);
            }}
          />
        </div>
        <div onClick={handleConfirm} className={styles.confirm}>
          Добавить
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
