/*
Типы из API бекенда на момент 04.04.2023 прописаны на глаз,
по двум имеющимся проектам, которых возвращает /data/projects
*/
export interface IAPIProject {
  projectId?: number;
  name?: string;
  description?: string;
  requirements?: any[];
  client?: IAPIClient;
  students?: IAPIStudent[];
  clinics?: IAPIClinic[];
  tags?: IAPITag[];
  scientificSupervisor?: string;
  resultLink?: string;
  commits?: any[];
  links?: any[];
  requirementsForPerformers?: any[];
  workFormat?: IAPIWorkFormat;
  start?: string;
  end?: string;
  maxStudents?: number;
}

export interface IAPIClient {
  clientId?: number;
  name?: string;
  email?: string;
  link?: string;
  orgName?: string;
  phone?: string;
}

export interface IAPIStudent {
  studentId?: number;
  name?: string;
  sex?: string;
  degree?: string;
  email?: string;
  grade?: number;
  educationalProgram?: IAPIEducationalProgram;
}

export interface IAPIEducationalProgram {
  educationalProgramId?: number;
  code?: string;
  name?: string;
  faculty?: IAPIFaculty;
}

export interface IAPIFaculty {
  facultyId?: number;
  link?: string;
  name?: string;
}

export interface IAPIClinic {
  clinicId?: number;
  link?: string;
  name?: string;
  faculty?: IAPIFaculty;
}

export interface IAPITag {
  tagId?: number;
  name?: string;
}

export enum IAPIWorkFormat {
  FULL_TIME = "FULL_TIME",
  DISTANT = "DISTANT",
  HYBRID = "HYBRID",
}
