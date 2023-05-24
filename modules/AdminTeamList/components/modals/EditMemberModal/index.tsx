import React, { FC, useContext, useState, useMemo } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";
import { IEditMemberData } from "../../../types";
import { TeamsContext } from "../../../context/teams";
import { SuggestedSearchSelect } from "../../../../shared/components/Multiselect";
import { mockUpMembers } from "../mockUpMembers";
import { Theme } from "../../../../shared/components/Multiselect/Components/enums";

interface EditMemberModalProps {
  data: IEditMemberData;
  onClose: () => any;
}

const EditMemberModal: FC<EditMemberModalProps> = ({ data, onClose }) => {
  const [name, setName] = useState(data.member.name);
  const [role, setRole] = useState(data.member.role);
  const [isTeamLead, setIsTeamLead] = useState(data.member.isTeamLead);

  const { teams, setTeams } = useContext(TeamsContext);
  
  // Suggested search using mockUp data
  const [nameInput, setNameInput] = useState(data.member.name)
  const potentialMembers = useMemo(() => {
    return new Map(
      mockUpMembers
      .filter((mockname) => mockname.toLowerCase().includes(nameInput.toLowerCase()))
      .map((mockname) => [mockname, mockname === name])
    );
  }, [name, nameInput]);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    if (data.teamId) {
      // fetch
      setTeams(
        teams.map((team) =>
          team.id == data.teamId
            ? {
                ...team,
                members: team.members.map((member, index) => {
                  if (isTeamLead) member.isTeamLead = false;
                  return index == data.memberIndex
                    ? { name: name, role: role, isTeamLead: isTeamLead }
                    : member;
                }),
              }
            : team
        )
      );
      onClose();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.close}>
          <Image
            src={closeIcon}
            alt="Закрыть редактирование"
            onClick={handleClose}
          />
        </div>
        <h2 className={styles.title}>Редактирование участника</h2>
        <div className={styles.field}>
          <label htmlFor="editmember-name" className={styles.label}>
            ФИО:
          </label>
          <SuggestedSearchSelect
          id={"editmember-name"}
          startingValue={name}
          options={potentialMembers}
          toggleOption={setName}
          setOuterInput={setNameInput}
          lable={name}
          height={5}
          theme={Theme.Form}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="editmember-role" className={styles.label}>
            Роль:
          </label>
          <input
            id="editmember-role"
            type="text"
            value={role}
            className={styles.input}
            onChange={(e: React.ChangeEvent) => {
              if (e.currentTarget instanceof HTMLInputElement)
                setRole(e.currentTarget.value);
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="editmember-teamlead" className={styles.label}>
            Тимлид:
          </label>
          <input
            id="editmember-teamlead"
            type="checkbox"
            value={role}
            className={styles.checkbox}
            onChange={(e: React.ChangeEvent) => {
              if (e.currentTarget instanceof HTMLInputElement)
                setIsTeamLead(e.currentTarget.checked);
            }}
          />
        </div>
        <div onClick={handleConfirm} className={styles.confirm}>
          Подтвердить
        </div>
      </div>
    </div>
  );
};

export default EditMemberModal;
