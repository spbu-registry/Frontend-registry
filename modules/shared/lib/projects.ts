import { IAPIProject, IAPIProjectToSave, IAPITag } from "../../../types";

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

export const getTags = async () => {
  const tags: IAPITag[] = await fetch(URL + "/tags").then((data) =>
    data.json()
  );

  return tags;
};

export const getSupervisors = async () => {
  const clientsFetch = fetch(URL + "/clients").then((data) => data.json());
  const curatorsFetch = fetch(URL + "/curators").then((data) => data.json());
  const supervisorsFetch = fetch(URL + "/supervisors").then((data) =>
    data.json()
  );

  const [clients, curators, supervisors] = await Promise.all([
    clientsFetch,
    curatorsFetch,
    supervisorsFetch,
  ]);

  return [
    clients.map((client: any) => client.client),
    curators.map((curator: any) => curator.curator),
    supervisors.map((supervisor: any) => supervisor.supervisor),
  ];
};

export const setProject = async (project: IAPIProjectToSave) => {
  const result = await fetch("/api/setProject", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ ...project }),
  });

  return result;
};

export const createProject = async () => {
  const result: IAPIProject = await fetch("/api/createProject", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({}),
  }).then((data) => data.json());

  return result.projectId;
};

export const deleteProject = async (id: number) => {
  const result = await fetch("/api/deleteProject", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });

  return result;
};
