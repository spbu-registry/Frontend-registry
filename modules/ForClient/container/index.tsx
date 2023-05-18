import React, { FC } from "react";
import styles from "./ForClient.module.sass";
import Link from "next/link";

interface ForClientProps {}

const ForClient: FC<ForClientProps> = () => {
  return (
    <div>
      <h2 className={styles.header}>Заказчикам</h2>
      <p className={styles.text}>
        Если у вас есть проект, который вы хотите поручить одной из клиник, то
        заполните{" "}
        <span className={styles.highlighted}>
          <Link href="./clientform">заявку</Link>
        </span>{" "}
        и с вами свяжутся
      </p>
    </div>
  );
};

export default ForClient;
