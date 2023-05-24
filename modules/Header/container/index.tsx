import React, { Dispatch, FC, SetStateAction } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

import logo from "../../../public/logo.svg";
import Link from "next/link";
import Container from "../../shared/components/Container";

interface HeaderProps {
  popUpSetActive?: Dispatch<SetStateAction<boolean>>;
  logoColor?: string;
  type?: "admin" | "public";
}

const Header: FC<HeaderProps> = ({
  popUpSetActive,
  logoColor = "red",
  type = "public",
}) => {
  return (
    <header className={[styles.container, styles[`${logoColor}`]].join(" ")}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.image}>
            <Link href={type == "admin" ? "/admin/projects" : "/"}>
              <Image alt="Логотип СПбГУ" src={logo} />
            </Link>
          </div>
          <div>
            <nav>
              <ul className={[styles.menu, styles[`${logoColor}`]].join(" ")}>
                {type == "public" && (
                  <>
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
                  </>
                )}
                {type == "admin" && (
                  <>
                    <li>
                      <Link href="/admin/projects">Проекты</Link>
                    </li>
                    <li>
                      <Link href="/admin/teams">Команды</Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
