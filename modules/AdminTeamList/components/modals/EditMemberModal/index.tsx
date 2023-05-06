import React, { FC, useState } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";

interface EditMemberModalProps {
  title: string;
  initialName: string;
  initialRole: string;
  onConfirm: (name: string, role: string) => any;
}

const EditMemberModal: FC<EditMemberModalProps> = ({
  title,
  initialName,
  initialRole,
  onConfirm,
}) => {
  const [name, setName] = useState(initialName);
  const [role, setRole] = useState(initialRole);

  const handleConfirm = () => {
    onConfirm(name, role);
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            data-close-modal
          />
        </div>
        <h2 className={styles.title}>{title}</h2>
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

export default EditMemberModal;
