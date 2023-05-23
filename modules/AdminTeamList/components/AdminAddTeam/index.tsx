import React, { FC, useContext } from "react";
import styles from "./AdminAddTeam.module.sass";
import { TeamsContext } from "../../context/teams";

interface AdminAddTeamProps {}

const AdminAddTeam: FC<AdminAddTeamProps> = () => {
  const { teams, setTeams } = useContext(TeamsContext);

  const handleAddTeam = () => {
    const maxId = teams.reduce(
      (tempMax, team) => (team.id > tempMax ? team.id : tempMax),
      0
    );
    setTeams([
      {
        id: maxId + 1,
        members: [],
        presentation: "",
      },
      ...teams,
    ]);
  };

  return (
    <div className={styles.button} onClick={handleAddTeam}>
      Создать новую команду
    </div>
  );
};

export default AdminAddTeam;
