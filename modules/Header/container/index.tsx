import React, { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

import logo from "../../../public/logo.svg";
import Link from "next/link";
import Container from "../../shared/components/Container";

interface HeaderProps {
  popUpSetActive?: Dispatch<SetStateAction<boolean>>;
  logoColor?: string;
}

const Header: FC<HeaderProps> = ({ popUpSetActive, logoColor = "red" }) => {
  return (
    <header className={[styles.container, styles[`${logoColor}`]].join(" ")}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.image}>
            <Link href="/">
              <Image alt="Логотип СПбГУ" src={logo} />
            </Link>
          </div>
          <div>
            <nav>
              <ul className={[styles.menu, styles[`${logoColor}`]].join(" ")}>
                <li>
                  <a href="https://spbu.ru/universitet/klinika-spbgu">
                    Клиники
                  </a>
                </li>
                <li>
                  <Link href="/projects">Проекты</Link>
                </li>
                <li>
                  <Link href="/clientform">Заказчикам</Link>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => {
                      if (popUpSetActive) {
                        popUpSetActive(true);
                      }
                    }}
                  >
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
