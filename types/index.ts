/*
Типы из API бекенда на момент 04.04.2023 прописаны на глаз,
по двум имеющимся проектам, которых возвращает /data/projects
*/
export interface IAPIProject {
  projectId?: number;
  name?: string;
  tags?: IAPITag[];
  clinics?: IAPIClinic[];
  clients?: IAPIClient[];
  curators?: IAPICurator[];
  supervisors?: IAPISupervisor[];
  description?: string;
  links?: IAPILink[];
  projectRoles?: IAPIRole[];
  requirements?: string;
  requirementsForPerformers?: string;
  startTime?: string;
  startFiling?: string;
  endFiling?: string;
  startImplementation?: string;
  endImplementation?: string;
  startDefense?: string;
  endDefense?: string;
  status?: IAPIStatus;
  workFormat?: IAPIWorkFormat;
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

export interface IAPICurator {
  curatorId?: number;
  name?: string;
  email?: string;
  link?: string;
  phone?: string;
}

export interface IAPISupervisor {
  supervisorId?: number;
  name?: string;
  email?: string;
  link?: string;
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

export interface IAPILink {
  linkId?: number | null;
  name?: string;
  link?: string;
  projectId?: number;
}

export interface IAPITag {
  tagId?: number | null;
  name?: string;
}

export interface IAPIRole {
  roleId?: number;
  role?: string;
  student?: IAPIStudent;
  projectId?: number;
}

export enum IAPIWorkFormat {
  FULL_TIME = "FULL_TIME",
  DISTANT = "DISTANT",
  HYBRID = "HYBRID",
}

export enum IAPIStatus {
  OPEN_ENROLLMENT = "OPEN_ENROLLMENT",
  CLOSED = "CLOSED",
  ACTIVE = "ACTIVE",
  DEFENSE = "DEFENSE",
  TEST = "TEST",
  COMPLETE = "COMPLETE",
}
