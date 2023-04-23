import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./InputTextArea.module.sass";
import Image from "next/image";
import vector from "../../public/Vector.svg";
import { IFormData } from "../../pages/project_admin";
import { KeyObject } from "crypto";

interface InputTextAreaProps {
  formDataRef: React.RefObject<IFormData>;
  title: string;
  text: string;
}

const InputTextArea: FC<InputTextAreaProps> = ({
  formDataRef,
  title,
  text,
}) => {
  const [textValue, setTextValue] = useState(formDataRef.current![text]);
  const [textChange, setTextChange] = useState(false);
  const textField = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textField.current;
    el.disabled = !textChange;
    if (textChange) {
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop = 0;
    }

    // сохраняем изменения
    formDataRef.current![text] = textValue;
  }, [textChange]);

  return (
    <>
      <div className={styles.head}>
        {title}
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
