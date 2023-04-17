import React, { FC, useState, useEffect, useRef } from "react";
import styles from "./InputTextArea.module.sass"
import Image from "next/image";
import vector from "../../public/Vector.svg";

interface InputTextAreaProps {
    head: string
    text: string
}

const InputTextArea: FC<InputTextAreaProps> = ({ head, text }) => {
    const [textValue, setTextValue] = useState(text);
    const [textChange, setTextChange] = useState(false);
    const textField = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const el = textField.current
        el.disabled = !textChange;
        if (textChange) {
            el.focus();
            el.setSelectionRange(el.value.length, el.value.length);
            el.scrollTop = el.scrollHeight;
        } else {
            el.scrollTop = 0;
        }
    }, [textChange]);

    return (
        <>
            <div className={styles.head}>
                {head}
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
                    onChange={e => setTextValue(e.target.value)}
                    onBlur={() => setTextChange(false)}
                    disabled
                />
            </div>
        </>
    )
}

export default InputTextArea;