import React, { useState, useRef, useEffect } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "./tags.js";

const Taglist = () => {
  return (
    <div className={styles.container}>
      {tags.map((tag) => (
        <div className={styles.tag} key={tag.title} data-url={tag.url}>
          {tag.title}
        </div>
      ))}
    </div>
  );
};

export default Taglist;
