import { IModalData } from "../types";

export const initialModalData: IModalData = {
  addMember: {
    active: false,
    teamId: -1,
    member: {
      isTeamLead : false,
      name: "",
      role: "",
    },
  },
  editMember: {
    active: false,
    teamId: -1,
    memberIndex: -1,
    member: {
      isTeamLead : false,
      name: "",
      role: "",
    },
  },
  deleteTeam: {
    active: false,
    teamId: -1,
  },
  deleteMember: {
    active: false,
    teamId: -1,
    memberIndex: -1,
  },
};

/*
Нужно для определения, какую модалку открывать
modalType: 'data-attribute'
*/
export const modalOpenAttributes = {
  addMember: "data-open-addmember",
  editMember: "data-open-editmember",
  deleteTeam: "data-open-deleteteam",
  deleteMember: "data-open-deletemember",
};
