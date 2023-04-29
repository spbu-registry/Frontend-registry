export interface ITimeline {
  dateAdd: string;
  applicationDeadline: {
    from: string;
    to: string;
  };
  projectImplementationDates: {
    from: string;
    to: string;
  };
  projectProtection: {
    from: string;
    to: string;
  };
  projectStatus: string;
}

export interface IFormData {
  supervisors: ISupervisor[];
  // role: IRole[];
  teams: Map<string, string>;
  description: string;
  projectDescription: string;
  commandRequirements: string;
  projectRequirements: string;
  projectTimeline: ITimeline;
}

export interface ISupervisor {
  title: string;
  names: string[];
}
