import React, { FC, useEffect, useState } from "react";
import styles from "./ProjectList.module.sass";
import ProjectCard from "./components/ProjectCard";
import { Filters } from "./components/Filters";
import useFilters from "./useFilters";
import { IAPIProject } from "../../types";

interface ProjectListProps {
  projects: IAPIProject[];
  type: "public" | "admin";
}

const ProjectList: FC<ProjectListProps> = ({ projects, type }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const keys: string[] = ["header", "clinic", "task", "status", "date"];

  const [filtersState, filtersDispatch] = useFilters();
  const [results, setResults] = useState<IAPIProject[]>(projects);

  // Handle projects fetch
  // NOT DONE
  useEffect(() => {
    const keys = ["name", "description"];

    const getData = async (filtersState: FiltersState) => {
      /*
      Фильтрацию мы собираемся делать на бекенде, поэтому позже этот запрос
      надо будет поменять и загнать туда GET-параметрами все фильтры.
      Потом сразу setResults(data)
      */
      const response = await fetch(`http://localhost:3000/api/projects`);
      const data = await response.json();
      if (filtersState.search == "") {
        setResults(data.splice(0, 5));
      } else {
        setResults(
          data
            .filter((project: IAPIProject) =>
              keys.some((key: string) => {
                if (typeof project[key as keyof IAPIProject] === "string") {
                  return project[key as keyof IAPIProject]!.toString()
                    .toLowerCase()
                    .includes(filtersState.search.toLowerCase());
                } else return false;
              })
            )
            .splice(0, 5)
        );
      }
    };

    getData(filtersState);
  }, [filtersState]);

  return (
    <>
      <Filters
        state={filtersState}
        dispatch={filtersDispatch}
        n={results.length}
      />

      <div className={styles.container}>
        {results.map((project) => (
          <ProjectCard
            key={project.projectId}
            project={project}
            className={styles.project}
            type={type}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
