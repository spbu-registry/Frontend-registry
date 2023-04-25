import { useState } from "react";
import { AdminAddTag } from "./AddTag";
import { AdminTagContainer } from "./TagContainer";

export {AdminAddTag, AdminTagContainer}

export function TestAdminAddTag () {
    const [suggestedTagList, setSuggestedTagList] = useState<string[]>([]);
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const [closed, setClosed] = useState<boolean>(true);

    const setInput = (text : string) => {
        const myTags = [
            'Робототехника',
            'C++', 
            'Искусственный интеллект', 
            'Аналитика', 
            'Машинное обучение', 
            'Математическая статистика',
            'C#', 
            'Теория вероятности'
        ]
        let i = 0;
        setSuggestedTagList(myTags.filter((val) => 
        {
            const result = val.includes(text) && !activeTags.filter((tag) => val === tag).length
            if (i < 5 && result) {
                i++;
                return result;
            }
            return false;
        }
        ))
    }

    return (<>

    {!closed ? <AdminAddTag
    setInput={setInput}
    suggestedTagsList={suggestedTagList}
    setTag={(text) => {setActiveTags(prev => [...prev, text]); setClosed(true);}}
    onClose={() => {setClosed(true)}}
    /> : <div></div>}

    <AdminTagContainer
    activeTags={activeTags}
    removeTag={(text) => setActiveTags((prev) => {
        return prev.filter((value) => value !== text)
    })}
    onAdd={() => setClosed(false)}
    />

    </>)
}