import React, { FC, useEffect, useState } from "react";
import styles from "./ProjectList.module.sass";
import ProjectCard from "./ProjectCard";
import { useDebounce } from "../TagFilter/useDebounce";
import SearchBar from "./SearchBar";
import { Project } from "../../pages/api/data/projects";

interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const keys: string[] = ["header", "clinic", "task", "status", "date"];

  const [results, setResults] = useState<Project[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  const getData = async (search: string) => {
    const response = await fetch(`http://localhost:3000/api/projects`);
    const data = await response.json();
    if (search == "") {
      setResults(data.splice(0, 5));
    } else {
      setResults(
        data
          .filter((project: Project) =>
            Object.keys(project).some((key: string) => {
              if (typeof project[key as keyof Project] === "string") {
                return project[key as keyof Project]
                  .toLowerCase()
                  .includes(search.toLowerCase());
              } else return false;
            })
          )
          .splice(0, 5)
      );
    }
  };

  useEffect(() => {
    getData(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div>
      <SearchBar
        searchInputClassName={styles.searchInput}
        iconClassName={styles.icon}
        handleSearchChange={(event: any) => setSearchTerm(event.target.value)}
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

      <div>сортировка тегов</div>
    </div>
  );
};

export default ProjectList;
