import React, { FC, useEffect, useRef } from "react";
import styles from "./MainPageProjectList.module.scss";
import { useWindowSize } from "../../shared";

interface MainPageProjectListProps {
}

const breakpoints = [
  {
    breakpoint: 2000,
    chunkSize: 4,
  },
  {
    breakpoint: 1200,
    chunkSize: 2,
  },
  {
    breakpoint: 600,
    chunkSize: 1,
  },
];

const MainPageProjectList: FC<MainPageProjectListProps> = () => {
  const ref = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  /*
  Считает высоту всех элементов и присваивает каждому наибольшую из посчитанных
  */
  const alignHeight = (elems: HTMLElement[]) => {
    const maxHeight = elems.reduce(
      (maxHeight, elem) =>
        elem && elem.clientHeight > maxHeight ? elem.clientHeight : maxHeight,
      0
    );
    elems.forEach((elem) => elem && (elem.style.height = maxHeight + "px"));
  };

  /*
  Разбивает набор элементов на группы по size элементов
  Здесь нужно чтобы объединить проекты с одной строки
  */
  const createChunks = (elems: HTMLCollection, size: number) => {
    const res = [];
    for (let i = 0; i < elems.length; i++) {
      if (i % size === 0) {
        res.push([elems[i]]);
      } else {
        res[res.length - 1].push(elems[i]);
      }
    }
    return res;
  };

  const resizeChunk = (chunk: HTMLElement[]) => {
    const titles = chunk.map((project) =>
      project.querySelector(".home-project-list__project-title")
    ) as HTMLElement[];
    titles.forEach((title) => title && (title.style.height = "auto"));
    alignHeight(titles);

    const infos = chunk.map((project) =>
      project.querySelector(".home-project-list__project-content")
    ) as HTMLElement[];
    infos.forEach((info) => info && (info.style.height = "auto"));
    alignHeight(infos);
  };

  /*
  Проходится по breakpoint'ам и ищет подходящий по размеру окна
  */
  const calcChunkSize = () => {
    const filtered = breakpoints.filter(
      (option) => option.breakpoint > windowSize
    );

    if (!filtered.length) return breakpoints[0].chunkSize;

    return filtered[filtered.length - 1].chunkSize;
  };

  useEffect(() => {
    if (ref.current) {
      const chunks = createChunks(ref.current.children, calcChunkSize());
      chunks.forEach((chunk) => resizeChunk(chunk as HTMLElement[]));
    }
  }, [windowSize]);

  useEffect(() => {
    // Из-за того, что стили подгружаются не мгновенно (если их нет в кэше),
    // изначально при загрузке страницы размеры могут посчитаться неправильно
    // Компонент не в начале страницы, поэтому нестрашно, если будет
    // моргание контента, пользователь этого не увидит
    setTimeout(() => {
      if (ref.current) {
        const chunks = createChunks(ref.current.children, calcChunkSize());
        chunks.forEach((chunk) => resizeChunk(chunk as HTMLElement[]));
      }
    }, 1000);
  }, []);

  return (
    <>
      <h2 className={styles['projects_title']}>Проекты</h2>
      <div ref={ref} className={styles['projects_container']}>
        <div className={styles['project']}>
          <h2
            className={
              styles['project_name'] +
              ' ' +
              styles['project_1_color'] +
              ' home-project-list__project-title'
            }
          >
            <p>Реестр проектов клинической практики СПбГУ</p>
          </h2>
          <div
            className={
              styles['project_info'] +
              ' ' +
              styles['project_1_color'] +
              ' home-project-list__project-content'
            }
          >
            <p>
              Многомодульная ИС для регистрации, отслеживания статуса и деталей
              проектов, проводимых студентами в рамках клинической практик СПбГУ
            </p>
          </div>
        </div>
        <div className={styles['project']}>
          <h2
            className={
              styles['project_name'] +
              ' ' +
              styles['project_2_color'] +
              ' home-project-list__project-title'
            }
          >
            <p>Чат-бот первой линии поддержки</p>
          </h2>
          <div
            className={
              styles['project_info'] +
              ' ' +
              styles['project_2_color'] +
              ' home-project-list__project-content'
            }
          >
            <p>
              С целью повышения доступности поддержки и сокращения затрат на
              работу сотрудников Службы технической поддержки УСИТ СПбГУ,
              ставится задача разработки и обучения интеллектуального агента для
              различных каналов связи.
            </p>
          </div>
        </div>
        <div className={styles['project']}>
          <h2
            className={
              styles['project_name'] +
              ' ' +
              styles['project_3_color'] +
              ' home-project-list__project-title'
            }
          >
            <p>Сервис по анализу городской топологии</p>
          </h2>
          <div
            className={
              styles['project_info'] +
              ' ' +
              styles['project_3_color'] +
              ' home-project-list__project-content'
            }
          >
            <p>
              Сервис должен позволять устанавливать среднее число связей в
              топологии города для каждой улицы города со всеми остальными как в
              городе в целом, так и по отдельным районам.
            </p>
          </div>
        </div>
        <div className={styles['project']}>
          <h2
            className={
              styles['project_name'] +
              ' ' +
              styles['project_4_color'] +
              ' home-project-list__project-title'
            }
          >
            <p>
              Детектирование и анализ зон покрытия сигналов
              спутников-ретрансляторов
            </p>
          </h2>
          <div
            className={
              styles['project_info'] +
              ' ' +
              styles['project_4_color'] +
              ' home-project-list__project-content'
            }
          >
            <p>
              Целью проекта является накопление данных для создания
              карты покрытия спутникового радиовещания. В ходе работы
              потребуется выполнить поиск, разбор и сохранение информации об
              областях охвата ориентированных в пространстве лучей
              спутников-ретрансляторов, находящихся на геостационарной орбите.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPageProjectList;
