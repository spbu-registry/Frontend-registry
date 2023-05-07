import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { IModalData } from "../../types";
import { initialModalData } from "../../static/modalData";
import EditMemberModal from "../modals/EditMemberModal";
import DeleteTeamModal from "../modals/DeleteTeamModal";
import { prepareOpenModalData } from "../../utils/modalData";
import { findTeamIndex, getModalType } from "../../utils/eventData";
import { TeamsContext } from "../../context/teams";
import AddMemberModal from "../modals/AddMemberModal";
import DeleteMemberModal from "../modals/DeleteMemberModal";

interface AdminModalProps {
  teamListRef: React.RefObject<HTMLDivElement>;
}

const AdminModal: FC<AdminModalProps> = ({ teamListRef }) => {
  const [modalData, setModalData] = useState<IModalData>(initialModalData);

  const { teams } = useContext(TeamsContext);

  /*
  Всё, что касается событий открытия всплывашек, контролирует этот
  единственный eventListener в контейнере, потому что команд может быть
  много и, если для каждой команды делать по несколько eventListener'ов,
  больно ударит по пользователю.
  */
  const handleOpenModal = (e: MouseEvent) => {
    const modalType = getModalType(e);
    if (teamListRef.current && modalType !== undefined) {
      const modalType = getModalType(e);
      const teamIndex = findTeamIndex(e, teamListRef.current);

      /*
      При большом желании можно вынести логику открытия всплывашек отдельно в файл
      всплывашки, которую нужно открыть, разными eventListener'ами.
      Тогда в TeamContext можно закинуть teamListRef и передавать setModalData в каждую всплывашку.
      Мне такой вариант не особо понравился, потому что он ещё больше ломает односторонность потока данных
      и потому что надо будет в каждом eventListener'е отдельно выяснять, куда нажал пользователь,
      но он может быть лучше в плане того, что вся логика конкретной всплывашки лежит в файле этой вслывашки
      */
      const newModalData = prepareOpenModalData(e, teams[teamIndex], modalType);
      if (newModalData) setModalData(newModalData);
    }
  };

  const handleCloseModal = () => {
    setModalData(initialModalData);
  };

  useEffect(() => {
    if (teamListRef.current) {
      teamListRef.current.addEventListener("click", handleOpenModal);
    }

    return () => {
      if (teamListRef.current) {
        teamListRef.current.removeEventListener("click", handleOpenModal);
      }
    };
  }, [teamListRef, modalData]);

  /*
  Я изначально думал побольше обобщить всплывашки (удаление участника почти не отличается от удаления команды),
  но тогда слишком много логики переносится в родителя и становится менее читаемо.
  */
  return (
    <div>
      {modalData.addMember.active && (
        <AddMemberModal data={modalData.addMember} onClose={handleCloseModal} />
      )}
      {modalData.editMember.active && (
        <EditMemberModal
          data={modalData.editMember}
          onClose={handleCloseModal}
        />
      )}
      {modalData.deleteTeam.active && (
        <DeleteTeamModal
          data={modalData.deleteTeam}
          onClose={handleCloseModal}
        />
      )}
      {modalData.deleteMember.active && (
        <DeleteMemberModal
          data={modalData.deleteMember}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default AdminModal;
