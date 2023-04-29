import React, { FC } from "react";
// import Image from "next/image";
import styles from "./Contener4CuTuDi&PridjectDescr.module.sass";
import CuTuDi from "../components/InfoAboutCustomerTutorDirector";
import About from "../components/AboutProject";

// import logo from "../../public/logo.svg";

interface Contener4CuTuDiPridjectDescrProps {}

const Contener4CuTuDiPridjectDescr: FC<
  Contener4CuTuDiPridjectDescrProps
> = () => {
  return (
    <div className={styles.contener}>
      <CuTuDi />

      <About />
    </div>
  );
};

export default Contener4CuTuDiPridjectDescr;
