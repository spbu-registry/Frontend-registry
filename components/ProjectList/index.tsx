import React, { FC, useEffect, useState } from "react";
import styles from "./ProjectList.module.sass";
import ProjectCard from "./ProjectCard";
import { Filters } from "./Filters";
import useFilters from "./useFilters";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const keys: string[] = ["header", "clinic", "task", "status", "date"];

  const [filtersState, filtersDispatch] = useFilters();
  const [results, setResults] = useState<any[]>([]);

  // Handle projects fetch
  // NOT DONE
  useEffect(() => {
    const keys = ["header", "clinic", "task", "status", "date"];

    const getData = async (filtersState: FiltersState) => {
      const response = await fetch(`http://localhost:3000/api/projects`);
      const data = await response.json();
      if (filtersState.search == "") {
        setResults(data.splice(0, 5));
      } else {
        setResults(
          data
            .filter((project: Project) =>
              keys.some((key: string) => {
                if (typeof project[key as keyof Project] === "string") {
                  return project[key as keyof Project]
                    .toString()
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
            key={project.id}
            project={project}
            className={styles.project}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectList;
