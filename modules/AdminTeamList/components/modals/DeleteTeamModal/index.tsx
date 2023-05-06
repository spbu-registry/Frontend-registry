import React, { FC } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";

interface DeleteTeamModalProps {
  onConfirm: () => any;
}

const DeleteTeamModal: FC<DeleteTeamModalProps> = ({ onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal + " " + styles.modalSmaller}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            data-close-modal
          />
        </div>
        <h2 className={styles.title}>Удаление команды</h2>
        <p className={styles.text}>
          Вы уверены, что хотите удалить команду?
          <br />
          Её невозможно будет восстановить.
        </p>
        <div className={styles.confirm} onClick={handleConfirm}>
          Удалить
        </div>
      </div>
    </div>
  );
};

export default DeleteTeamModal;
