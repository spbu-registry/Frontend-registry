import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./AdminEditTitle.module.sass";
import { IAPIProject } from "../../../../types";
import editIcon from "../../../../public/Vector.svg";
import Image from "next/image";

interface AdminEditTitleProps {
  projectRef: React.RefObject<IAPIProject>;
}

const AdminEditTitle: FC<AdminEditTitleProps> = ({ projectRef }) => {
  const [title, setTitle] = useState(
    projectRef.current ? projectRef.current.name : ""
  );
  const [textChange, setTextChange] = useState(false);

  const textField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = textField.current;
    if (el) {
      el.disabled = !textChange;
      if (textChange) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
        el.scrollTop = el.scrollHeight;
      } else {
        el.scrollTop = 0;
      }
    }

    // сохраняем изменения
    projectRef.current!.name = title;
  }, [textChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.blockTitle}>Название проекта:</h2>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={title}
          ref={textField}
          onChange={handleChange}
          onBlur={() => setTextChange(false)}
          className={styles.titleInput}
          disabled
        />
        <Image
          alt=""
          className={styles.img}
          src={editIcon}
          onClick={() => setTextChange(true)}
        />
      </div>
    </div>
  );
};

export default AdminEditTitle;
