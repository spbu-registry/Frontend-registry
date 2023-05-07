import React, { FC, useRef, useState } from "react";
import AdminSearch from "../components/AdminSearch";
import AdminTeam from "../components/AdminTeam";
import { Spacer } from "../../shared";
import { ITeam } from "../types";
import { allTeams } from "../static/teams";
import { TeamsContext } from "../context/teams";
import AdminModal from "../components/AdminModal";

/*
Общая идея происходящего:
Поиск обновляет список команд в своём компоненте.
Открытие всплывашек контролируется одним eventListener'ом 
в зависимости от data-open-* элемента, на который нажал пользователь.
Обновление данных контролирует каждая всплывашка в своём компоненте.
*/
interface AdminTeamListProps {}

const AdminTeamList: FC<AdminTeamListProps> = () => {
  const teamListRef = useRef<HTMLDivElement>(null);

  const [teams, setTeams] = useState<ITeam[]>(allTeams);

  return (
    <TeamsContext.Provider value={{ teams, setTeams }}>
      <div>
        <AdminSearch />
        <Spacer axis="vertical" size={30} />
        <div ref={teamListRef}>
          {teams.map((team) => (
            <AdminTeam team={team} key={team.id} />
          ))}
        </div>
        <AdminModal teamListRef={teamListRef} />
      </div>
    </TeamsContext.Provider>
  );
};

export default AdminTeamList;
