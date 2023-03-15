import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./TagFilter.module.sass";
import { useDebounce } from "./useDebounce";

interface TagFilterProps {
  activeTags: string[];
  setActiveTags: (value: string[]) => void;
}

/*
Фильтрация предложенных тегов сейчас происходит на стороне клиента.
Предполагается, что либо все теги локально сохранены в какой-то переменной
или передаются как проп.
Переделать под фильтрацию на беке несложно: немного поменять handleChange
*/
const tags = ["абв", "абвгде", "а", "каы", "ук", "de"];

const TagFilter: FC<TagFilterProps> = ({ activeTags, setActiveTags }) => {
  const [inputText, setInputText] = useState("");
  const [suggested, setSuggested] = useState<string[]>([]);

  const debouncedSuggested = useDebounce(suggested, 200);

  //opened - чтобы можно было свернуть всплывашку, но не сбрасывать поиск
  const [opened, setOpened] = useState(false);

  //highlighted - для навигации по предложенным вариантам стрелками
  //сбрасывается на -1 при обновлении поисковой строки
  const [highlighted, setHighlighted] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setInputText(e.currentTarget.value);
  };

  const handleClickAway = (e: MouseEvent) => {
    if (
      !(e.target instanceof Element) ||
      !containerRef.current ||
      !containerRef.current.contains(e.target)
    ) {
      setOpened(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLLIElement && e.target.innerHTML) {
      setActiveTags([...activeTags, e.target.innerHTML]);
    }
    setOpened(false);
  };

  const handleFocus = () => {
    setOpened(true);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickAway);

    return () => {
      window.removeEventListener("click", handleClickAway);
    };
  }, []);

  useEffect(() => {
    if (!inputText) {
      setSuggested([]);
      return;
    }
    /*
    1. Тег должен включать в себя инпут пользователя
    2. Тега не должно быть в списке уже активных
    */
    setSuggested(
      tags.filter(
        (tag) =>
          tag.toLowerCase().includes(inputText.toLowerCase()) &&
          !activeTags.includes(tag)
      )
    );
    setHighlighted(-1);
    setOpened(true);
    /*
    вообще для activeTags можно было бы сделать отдельный
    useEffect, где будет меньше всего происходить
    (нам там нужно только обновление suggested).
    */
  }, [inputText, activeTags]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        /*
        1. Тега не должно быть в списке уже активных
        2. Инпут должен полностью совпадать с каким-то из существующих тегов
        */
        if (tags.filter((tag) => !activeTags.includes(tag)).includes(inputText))
          setActiveTags([...activeTags, inputText]);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (highlighted > 0) setHighlighted(highlighted - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (highlighted < debouncedSuggested.length - 1)
          setHighlighted(highlighted + 1);
        break;
    }
  };

  return (
    <div className={styles.tagFilter} ref={containerRef}>
      <input
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder="Начните вводить тег..."
      />
      {opened && debouncedSuggested.length > 0 && (
        <ul className={styles.popup} onClick={handleClick}>
          {debouncedSuggested.map((option, index) => (
            <li
              className={index == highlighted ? styles.highlight : ""}
              key={option}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagFilter;
