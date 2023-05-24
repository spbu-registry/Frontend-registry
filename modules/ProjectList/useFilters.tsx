import { useReducer, useEffect } from "react";

export enum Actions {
  SetFilteredTags,

  SetClinic,
  SetStatus,
  SetSort,

  ToggleClinic,
  ToggleStatus,
  ToggleSort,
  ToggleTag,

  ChooseClinic,
  ChooseStatus,
  ChooseSort,

  SetSearch,
  SetTagSearch,
  SetFrom,
  SetTo,
}

function reducer(state: FiltersState, action: FiltersAction): FiltersState {
  function toggleMap(mapName: keyof FiltersState, key: string) {
    const newMap = new Map(state[mapName] as Map<string, boolean>);

    newMap.set(key, !newMap.get(key));
    return newMap;
  }

  function chooseMap(mapName: keyof FiltersState, data: string[]) {
    const newMap = new Map(state[mapName] as Map<string, boolean>);

    newMap.forEach((value, key) => newMap.set(key, false));

    for (const key of data) newMap.set(key, true);

    return newMap;
  }

  function setMap(arr: string[]) {
    const newMap = new Map<string, boolean>();

    for (const key of arr) newMap.set(key, false);

    return newMap;
  }

  // Toggles

  switch (action.type) {
    case Actions.ToggleClinic:
      return {
        ...state,
        clinic: toggleMap("clinic", action.payload as string),
      };
    case Actions.ToggleSort:
      return { ...state, sort: toggleMap("sort", action.payload as string) };
    case Actions.ToggleStatus:
      return {
        ...state,
        status: toggleMap("status", action.payload as string),
      };
    case Actions.ToggleTag:
      if (!state.filteredTags.has(action.payload as string)) return state;

      const key = action.payload as string;

      return state.filteredTags.get(key)
        ? {
            ...state,
            filteredTags: toggleMap("filteredTags", action.payload as string),
            activeTags: state.activeTags.filter((tag) => tag !== key),
          }
        : {
            ...state,
            filteredTags: toggleMap("filteredTags", action.payload as string),
            activeTags: [...state.activeTags, key],
          };
  }

  // Chooses

  switch (action.type) {
    case Actions.ChooseClinic:
      if (!action.data) return state;
      return { ...state, clinic: chooseMap("clinic", action.data) };
    case Actions.ChooseSort:
      if (!action.data) return state;
      return { ...state, sort: chooseMap("sort", action.data) };
    case Actions.ChooseStatus:
      if (!action.data) return state;
      return { ...state, status: chooseMap("status", action.data) };
  }

  // Setters

  switch (action.type) {
    case Actions.SetFrom:
      if (!action.payload) return state;
      return { ...state, from: action.payload };
    case Actions.SetTo:
      if (!action.payload) return state;
      return { ...state, to: action.payload };
    case Actions.SetSearch:
      if (!action.payload && action.payload !== '') return state;
      return { ...state, search: action.payload };
    case Actions.SetTagSearch:
      if (!action.payload) return state;
      return { ...state, tagSearch: action.payload };
    case Actions.SetClinic:
      if (!action.data) return state;
      return { ...state, clinic: setMap(action.data) };
    case Actions.SetStatus:
      if (!action.data) return state;
      return { ...state, status: setMap(action.data) };
    case Actions.SetSort:
      if (!action.data) return state;
      return { ...state, sort: setMap(action.data) };
    case Actions.SetFilteredTags:
      if (!action.data) return state;

      const newMap = setMap(action.data);

      for (const key of state.activeTags) {
        if (newMap.has(key)) newMap.set(key, true);
      }

      return { ...state, filteredTags: newMap };
  }

  return state;
}

export default function useFilters(): [
  FiltersState,
  React.Dispatch<FiltersAction>
] {
  const [state, dispatch] = useReducer(reducer, {
    search: "",
    tagSearch: "",

    clinic: new Map(),
    status: new Map(),
    sort: new Map(),

    filteredTags: new Map(),
    activeTags: new Array(),

    from: "",
    to: "",
  } as FiltersState);

  // Handle static fetch
  useEffect(() => {
    fetch(`http://217.197.0.155//api/staticFilters`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed. Status : " + res.status);

        return res.json();
      })
      .then((json) => {
        dispatch({
          type: Actions.SetClinic,
          data: json.clinic as string[],
        });
        dispatch({
          type: Actions.SetStatus,
          data: json.status as string[],
        });
        dispatch({
          type: Actions.SetSort,
          data: json.sort as string[],
        });
      })
      .catch((error) => console.log("Static Filters fetch failed: \n" + error));
  }, []);

  // Handle tag fetch
  useEffect(() => {
    fetch(`http://217.197.0.155/api/filterTags?q=${state.tagSearch}`)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed. Status : " + res.status);

        return res.json();
      })
      .then((json) => {
        dispatch({
          type: Actions.SetFilteredTags,
          data: json as string[],
        });
      })
      .catch((error) => console.log("Tag Filter fetch failed: \n" + error));
  }, [state.tagSearch]);

  return [state, dispatch];
}
