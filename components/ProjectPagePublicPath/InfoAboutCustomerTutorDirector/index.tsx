import React, { FC }  from "react";
import { useState } from "react";
// import Image from "next/image";
import styles from "./InfoAboutCuTuDi.module.sass";
import { spawn } from "child_process";
import next from "next/types";

// import logo from "../../public/logo.svg";

interface InfoAboutCuTuDiProps {}


const InfoAboutCuTuDi: FC<InfoAboutCuTuDiProps> = () => {  

  
  const [active, setActive] = useState(-1);
  const handleClick = ( n: any) => { 
    setActive(active== n?-1 : n)
  };



  
  return (
    <div className={styles.InfoAboutCuTuDiInner}>
      <h2>Клиника: IT - клиника </h2> 
      <div>
        <div className={styles.cu} onClick={()=>handleClick(1)} onMouseOver={()=>handleClick(1)}>
          Заказчик  
        </div>
        <div className = {styles.hidt } style={{display: active == 1 ? "block" : "none"}} >
          ООО “Какой-нибудь заказчик”
        </div>
        
        <div className={styles.cu} onClick={()=>handleClick(2)} onMouseOver={()=>handleClick(2)}>
          Куратор
        </div>
        <div className = {styles.hidt} style={{display: active == 2 ? "block" : "none"}}>
          Какой-нибудь Куратор
        </div>
        <div className={styles.cu} onClick={()=>handleClick(3)} onMouseOver={()=>handleClick(3)}>
        
          Руководитель
        </div>
        <div className = {styles.hidt} style={{display: active==3 ? "block" : "none"}}>
          Какой-нибудь  руководитель
        </div>
      </div>
    </div>
    
  );
};

export default InfoAboutCuTuDi;
