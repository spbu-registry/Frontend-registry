import React, { FC, useContext } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";
import { IDeleteMemberData } from "../../../types";
import { TeamsContext } from "../../../context/teams";

interface DeleteMemberModalProps {
  data: IDeleteMemberData;
  onClose: () => any;
}

const DeleteMemberModal: FC<DeleteMemberModalProps> = ({ data, onClose }) => {
  const { teams, setTeams } = useContext(TeamsContext);

  const handleConfirm = () => {
    if (data.teamId) {
      // fetch
      setTeams(
        teams.map((team) =>
          team.id == data.teamId
            ? {
                ...team,
                members: team.members.filter(
                  (member, index) => index != data.memberIndex
                ),
              }
            : team
        )
      );

      onClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal + " " + styles.modalSmaller}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            onClick={handleClose}
          />
        </div>
        <h2 className={styles.title}>Удаление участника команды</h2>
        <p className={styles.text}>
          Вы уверены, что хотите удалить участника?
          <br />
          Его невозможно будет восстановить.
        </p>
        <div className={styles.confirm} onClick={handleConfirm}>
          Удалить
        </div>
      </div>
    </div>
  );
};

export default DeleteMemberModal;
