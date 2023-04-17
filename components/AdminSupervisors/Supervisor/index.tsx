import React, { FC, useEffect, useRef, useState } from "react";
import { ISupervisor } from "..";
import styles from "./Supervisor.module.sass";
import Image from "next/image";
import add from "../../../public/admin-name-add.svg";
import remove from "../../../public/admin-name-remove.svg";
import { IFormData } from "../../../pages/project_admin";

interface SupervisorProps {
  initialNames: string[];
  titleColor?: string;
  className?: string;
  index: number;
  formDataRef: React.RefObject<IFormData>;
}

const Supervisor: FC<SupervisorProps> = ({
  titleColor = "#C5A7AF",
  className = "",
  index,
  formDataRef,
}) => {
  const [userInput, setUserInput] = useState("");

  const [names, setNames] = useState<string[]>(
    formDataRef.current!.supervisors[index].names
  );

  const namesRef = useRef<HTMLDivElement>(null);

  const handleAdd = (value: string) => {
    if (value) {
      setNames([...names, value]);
      setUserInput("");
    }
  };

  const handleRemove = (index: number) => {
    setNames(names.filter((name, mappedIndex) => mappedIndex != index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        handleAdd(userInput);
        break;
    }
  };

  const handleRemoveName = (e: React.MouseEvent) => {
    /*
    Срабатывает только если пользователь нажал на картинку крестика
    или на контейнер для крестика (хотя по идее на контейнер он нажать не сможет,
    но лишним не будет) и при этом элемент должен находиться внутри рефа с именами
    */
    if (
      e.target instanceof HTMLElement &&
      (e.target instanceof HTMLButtonElement ||
        e.target.parentNode instanceof HTMLButtonElement) &&
      e.currentTarget.contains(e.target)
    ) {
      handleRemove(
        Array.from(e.currentTarget.children).findIndex((child) =>
          child.contains(e.target as HTMLButtonElement)
        )
      );
    }
  };

  /*
  В остальных компонентах нужно будет сделать примерно то же самое,
  только с другими свойствами объекта formDataRef.current
  */
  useEffect(() => {
    formDataRef.current!.supervisors[index] = {
      ...formDataRef.current!.supervisors[index],
      names: names,
    };
  }, [names]);

  return (
    <div className={className + " " + styles.container}>
      <div className={styles.title} style={{ backgroundColor: titleColor }}>
        {formDataRef.current!.supervisors[index].title}
      </div>
      <div>
        <div className={styles.names} ref={namesRef} onClick={handleRemoveName}>
          {names.map((name) => (
            <div key={name} className={styles.name}>
              {name}
              <button className={styles.nameRemove}>
                <Image src={remove} alt="Удалить" />
              </button>
            </div>
          ))}
        </div>
        <div className={styles.addBlock}>
          <input
            value={userInput}
            onKeyDown={handleKeyDown}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUserInput(e.target.value)
            }
            className={styles.addText}
            placeholder="Введите текст..."
          />
          <button
            onClick={() => handleAdd(userInput)}
            className={styles.addButton}
          >
            <Image src={add} alt="Добавить" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Supervisor;
