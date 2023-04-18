import React, { FC } from "react";
import styles from "./YearFilter.module.sass";

interface YearFilterProps {}

const YearFilter: FC<YearFilterProps> = () => {
  /*
  Пока не добавлял логику, потому что не особо ясно, как именно
  себя должен вести фильтр, когда год не выбран 
  (и как передумать выбирать год и оставить пустым)
  */
  return (
    <div className={styles.container}>
      <p className={styles.label + " " + styles.labelFirst}>
        Отобразить проекты от
      </p>
      <input className={styles.input} type="number" />
      <p className={styles.label}>до</p>
      <input className={styles.input} type="number" />
    </div>
  );
};

export default YearFilter;
