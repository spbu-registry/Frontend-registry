import React, { FC } from "react";
import styles from "./styles.module.sass";

interface MainPageBgProps {
  children: React.ReactNode;
  image: string;
}

const MainPageBg: FC<MainPageBgProps> = ({ children, image }) => {
  return (
    <div
      className={styles.background}
      style={{ backgroundImage: "url(" + image + ")", marginTop: "30px" }}
    >
      {children}
    </div>
  );
};

export default MainPageBg;
