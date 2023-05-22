import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./InputTextArea.module.sass";
import Image from "next/image";
import vector from "../../../../public/Vector.svg";
import { IFormData } from "../../types";
import { IAPIProject } from "../../../../types";

const titles = {
  description: "Описание проекта",
  requirements: "Требования проекта",
  requirementsForPerformers: "Требование к исполнителю",
};

interface InputTextAreaProps {
  projectRef: React.RefObject<IAPIProject>;
  title: string;
  text: "description" | "requirements" | "requirementsForPerformers";
}

const InputTextArea: FC<InputTextAreaProps> = ({ projectRef, text }) => {
  const [textValue, setTextValue] = useState(projectRef.current![text]);
  const [textChange, setTextChange] = useState(false);
  const textField = useRef<HTMLTextAreaElement>(null);

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
    projectRef.current![text] = textValue;
  }, [textChange]);

  return (
    <>
      <div className={styles.head}>
        {titles[text]}
        <Image
          alt=""
          className={styles.img}
          src={vector}
          onClick={() => setTextChange(true)}
        />
      </div>

      <div className={styles.border}>
        <textarea
          className={styles.textfield}
          ref={textField}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          onBlur={() => setTextChange(false)}
          disabled
        />
      </div>
    </>
  );
};

export default InputTextArea;
