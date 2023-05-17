import React from "react";
import { DateRangePickerValue } from "@tremor/react";

/*
Вообще можно при большом желании обойтись без контекста
и передавать teams и setTeams пропами, но мне показалось,
что с контекстом удобнее, потому что абсолютно каждый
компонент использует teams или setTeams
*/
export const DatesContext = React.createContext<{
  dates: DateRangePickerValue;
  setDates: (value: DateRangePickerValue) => any;
}>({
  dates: [new Date(), new Date()],
  setDates: (teams: DateRangePickerValue) => {},
});
