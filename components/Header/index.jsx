import React from "react";
import Image from "next/image";
import styles from "./Header.module.css";

import logo from "../../public/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerImage}>
        <Image alt="Логотип СПбГУ" src={logo} />
      </div>
      <div className={styles.headerInner}>
        <nav className={styles.headerMenuContainer}>
          <ul className={styles.headerMenu}>
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
