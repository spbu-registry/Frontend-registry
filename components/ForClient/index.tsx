import React, { FC } from "react";
import styles from "./ForClient.module.sass";

interface ForClientProps {}

const ForClient: FC<ForClientProps> = () => {
  return (
    <div>
      <h2 className={styles.header}>Заказчикам</h2>
      <p className={styles.text}>
        Если у вас есть проект, который вы хотите поручить одной из клиник, то
        заполните заявку и с вами свяжутся
      </p>
    </div>
  );
};

export default ForClient;
