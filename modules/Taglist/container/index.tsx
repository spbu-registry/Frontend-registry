import React, { useState, useRef, useEffect, FC } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "../static/tags.js";
import { IAPITag } from "../../../types";

interface TagListProps {
  tags: IAPITag[] | undefined;
}

const TagList: FC<TagListProps> = ({ tags }) => {
  return (
    <>
      {tags && (
        <div className={styles.container}>
          {tags.map((tag) => (
            <div className={styles.tag} key={tag.name}>
              {tag.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagList;
