import React, { FC } from "react";
// import Image from "next/image";
import styles from "./Contener4CuTuDi&PridjectDescr.module.sass";
import CuTuDi from "../components/InfoAboutCustomerTutorDirector";
import About from "../components/AboutProject";
import { IAPIClient, IAPICurator, IAPISupervisor } from "../../../types";

// import logo from "../../public/logo.svg";

interface Contener4CuTuDiPridjectDescrProps {
  description: string | undefined;
  curators: IAPICurator[] | undefined;
  supervisors: IAPISupervisor[] | undefined;
  clients: IAPIClient[] | undefined;
}

const Contener4CuTuDiPridjectDescr: FC<Contener4CuTuDiPridjectDescrProps> = ({
  description,
  curators,
  supervisors,
  clients,
}) => {
  return (
    <div className={styles.contener}>
      <CuTuDi curators={curators} supervisors={supervisors} clients={clients} />

      <About description={description} />
    </div>
  );
};

export default Contener4CuTuDiPridjectDescr;
