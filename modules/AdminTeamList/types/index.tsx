export interface IModalData {
  addMember: IAddMemberData;
  editMember: IEditMemberData;
  deleteTeam: IDeleteTeamData;
  deleteMember: IDeleteMemberData;
}

export interface IAddMemberData {
  active: boolean;
  teamId: number;
  member: IMember;
}

export interface IEditMemberData {
  active: boolean;
  teamId: number;
  memberIndex: number; // номер в списке, с бекендом никак не связан, нужен только чтобы внешний компонент понимал, какого участника обновлять
  member: IMember;
}

export interface IDeleteTeamData {
  active: boolean;
  teamId: number;
}

export interface IDeleteMemberData {
  active: boolean;
  teamId: number;
  memberIndex: number; // номер в списке, с бекендом никак не связан, нужен только чтобы внешний компонент понимал, какого участника удалять
}

export interface IMember {
  name: string;
  role: string;
  isTeamLead: boolean;
}

export interface ITeam {
  id: number;
  members: IMember[];
  presentation: string; // url на файл с презентацией
}
