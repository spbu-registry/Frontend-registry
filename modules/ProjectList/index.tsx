import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./ProjectList.module.sass";
import ProjectCard from "./components/ProjectCard";
import { Filters } from "./components/Filters";
import useFilters from "./useFilters";
import { IAPIProject } from "../../types";
import AdminModal from "./components/DeleteProjectModal";
import AddProject from "./components/AddProject";
import { deleteProject, getProjects } from "../shared/lib/projects";

interface ProjectListProps {
  projects: IAPIProject[];
  type: "public" | "admin";
}

const ProjectList: FC<ProjectListProps> = ({ projects, type }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const keys: string[] = ["header", "clinic", "task", "status", "date"];

  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
      const data = await fetch("http://217.197.0.155/data/projects").then(
        (result) => result.json()
      );
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

  const handleDelete = (e: React.MouseEvent) => {
    if (
      type == "admin" &&
      e.target instanceof HTMLElement &&
      e.target.hasAttribute("data-delete-project") &&
      containerRef.current
    ) {
      const index = Array.from(containerRef.current.children).findIndex(
        (child) => {
          return child.contains(e.target as HTMLElement) || child == e.target;
        }
      );

      if (index != -1) setProjectToDelete(projects[index].projectId!);
    }
  };

  const serverDeleteProject = async (id: number) => {
    const res = await deleteProject(id);
    setResults(results.filter((result) => result.projectId != id));
    setProjectToDelete(null);
  };

  return (
    <>
      <Filters
        state={filtersState}
        dispatch={filtersDispatch}
        n={results.length}
      />
      {type == "admin" && <AddProject />}
      <div
        className={styles.container}
        onClick={handleDelete}
        ref={containerRef}
      >
        {results.map((project, index) => (
          <ProjectCard
            key={project.projectId}
            project={project}
            className={styles.project}
            type={type}
          />
        ))}
      </div>
      {projectToDelete !== null && (
        <AdminModal
          projectId={projectToDelete}
          onClose={() => setProjectToDelete(null)}
          onDelete={(id: number) => serverDeleteProject(id)}
        />
      )}
    </>
  );
};

export default ProjectList;
