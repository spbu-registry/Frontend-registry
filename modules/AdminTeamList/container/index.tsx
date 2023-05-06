import React, { FC, useEffect, useRef, useState } from "react";
import AdminSearch from "../components/AdminSearch";
import AdminTeam from "../components/AdminTeam";
import { Spacer } from "../../shared";
import { IModalData, ITeam } from "../types";
import { initialModalData } from "../static/modalData";
import EditMemberModal from "../components/modals/EditMemberModal";
import DeleteTeamModal from "../components/modals/DeleteTeamModal";
import {
  findMemberIndex,
  findTeamIndex,
  getModalType,
  shouldCloseModal,
  shouldOpenModal,
} from "../utils/eventData";
import { allTeams } from "../static/teams";
import { prepareOpenModalData } from "../utils/modalData";
import {
  confirmMemberAdd,
  confirmMemberChange,
  confirmMemberDelete,
} from "../utils/teams";

interface AdminTeamListProps {}

const AdminTeamList: FC<AdminTeamListProps> = () => {
  const handleSearchChange = (value: string) => {
    setTeams(
      allTeams.filter((team) => {
        return (
          team.id.toString().includes(value) ||
          team.members.find(
            (member) =>
              member.name.includes(value) || member.role.includes(value)
          ) !== undefined
        );
      })
    );
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const teamListRef = useRef<HTMLDivElement>(null);

  const [teams, setTeams] = useState<ITeam[]>(allTeams);

  const [modalData, setModalData] = useState<IModalData>(initialModalData);

  const getClosedModalData = (modalData: IModalData) => {
    const newModalData = { ...modalData };
    Object.keys(newModalData).forEach(
      (key: string) => (newModalData[key as keyof IModalData].active = false)
    );
    return newModalData;
  };

  const handleMemberChange = (name: string, role: string) => {
    if (modalData.editMember.teamId) {
      // fetch
      setTeams(
        confirmMemberChange({ name: name, role: role }, teams, modalData)
      );
      setModalData(getClosedModalData(modalData));
    }
  };

  const handleMemberAdd = (name: string, role: string) => {
    if (modalData.addMember.teamId) {
      // fetch
      setTeams(confirmMemberAdd({ name: name, role: role }, teams, modalData));
    }
    setModalData(getClosedModalData(modalData));
  };

  const handleMemberDelete = (e: MouseEvent) => {
    if (
      teamListRef.current &&
      e.target instanceof HTMLElement &&
      e.target.hasAttribute("data-member-delete")
    ) {
      const teamIndex = findTeamIndex(e, teamListRef.current);
      const memberIndex = findMemberIndex(e);

      if (memberIndex !== undefined) {
        setTeams(confirmMemberDelete(teamIndex, memberIndex, teams, modalData));
      }
    }
  };

  const handleTeamDelete = () => {
    if (modalData.deleteTeam.teamId) {
      // fetch
      setTeams(teams.filter((team) => team.id != modalData.deleteTeam.teamId));

      setModalData(getClosedModalData(modalData));
    }
  };

  const handleOpenModal = (e: MouseEvent) => {
    if (teamListRef.current && shouldOpenModal(e)) {
      const modalType = getModalType(e);
      const teamIndex = findTeamIndex(e, teamListRef.current);

      const newModalData = prepareOpenModalData(e, teams[teamIndex], modalType);
      if (newModalData) setModalData(newModalData);
    }
  };

  const handleCloseModal = (e: MouseEvent) => {
    if (shouldCloseModal(e)) {
      setModalData(getClosedModalData(modalData));
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("click", handleCloseModal);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("click", handleCloseModal);
      }
    };
  }, [containerRef, modalData]);

  useEffect(() => {
    if (teamListRef.current) {
      teamListRef.current.addEventListener("click", handleOpenModal);
      teamListRef.current.addEventListener("click", handleMemberDelete);
    }

    return () => {
      if (teamListRef.current) {
        teamListRef.current.removeEventListener("click", handleOpenModal);
        teamListRef.current.removeEventListener("click", handleMemberDelete);
      }
    };
  }, [teamListRef, modalData]);

  return (
    <div ref={containerRef}>
      <AdminSearch onChange={handleSearchChange} />
      <Spacer axis="vertical" size={30} />
      <div ref={teamListRef}>
        {teams.map((team) => (
          <AdminTeam team={team} key={team.id} />
        ))}
      </div>
      {modalData.addMember.active && (
        <EditMemberModal
          title="Добавление нового участника"
          initialName=""
          initialRole=""
          onConfirm={handleMemberAdd}
        />
      )}
      {modalData.editMember.active && (
        <EditMemberModal
          title="Редактирование участника"
          initialName={modalData.editMember.member.name}
          initialRole={modalData.editMember.member.role}
          onConfirm={handleMemberChange}
        />
      )}
      {modalData.deleteTeam.active && (
        <DeleteTeamModal onConfirm={handleTeamDelete} />
      )}
    </div>
  );
};

export default AdminTeamList;
