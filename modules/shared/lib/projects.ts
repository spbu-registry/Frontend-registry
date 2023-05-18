import { IAPIProject } from "../../../types";

const URL = "http://217.197.0.155/data";

export const getProjects = async () => {
  const projects: IAPIProject[] = await fetch(URL + "/projects").then((data) =>
    data.json()
  );

  return projects;
};

export const getProject = async (id: number) => {
  const project: IAPIProject = await fetch(
    URL + "/projects/project?id=" + id
  ).then((data) => data.json());

  return project;
};
