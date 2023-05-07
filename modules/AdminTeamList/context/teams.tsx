import React from "react";
import { allTeams } from "../static/teams";
import { ITeam } from "../types";

/*
Вообще можно при большом желании обойтись без контекста
и передавать teams и setTeams пропами, но мне показалось,
что с контекстом удобнее, потому что абсолютно каждый
компонент использует teams или setTeams
*/
export const TeamsContext = React.createContext({
  teams: allTeams,
  setTeams: (teams: ITeam[]) => {},
});
