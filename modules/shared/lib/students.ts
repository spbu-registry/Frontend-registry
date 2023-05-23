import { IAPIStudent } from "../../../types";
const URL = "http://217.197.0.155/data";

export const getStudents = async (): Promise<IAPIStudent[]> => {
  const users: any = await fetch(URL + "/students").then((data) => data.json());

  return users.map((user: any) => user.student);
};
