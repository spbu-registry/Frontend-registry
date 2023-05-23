import { ITeam } from "../types";

export const allTeams: ITeam[] = [
  {
    id: 1,
    members: [
      {
        name: "Дементьев Николай Иванович",
        role: "Фронтенд-разработчик",
        isTeamLead: false,
      },
      {
        name: "Лапин Марк Владимирович",
        role: "Бекенд-разработчик",
        isTeamLead: true,
      },
      {
        name: "Леонов Роман Иванович",
        role: "Аналитик",
        isTeamLead: false,
      },
    ],
    presentation: "фыва",
  },
  {
    id: 2,
    members: [
      {
        name: "Краснов Алексей Добрынич",
        role: "Разработчик",
        isTeamLead: true,
      },
      {
        name: "Котова София Робертовна",
        role: "Разработчик",
        isTeamLead: false,
      },
      {
        name: "Афанасьева Полина Ивановна",
        role: "Разработчик",
        isTeamLead: false,
      },
    ],
    presentation: "",
  },
  {
    id: 3,
    members: [
      {
        name: "Шаповалова Анна Игоревна",
        role: "Разработчик",
        isTeamLead: false,
      },
      {
        name: "Федоров Михаил Филиппович",
        role: "Разработчик",
        isTeamLead: false,
      },
      {
        name: "Соколова Алина Мироновна",
        role: "Разработчик",
        isTeamLead: true,
      },
    ],
    presentation: "",
  },
];
