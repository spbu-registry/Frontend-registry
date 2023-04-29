import React, { FC } from "react";

interface ActiveTagsProps {
  activeTags: string[];
  toggleTag: (value: string) => void;
}
import styles from "./ActiveTags.module.sass";

const ActiveTags: FC<ActiveTagsProps> = ({ activeTags, toggleTag }) => {
  const handleRemoveTag = (tag: string) => {
    const foundTags = activeTags.find((mapped) => mapped === tag);
    if (foundTags === undefined) return;
    toggleTag(foundTags);
  };

  return (
    <ul className={styles.taglist}>
      {activeTags.map((tag) => (
        <li className={styles.tag} key={tag}>
          <span
            className={styles.delete}
            onClick={() => handleRemoveTag(tag)}
          />
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default ActiveTags;
