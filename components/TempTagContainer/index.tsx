import React, { FC, useState } from "react";
import TagFilter from "../TagFilter";
import ActiveTags from "../ActiveTags";
import Spacer from "../Spacer";

interface TempTagContainerProps {}

const TempTagContainer: FC<TempTagContainerProps> = () => {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  return (
    <div>
      <TagFilter activeTags={activeTags} setActiveTags={setActiveTags} />
      <Spacer axis="vertical" size={20} />
      {activeTags.length > 0 && (
        <ActiveTags activeTags={activeTags} setActiveTags={setActiveTags} />
      )}
    </div>
  );
};

export default TempTagContainer;
