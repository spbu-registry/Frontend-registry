export interface IModalData {
  addMember: {
    active: boolean;
    teamId: number;
    member: IMember;
  };
  editMember: {
    active: boolean;
    teamId: number;
    memberIndex: number; // номер в списке, с бекендом никак не связан, нужен только чтобы внешний компонент понимал, какого участника обновлять
    member: IMember;
  };
  deleteTeam: {
    active: boolean;
    teamId: number;
  };
}

export interface IMember {
  name: string;
  role: string;
}

export interface ITeam {
  id: number;
  members: IMember[];
  presentation: string; // url на файл с презентацией
}
