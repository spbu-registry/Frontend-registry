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
    // setActive(n)
  };


  const [active1, setActive1] = useState(-1);
  const handleMouseOver = ( n: any) => { 
    // setActive(active== n?-1 : n)
    setActive1(n)
  };
  const handleMouseOut = ( n: any) => { 
    // setActive(active== n?-1 : n)
    setActive1(-1)
  };
  

  
  return (

    <div className={styles.InfoAboutCuTuDiInner}>
      <div className={styles.contener}>
      <h2><span className={styles.red}>Клиника: </span>
       IT - клиника </h2> 
      
        <div className={styles.cu} onClick={()=>handleClick(1)} onMouseOver={()=>handleMouseOver(1)} onMouseOut={()=>handleMouseOut(1)}>
          Заказчик  
        </div>
        <div className = {styles.hidt } style={{display: active == 1 || active1==1 ? "block" : "none"}} >
          ООО “Какой-нибудь заказчик”
        </div>
        
        <div className={styles.cu} onClick={()=>handleClick(2)} onMouseOver={()=>handleMouseOver(2)} onMouseOut={()=>handleMouseOut(2)}>
          Куратор
        </div>
        <div className = {styles.hidt} style={{display: (active == 2 || active1==2) ? "block" : "none"}}>
          Какой-нибудь Куратор
        </div>
        <div className={styles.cu} onClick={()=>handleClick(3)} onMouseOver={()=>handleMouseOver(3)} onMouseOut={()=>handleMouseOut(3)}>

        
          Руководитель
        </div>
        <div className = {styles.hidt} style={{display: active==3 || active1 ==3 ? "block" : "none"}}>
          Какой-нибудь  руководитель
        </div>
      </div>
    </div>
    
  );
};

export default InfoAboutCuTuDi;
