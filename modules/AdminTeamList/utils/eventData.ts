import { modalOpenAttributes } from "../static/modalData";

export const shouldCloseModal = (e: MouseEvent) => {
  return (
    e.target instanceof HTMLElement && e.target.hasAttribute("data-close-modal")
  );
};

export const shouldOpenModal = (e: MouseEvent) => {
  return (
    e.target instanceof HTMLElement &&
    Object.keys(modalOpenAttributes).find((key) =>
      (e.target as HTMLElement).hasAttribute(
        modalOpenAttributes[key as "addMember" | "editMember" | "deleteTeam"]
      )
    ) !== undefined
  );
};

export const getModalType = (e: MouseEvent) => {
  return Object.keys(modalOpenAttributes).find((key) => {
    return (e.target as HTMLElement).hasAttribute(
      modalOpenAttributes[key as "addMember" | "editMember" | "deleteTeam"]
    );
  });
};

export const findTeamIndex = (e: MouseEvent, teamList: HTMLDivElement) => {
  return Array.from(teamList.children).findIndex((item) =>
    item.contains(e.target as Node)
  );
};

export const findMemberIndex = (e: MouseEvent) => {
  function getParentNode(element: HTMLElement, level = 1) {
    // 1 - default value (if no 'level' parameter is passed to the function)
    while (level-- > 0) {
      element = element.parentElement!;
      if (!element) return null; // to avoid a possible "TypeError: Cannot read property 'parentNode' of null" if the requested level is higher than document
    }
    return element;
  }

  if (!(e.target instanceof HTMLElement)) return;
  const memberList = getParentNode(e.target, 3);
  return Array.from(memberList!.children).findIndex((member) =>
    member.contains(e.target as HTMLElement)
  );
};
