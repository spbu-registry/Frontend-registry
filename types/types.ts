export interface ProjectCardInList {
  header: string;
  clinic: string;
  task: string;
  status: string;
  date: string;
}

/*
Типы из API бекенда на момент 04.04.2023 прописаны на глаз,
по двум имеющимся проектам, которых возвращает /data/projects
*/
export interface IAPIProject {
  projectId: number;
  name: string;
  description: string;
  requirements: any[];
  client: IAPIClient;
  clinics: IAPIClinic[];
  tags: IAPITag[];
  scientificSupervisor: string;
  resultLink?: string;
  commits: any[];
  links: any[];
  requirementsForPerformers: any[];
  workFormat: string;
  start?: string;
  end?: string;
  maxStudents: number;
}

export interface IAPIClient {
  clientId: number;
  name: string;
  email: string;
  link?: string;
  orgName: string;
  phone: string;
  students: IAPIStudent[];
  faculty: IAPIFaculty;
}

export interface IAPIStudent {
  studentId: number;
  name: string;
  sex: string;
  degree: string;
  email: string;
  grade: number;
  educationalProgram: IAPIEducationalProgram;
}

export interface IAPIEducationalProgram {
  educationalProgramId: number;
  code: string;
  name: string;
  faculty: IAPIFaculty;
}

export interface IAPIFaculty {
  facultyId: number;
  link: string;
  name: string;
}

export interface IAPIClinic {
  clinicId: number;
  link?: string;
  name: string;
  faculty: IAPIFaculty;
}

export interface IAPITag {
  tagId: number;
  name: string;
}
