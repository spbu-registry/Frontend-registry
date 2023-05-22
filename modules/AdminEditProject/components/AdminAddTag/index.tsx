import { FC, useEffect, useState } from "react";
import { AdminAddTag } from "./AddTag";
import { AdminTagContainer } from "./TagContainer";
import { IAPIProject, IAPITag } from "../../../../types";

export { AdminAddTag, AdminTagContainer };

interface AdminAddTagProps {
  tags: IAPITag[];
  projectRef: React.RefObject<IAPIProject>;
}

const TestAdminAddTag: FC<AdminAddTagProps> = ({ tags, projectRef }) => {
  const [suggestedTagList, setSuggestedTagList] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>(
    projectRef.current ? projectRef.current.tags!.map((tag) => tag.name!) : []
  );

  const [closed, setClosed] = useState<boolean>(true);

  const setInput = (text: string) => {
    const myTags = [
      "Робототехника",
      "C++",
      "Искусственный интеллект",
      "Аналитика",
      "Машинное обучение",
      "Математическая статистика",
      "C#",
      "Теория вероятности",
    ];
    let i = 0;
    setSuggestedTagList(
      tags
        .map((tag) => tag.name!)
        .filter((val) => {
          const result =
            val.includes(text) &&
            !activeTags.filter((tag) => val === tag).length;
          if (i < 5 && result) {
            i++;
            return result;
          }
          return false;
        })
    );
  };

  useEffect(() => {
    if (projectRef.current) {
      projectRef.current.tags = activeTags.map((tagName) => {
        const tagInDB = tags.find((tag) => tag.name == tagName);
        return { id: tagInDB ? tagInDB.tagId : null, name: tagName };
      });
      console.log(projectRef.current);
    }
  }, [activeTags]);

  return (
    <>
      {!closed ? (
        <AdminAddTag
          setInput={setInput}
          suggestedTagsList={suggestedTagList}
          setTag={(text) => {
            setActiveTags((prev) => [...prev, text]);
            setClosed(true);
          }}
          onClose={() => {
            setClosed(true);
          }}
        />
      ) : (
        <div></div>
      )}

      <AdminTagContainer
        activeTags={activeTags}
        removeTag={(text) =>
          setActiveTags((prev) => {
            return prev.filter((value) => value !== text);
          })
        }
        onAdd={() => setClosed(false)}
      />
    </>
  );
};

export { TestAdminAddTag };
