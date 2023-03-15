import React, { FC } from "react";

interface ActiveTagsProps {
  activeTags: string[];
  setActiveTags: (value: string[]) => void;
}
import styles from "./ActiveTags.module.sass";

const ActiveTags: FC<ActiveTagsProps> = ({ activeTags, setActiveTags }) => {
  const handleRemoveTag = (tag: string) => {
    setActiveTags(activeTags.filter((mapped) => mapped != tag));
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
