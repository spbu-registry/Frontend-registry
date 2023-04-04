import React, { useState, useRef, useEffect, FC } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "./tags.js";




// interface TagSliderProps {tags: tags_ex}
interface TagSliderProps {}
// const TagSlider: FC<TagSliderProps> = ({tags} ) => {




const TagSlider: FC<TagSliderProps> = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
      >
        <div
          className={styles.inner}
        >
          {tags.map((tag) => (
            <div className={styles.tag} key={tag.title} data-url={tag.url}>
              {tag.title}
            </div>
          ))}
        </div>
      </div>
      </div>
  );
};

export default TagSlider;
