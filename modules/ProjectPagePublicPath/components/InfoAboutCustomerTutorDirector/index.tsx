import React, { FC } from "react";
import { useState } from "react";
// import Image from "next/image";
import styles from "./InfoAboutCuTuDi.module.sass";
import { spawn } from "child_process";
import next from "next/types";
import Spacer from "../../../shared/components/Spacer";
import { IAPIClient, IAPICurator, IAPISupervisor } from "../../../../types";

// import logo from "../../public/logo.svg";

interface InfoAboutCuTuDiProps {
  curators: IAPICurator[] | undefined;
  supervisors: IAPISupervisor[] | undefined;
  clients: IAPIClient[] | undefined;
}

const InfoAboutCuTuDi: FC<InfoAboutCuTuDiProps> = ({
  curators,
  supervisors,
  clients,
}) => {
  const [active, setActive] = useState(-1);
  const handleClick = (n: any) => {
    setActive(active == n ? -1 : n);
    // setActive(n)
  };

  const [active1, setActive1] = useState(-1);
  const handleMouseOver = (n: any) => {
    // setActive(active== n?-1 : n)
    setActive1(n);
  };
  const handleMouseOut = (n: any) => {
    // setActive(active== n?-1 : n)
    setActive1(-1);
  };

  return (
    <div className={styles.InfoAboutCuTuDiInner}>
      <div className={styles.contener}>
        <h2>
          <span className={styles.red}>Клиника: </span>
          IT - клиника{" "}
        </h2>
        <Spacer axis="vertical" size={30} />
        {clients && clients.length != 0 && (
          <div
            className={styles.box}
            onClick={() => handleClick(1)}
            onMouseOver={() => handleMouseOver(1)}
            onMouseOut={() => handleMouseOut(1)}
          >
            <div
              className={styles.cu + " " + styles.opal}
              style={{
                borderColor: "#c2333300",
              }}
            >
              Заказчик
            </div>
            <div
              className={styles.hidt}
              style={{
                display: active == 1 || active1 == 1 ? "block" : "none",
              }}
            >
              {clients.map((client) => (
                <p>{client.name}</p>
              ))}
            </div>
          </div>
        )}

        {curators && curators.length != 0 && (
          <div
            className={styles.box}
            onClick={() => handleClick(2)}
            onMouseOver={() => handleMouseOver(2)}
            onMouseOut={() => handleMouseOut(2)}
          >
            <div
              className={styles.cu + " " + styles.pink}
              style={{ borderColor: "#c2333300" }}
            >
              Куратор
            </div>
            <div
              className={styles.hidt}
              style={{
                display: active == 2 || active1 == 2 ? "block" : "none",
              }}
            >
              {curators.map((curator) => (
                <p>{curator.name}</p>
              ))}
            </div>
          </div>
        )}

        {supervisors && supervisors.length != 0 && (
          <div
            className={styles.box}
            onClick={() => handleClick(3)}
            onMouseOver={() => handleMouseOver(3)}
            onMouseOut={() => handleMouseOut(3)}
          >
            <div
              className={styles.cu + " " + styles.yellow}
              style={{
                borderColor: "#c2333300",
              }}
            >
              Руководитель
            </div>
            <div
              className={styles.hidt}
              style={{
                display: active == 3 || active1 == 3 ? "block" : "none",
              }}
            >
              {supervisors.map((supervisor) => (
                <p>{supervisor.name}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoAboutCuTuDi;
