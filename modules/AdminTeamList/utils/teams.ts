import { IMember, IModalData, ITeam } from "../types";

export const confirmMemberChange = (
  changedMember: IMember,
  teams: ITeam[],
  modalData: IModalData
) => {
  return teams.map((team) =>
    team.id == modalData.editMember.teamId
      ? {
          ...team,
          members: team.members.map((member, index) =>
            index == modalData.editMember.memberIndex ? changedMember : member
          ),
        }
      : team
  );
};

export const confirmMemberAdd = (
  addedMember: IMember,
  teams: ITeam[],
  modalData: IModalData
) => {
  return teams.map((team) =>
    team.id == modalData.addMember.teamId
      ? {
          ...team,
          members: [...team.members, addedMember],
        }
      : team
  );
};

export const confirmMemberDelete = (
  teamIndex: number,
  memberIndex: number,
  teams: ITeam[],
  modalData: IModalData
) => {
  return teams.map((team, mappedTeamIndex) =>
    mappedTeamIndex == teamIndex
      ? {
          ...team,
          members: team.members.filter(
            (member, mappedMemberIndex) => mappedMemberIndex != memberIndex
          ),
        }
      : team
  );
};
