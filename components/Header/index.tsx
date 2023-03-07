import React, { FC } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

import logo from "../../public/logo.svg";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  return (
    <header className={styles.container}>
      <div className={styles.image}>
        <Image alt="Логотип СПбГУ" src={logo} />
      </div>
      <div className={styles.inner}>
        <nav>
          <ul className={styles.menu}>
            <li>
              <a href="https://spbu.ru/universitet/klinika-spbgu">Клиники</a>
            </li>
            <li>Проекты</li>
            <li>Заказчикам</li>
            <li>Войти</li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
