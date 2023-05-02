import React, { FC } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

import logo from "../../../public/logo.svg";
import Link from "next/link";
import Container from "../../shared/components/Container";

interface HeaderProps {
  popUpSetActive?: any;
}

const Header: FC<HeaderProps> = ({ popUpSetActive }) => {
  return (
    <header className={styles.container}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.image}>
            <Image alt="Логотип СПбГУ" src={logo} />
          </div>
          <div>
            <nav>
              <ul className={styles.menu}>
                <li>
                  <a href="https://spbu.ru/universitet/klinika-spbgu">
                    Клиники
                  </a>
                </li>
                <li>
                  <Link href="/projects">Проекты</Link>
                </li>
                <li>Заказчикам</li>
                <li>
                  <a href="#" onClick={() => popUpSetActive(true)}>
                    Войти
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;