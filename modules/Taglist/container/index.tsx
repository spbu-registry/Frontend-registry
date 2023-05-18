import React, { useState, useRef, useEffect, FC } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "../static/tags.js";
import { IAPITag } from "../../../types";
import Link from "next/link";

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
              <Link href="/projects">{tag.name}</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TagList;
