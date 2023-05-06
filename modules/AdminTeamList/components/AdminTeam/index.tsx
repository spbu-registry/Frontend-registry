import React, { FC } from "react";
import editIcon from "../../../../public/admin-edit-icon.svg";
import addIcon from "../../../../public/admin-add-icon.svg";
import deleteIcon from "../../../../public/admin-delete-icon.svg";
import deleteTeamIcon from "../../../../public/admin-trash-icon.svg";
import Image from "next/image";

import styles from "./AdminTeam.module.sass";
import { ITeam } from "../../types";

interface AdminTeamProps {
  team: ITeam;
}

const AdminTeam: FC<AdminTeamProps> = ({ team }) => {
  return (
    <div className={styles.container}>
      <div className={styles.editableText}>
        <h2 className={styles.title}>Команда №{team.id}</h2>
        <div>
          <Image
            src={editIcon}
            alt="Редактировать название команды"
            className={styles.editableTextTrigger}
          />
        </div>
      </div>
      <div className={styles.editableText + " " + styles.members}>
        <h2 className={styles.membersTitle}>Состав</h2>
        <div className={styles.editableTextTrigger}>
          <Image
            src={addIcon}
            alt="Добавить участника команды"
            data-open-addmember
          />
        </div>
      </div>
      <ul className={styles.membersList}>
        {team.members.map((member) => (
          <li className={styles.member} key={member.name}>
            <p className={styles.memberName}>{member.name}:</p>
            <p className={styles.memberRole}>{member.role}</p>
            <div className={styles.memberButton}>
              <Image
                src={editIcon}
                alt="Редактировать участника"
                data-open-editmember
              />
            </div>
            <div
              className={styles.memberButton + " " + styles.memberButtonSmaller}
            >
              <Image
                src={deleteIcon}
                alt="Удалить участника"
                data-member-delete
              />
            </div>
          </li>
        ))}
      </ul>
      {team.presentation && (
        <div className={styles.presentation}>
          <p>
            <a href={team.presentation}>Презентация команды</a>
          </p>
          <div className={styles.presentationDelete}>
            <Image src={deleteIcon} alt="Удалить презентацию команды" />
          </div>
        </div>
      )}
      <div className={styles.deleteTeam}>
        <Image
          src={deleteTeamIcon}
          data-open-deleteteam
          alt="Удалить команду"
        />
      </div>
    </div>
  );
};

export default AdminTeam;
