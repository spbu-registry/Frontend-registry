import React, { FC } from "react";
// import Image from "next/image";
import styles from "./Contener4CuTuDi&PridjectDescr.module.sass";
import CuTuDi from './InfoAboutCustomerTutorDirector';
import About from './AboutProject'

// import logo from "../../public/logo.svg";

interface Contener4CuTuDiPridjectDescrProps {}

const Contener4CuTuDiPridjectDescr: FC<Contener4CuTuDiPridjectDescrProps> = () => {
  return (
    <div className={styles.contener}>
    <CuTuDi/>
 
    <About/>
    </div>  
  );
};

export default Contener4CuTuDiPridjectDescr;
