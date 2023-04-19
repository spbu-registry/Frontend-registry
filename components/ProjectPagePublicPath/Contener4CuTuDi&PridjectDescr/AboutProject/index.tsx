import React, { FC } from "react";
// import Image from "next/image";
import styles from "./AboutProject.module.sass";

// import logo from "../../public/logo.svg";

interface AboutProjectProps {}

const AboutProject: FC<AboutProjectProps> = () => {
  return (
    <div className={styles.AboutProjectInner}>
      <h1>Описание проекта</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu tempus diam, et suscipit lacus. Nunc placerat mauris ut felis consequat, id suscipit elit tristique. Proin vitae eleifend nunc, ut placerat neque. Fusce eu sapien at nisi convallis maximus. Nullam maximus lectus sed elit pharetra imperdiet. Mauris vel dolor imperdiet, elementum lacus eget, facilisis lorem. Proin condimentum mi ac orci fringilla, ac rutrum purus vehicula. Cras feugiat sem eu porttitor consequat. Pellentesque finibus, eros et ullamcorper rutrum, diam nulla venenatis libero, et convallis augue tellus et ex. Morbi at scelerisque diam, maximus lacinia magna. Nullam ante mi, ornare non aliquet eget, efficitur vel diam. Nulla nec pellentesque ante.
      </p>
    </div>
  );
};

export default AboutProject;
