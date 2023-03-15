import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./TagFilter.module.sass";
import { useDebounce } from "./useDebounce";

interface TagFilterProps {}

/*
Фильтрация предложенных тегов сейчас происходит на стороне клиента.
Предполагается, что либо все теги локально сохранены в какой-то переменной
или передаются как проп.
Переделать под фильтрацию на беке несложно: немного поменять handleChange
*/
const filters = ["абв", "абвгде", "а", "каы", "ук", "de"];

const TagFilter: FC<TagFilterProps> = () => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const debouncedFilters = useDebounce(activeFilters, 200);

  //opened - чтобы можно было свернуть всплывашку, но не сбрасывать поиск
  const [opened, setOpened] = useState(false);

  //highlighted - для навигации по предложенным вариантам стрелками
  //сбрасывается на -1 при обновлении поисковой строки
  const [highlighted, setHighlighted] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) {
      setActiveFilters([]);
      return;
    }
    setActiveFilters(
      filters.filter((filter) =>
        filter.toLowerCase().includes(e.currentTarget.value.toLowerCase())
      )
    );
    setHighlighted(-1);
    setOpened(true);
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
      /*
      коллбек
      */
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        e.preventDefault();
        /*
        коллбек
        */
        break;
      case "ArrowUp":
        e.preventDefault();
        if (highlighted > 0) setHighlighted(highlighted - 1);
        break;
      case "ArrowDown":
        e.preventDefault();
        if (highlighted < debouncedFilters.length - 1)
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
      {opened && debouncedFilters.length > 0 && (
        <ul className={styles.popup} onClick={handleClick}>
          {debouncedFilters.map((filter, index) => (
            <li
              className={index == highlighted ? styles.highlight : ""}
              key={filter}
            >
              {filter}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagFilter;
