import React, { FC, useContext, useState, useMemo } from "react";
import styles from "../AdminModals.module.sass";
import Image from "next/image";
import closeIcon from "../../../../../public/admin-delete-icon.svg";
import { IAddMemberData } from "../../../types";
import { TeamsContext } from "../../../context/teams";
import { Theme } from "../../../../shared/components/Multiselect/Components/enums";
import { SuggestedSearchSelect } from "../../../../shared/components/Multiselect";
import { mockUpMembers } from "../mockUpMembers";

interface AddMemberModalProps {
  data: IAddMemberData;
  onClose: () => any;
}

const AddMemberModal: FC<AddMemberModalProps> = ({ data, onClose }) => {
  const [name, setName] = useState(data.member.name);
  const [role, setRole] = useState(data.member.role);

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

  const handleConfirm = () => {
    if (data.teamId) {
      // fetch
      setTeams(
        teams.map((team) =>
          team.id == data.teamId
            ? {
                ...team,
                members: [
                  ...team.members,
                  { name: name, role: role, isTeamLead: false },
                ],
              }
            : team
        )
      );
    }
    onClose();
  };

  const handleClose = () => {
    onClose();
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
        <h2 className={styles.title}>Добавление нового участника</h2>
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
          height={3}
          theme={Theme.Form}/>
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
        <div onClick={handleConfirm} className={styles.confirm}>
          Добавить
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
