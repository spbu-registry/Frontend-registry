import React, { useState, useRef, useEffect, FC } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "./tags.js";

interface TagListProps {}

const TagList: FC<TagListProps> = () => {
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

export default TagList;
