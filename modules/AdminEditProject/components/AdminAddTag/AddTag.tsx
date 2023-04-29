import styles from "./AddTag.module.scss";
import { useState, useEffect } from "react";
import { useDebounce } from "../../../unused/components/TagFilter/useDebounce";
import classNames from "classnames";

interface AdminAddTagProps {
  setInput: (text: string) => void;
  suggestedTagsList: string[];
  setTag: (text: string) => void;
  onClose: () => void;
}

export function AdminAddTag({
  setInput,
  suggestedTagsList,
  setTag,
  onClose,
}: AdminAddTagProps) {
  const [currentInput, setCurrentInput] = useState<string>("");
  const debounced = useDebounce(currentInput, 200);

  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setInput(debounced);
  }, [debounced]);

  useEffect(() => {
    const filtered = suggestedTagsList.filter(
      (value) => value.toLowerCase() === currentInput.toLowerCase()
    );
    setDisabled(!filtered.length);
  }, [currentInput, suggestedTagsList]);

  const buttonClassName = classNames(styles.Button, {
    [styles.Active]: !disabled,
  });

  return (
    <div className={styles.PopUp}>
      <div className={styles.Wrapper}>
        <svg
          onClick={() => onClose()}
          className={styles.Close}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>close</title>
          <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>

        <div className={styles.Text1}>Добавление нового тега:</div>

        <input
          className={styles.Input}
          type="text"
          placeholder="Начните вводить тег..."
          onChange={(event) => setCurrentInput(event.target.value)}
          value={currentInput}
        />

        <div className={styles.Text2}>
          {!!suggestedTagsList.length
            ? "Возможны вы захотите добавить эти теги:"
            : "Нет тегов, подходящих под данное описание"}
        </div>

        <ul className={styles.TagList}>
          {suggestedTagsList.map((value) => {
            return (
              <li key={value} onClick={() => setCurrentInput(value)}>
                {value}
              </li>
            );
          })}
        </ul>

        <button
          onClick={!disabled ? () => setTag(currentInput) : undefined}
          className={buttonClassName}
        >
          {disabled ? "Выберите тег" : "Отправить"}
        </button>
      </div>
    </div>
  );
}
