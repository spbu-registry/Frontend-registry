import React, { FC } from "react";
import styles from "./AdminModals.module.sass";
import closeIcon from "../../../../public/admin-delete-icon.svg";
import Image from "next/image";

interface DeleteProjectModalProps {
  projectId: number;
  onClose: () => any;
  onDelete: (id: number) => any;
}

const DeleteProjectModal: FC<DeleteProjectModalProps> = ({
  projectId,
  onClose,
  onDelete,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.modal + " " + styles.modalSmaller}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            onClick={onClose}
          />
        </div>
        <h2 className={styles.title}>Удаление проекта</h2>
        <p className={styles.text}>
          Вы уверены, что хотите удалить проект?
          <br />
          Его невозможно будет восстановить.
        </p>
        <div className={styles.confirm} onClick={() => onDelete(projectId)}>
          Удалить
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal;
