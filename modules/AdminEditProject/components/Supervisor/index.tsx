import React, { FC, useEffect, useRef, useState } from "react";
import { ISupervisor } from "../../types";
import styles from "./Supervisor.module.sass";
import Image from "next/image";
import add from "../../../../public/admin-name-add.svg";
import remove from "../../../../public/admin-name-remove.svg";
import { IFormData } from "../../types";
import { SuggestedSearch } from "../../../shared";
import { supervisorMockUp } from "./supervisorMockUp";
import { Theme } from "../../../shared/components/Multiselect/Components/enums";


interface SupervisorProps {
  initialNames: string[];
  titleClass?: string;
  className?: string;
  index: number;
  formDataRef: React.RefObject<IFormData>;
}

const Supervisor: FC<SupervisorProps> = ({
  titleClass = "",
  className = "",
  index,
  formDataRef,
}) => {

  const [input, setInput] = useState<string>('')

  const [names, setNames] = useState<Map<string, boolean>>(
    new Map(supervisorMockUp.map((name) => [name, false] as [string, boolean]))
  );

  const handleRemove = (key: string) =>
    setNames(prev => {
      const newMap = new Map(prev)
      newMap.set(key, false);
      return newMap
    });
  
  const handleToggle = (key: string) =>
    setNames(prev => {
      const newMap = new Map(prev)
      newMap.set(key, !prev.get(key));
      return newMap
    });

  /*
  В остальных компонентах нужно будет сделать примерно то же самое,
  только с другими свойствами объекта formDataRef.current
  */
  useEffect(() => {
    formDataRef.current!.supervisors[index] = {
      ...formDataRef.current!.supervisors[index],
      names: Array.from(names.keys()),
    };
  }, [names]);

  // Filter names by input
  useEffect(() =>
    setNames((prev) => {
      const newMap = new Map(
        supervisorMockUp
        .map((name) => [name, false] as [string, boolean])
        .filter(([name]) => name.toLowerCase().includes(input.toLowerCase()))
      )
      prev.forEach((value, key) => {
        if (newMap.get(key) !== undefined) newMap.set(key, value)
      })
      return newMap
    }), [input])

  return (
    <div className={className + " " + styles.container}>
      <div className={styles.title + " " + titleClass}>
        {formDataRef.current!.supervisors[index].title}
      </div>
      <div>
      <div className={styles.addBlock}>
          <SuggestedSearch
          id={`Supervisor-Select-${index}`}
          options={names}
          toggleOption={handleToggle}
          lable="Выберите заказчика"
          setOuterInput={(str) => setInput(str)}
          theme={Theme.Simple}
          height={3}
          />
        </div>
        <div className={styles.names}>
          {Array.from(names.keys()).map((name) => ( names.get(name) ?
            <div key={name} className={styles.name}>
              {name}
              <button 
              className={styles.nameRemove} 
              onClick={() => handleRemove(name)}>
                <Image src={remove} alt="Удалить" />
              </button>
            </div> : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default Supervisor;
