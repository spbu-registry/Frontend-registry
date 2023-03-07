import React, { useState, useRef, useEffect, FC } from "react";
import styles from "./Taglist.module.sass";
import { tags } from "./tags.js";

/* 
widthPercent - ширина в процентах всего слайдера относительно видимой части
Сделал отдельной переменной, чтобы, если надо будет, на разных размерах экрана
использовать разные значения
*/
const widthPercent = 150;

interface TagSliderProps {}

const TagSlider: FC<TagSliderProps> = () => {
  /*
  offset - то, насколько сейчас сдвинут слайдер
  */
  const [offset, setOffset] = useState(0);

  /*
  переходим по ссылке только если пользователь не пытался двигать слайдер
  */
  const [urlClicked, setUrlClicked] = useState("");

  const sliderRef: React.RefObject<HTMLDivElement> = useRef(null);

  const changeOffset = (newOffset: number) => {
    if (newOffset < 0) {
      setOffset(0);
      return;
    }

    if (
      sliderRef.current &&
      newOffset >
        (sliderRef.current.clientWidth * widthPercent) / 100 -
          sliderRef.current.clientWidth
    ) {
      setOffset(
        (sliderRef.current.clientWidth * widthPercent) / 100 -
          sliderRef.current.clientWidth
      );
      return;
    }

    setOffset(newOffset);
  };

  // Мышка

  const [isMouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }

    setMouseDown(true);

    if (!e.target.parentNode) return;
    if (
      e.target.dataset.url &&
      e.target.parentNode.parentNode == sliderRef.current
    ) {
      setUrlClicked(e.target.dataset.url);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) changeOffset(offset - e.movementX);
    setUrlClicked("");
  };

  const handleMouseUp = () => {
    setMouseDown(false);

    if (urlClicked) location.href = urlClicked;
  };

  const handleMouseLeave = () => {
    setMouseDown(false);
  };

  // Мышка End

  const handleResize = () => {
    if (!sliderRef.current) return;
    /*
    Если слайдер был откручен максимально вправо и пользователь начал уменьшать экран
    (повернул телефон), то offset будет слишком большим и видимая часть
    слишком далеко вправо будет уходить
    */
    if (
      offset + sliderRef.current.clientWidth >
      (sliderRef.current.clientWidth * widthPercent) / 100 -
        sliderRef.current.clientWidth
    ) {
      setOffset(
        (sliderRef.current.clientWidth * widthPercent) / 100 -
          sliderRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    /*
    Чтобы перестать крутить, как только мышка ушла за пределы видимой части
    */
    addEventListener("onmouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    return () => {
      /*
      Срабатывает, когда список тегов исчезает с экрана
      Нам не нужно следить за событиями, если списка тегов уже нет на странице
      */
      removeEventListener("onmouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Стрелки

  const handleClickLeft = () => {
    if (!sliderRef.current) return;
    /*
    Если можем прокрутить влево на один экран, то так и делаем
    Если не можем, то просто возвращаем слайдер в начало

    Смысла использовать здесь changeOffset нет, потому что мы и так следим за шириной
    */
    if (offset - sliderRef.current.clientWidth > 0) {
      setOffset(offset - sliderRef.current.clientWidth);
    } else {
      setOffset(0);
    }
  };

  const handleClickRight = () => {
    if (!sliderRef.current) return;
    /*
    Если можем прокрутить вправо на один экран, то так и делаем
    Если не можем, то просто возвращаем слайдер в конец

    Смысла использовать здесь changeOffset нет, потому что мы и так следим за шириной
    */
    if (
      offset + sliderRef.current.clientWidth <
      (sliderRef.current.clientWidth * widthPercent) / 100 -
        sliderRef.current.clientWidth
    ) {
      setOffset(offset + sliderRef.current.clientWidth);
    } else {
      setOffset(
        (sliderRef.current.clientWidth * widthPercent) / 100 -
          sliderRef.current.clientWidth
      );
    }
  };

  // Стрелки End

  return (
    <div className={styles.container}>
      <div
        className={styles.slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={styles.inner}
          style={{
            marginLeft: -offset + "px",
            width: widthPercent + "%",
            transition: isMouseDown ? "none" : "margin-left 0.3s",
          }}
        >
          {tags.map((tag) => (
            <div className={styles.tag} key={tag.title} data-url={tag.url}>
              {tag.title}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.arrowLeft} onClick={handleClickLeft} />
      <div className={styles.arrowRight} onClick={handleClickRight} />
    </div>
  );
};

export default TagSlider;
