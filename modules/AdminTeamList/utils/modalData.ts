import { initialModalData } from "../static/modalData";
import { ITeam } from "../types";
import { findMemberIndex } from "./eventData";

export const prepareOpenModalData = (
  e: MouseEvent,
  team: ITeam,
  modalType: string | undefined
) => {
  if (modalType == "addMember") {
    const newModalData = { ...initialModalData };
    newModalData.addMember = {
      active: true,
      teamId: team.id,
      member: {
        name: "",
        role: "",
      },
    };
    return newModalData;
  }

  if (modalType == "editMember") {
    const memberIndex = findMemberIndex(e);

    if (memberIndex !== undefined) {
      const newModalData = { ...initialModalData };
      newModalData.editMember = {
        active: true,
        teamId: team.id,
        memberIndex: memberIndex,
        member: team.members[memberIndex],
      };
      return newModalData;
    }
  }

  if (modalType == "deleteTeam") {
    const newModalData = { ...initialModalData };
    newModalData.deleteTeam = {
      active: true,
      teamId: team.id,
    };
    return newModalData;
  }
};
