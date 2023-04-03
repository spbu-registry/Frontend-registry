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

    SetSearch,
    SetTagSearch,
    SetFrom,
    SetTo
}

function reducer (state : FiltersState, action : FiltersAction) {

    function toggleMap(mapName : keyof FiltersState, key : string) {
        if (!(state[mapName] as Map<string, boolean>)
            .has(key)) return state;

        const newMap = new Map(
            (state[mapName] as Map<string, boolean>)
        );

        newMap.set(key, !newMap.get(key))
        return newMap;
    }

    function setMap(arr : string[]) {

        const newMap = new Map<string, boolean>();

        for (const key of arr) newMap.set(key, false);

        return newMap;
    }

    if (action.type === Actions.SetFrom) {
        return Object.assign({}, state, {from : action.payload});
    }
    else if (action.type === Actions.SetTo) {
        return Object.assign({}, state, {to : action.payload});
    }
    else if (action.type === Actions.SetSearch) {
        return Object.assign({}, state, {search : action.payload});
    }
    else if (action.type === Actions.SetTagSearch) {
        return Object.assign({}, state, {tagSearch : action.payload});
    }
    else if (action.type === Actions.ToggleClinic) {
        return Object.assign({}, state, 
            {clinic : toggleMap('clinic', action.payload as string)}
        );
    }
    else if (action.type === Actions.ToggleStatus){
        return Object.assign({}, state, 
            {status : toggleMap('status', action.payload as string)}
        );
    }
    else if (action.type === Actions.ToggleSort) {
        return Object.assign({}, state, 
            {sort : toggleMap('sort', action.payload as string)}
        );
    }
    else if (action.type === Actions.ToggleTag) {

        if (!state.filteredTags.has(action.payload as string)) return state;

        const key = action.payload as string;

        if (state.filteredTags.get(key)) 
            return Object.assign({}, state, 
                {
                    filteredTags : toggleMap('filteredTags', action.payload as string),
                    activeTags : state.activeTags.filter((tag) => tag !== key)
                }
            );
        else 
            return Object.assign({}, state, 
                {
                    filteredTags : toggleMap('filteredTags', action.payload as string),
                    activeTags : [...state.activeTags, key]
                }
            );
    }
    else if (action.type === Actions.SetClinic) {

        if (action.data === undefined) return state;

        return Object.assign({}, state, 
            {clinic : setMap(action.data)}
        );
    }
    else if (action.type === Actions.SetStatus) {
        
        if (action.data === undefined) return state;

        return Object.assign({}, state, 
            {status : setMap(action.data)}
        );
    }
    else if (action.type === Actions.SetSort) {
        
        if (action.data === undefined) return state;

        return Object.assign({}, state, 
            {sort : setMap(action.data)}
        );
    }
    else if (action.type === Actions.SetFilteredTags) {

        if (action.data === undefined) return state;

        const newMap = setMap(action.data);

        for (const key of state.activeTags) {
                if (newMap.has(key))
                        newMap.set(key, true);
            }

        return Object.assign({}, state, 
            {filteredTags : newMap}
        );
    }
    return state
}

export default function useFilters () : [FiltersState, React.Dispatch<FiltersAction>] {

    const [state, dispatch] = useReducer(reducer, {
        search : '',
        tagSearch : '',

        clinic : new Map(),
        status : new Map(),
        sort : new Map(),

        filteredTags : new Map(),
        activeTags : new Array(),

        from : '',
        to : ''
    } as FiltersState);

    // Handle static fetch
    useEffect(() => {
        fetch(`http://localhost:3000/api/staticFilters`).then((res) => {

            if (!res.ok) throw new Error('Request failed. Status : ' + res.status)

            return res.json();
        }).then((json) => {
            dispatch({
                type : Actions.SetClinic,
                data : json.clinic as string[]
            });
            dispatch({
                type : Actions.SetStatus,
                data : json.status as string[]
            });
            dispatch({
                type : Actions.SetSort,
                data : json.sort as string[]
            });
        }).catch((error) => console.log('Static Filters fetch failed: \n' + error));
    }, []);

    // Handle tag fetch
    useEffect(() => {
        fetch(`http://localhost:3000/api/filterTags?q=${state.tagSearch}`).then((res) => {

            if (!res.ok) throw new Error('Request failed. Status : ' + res.status)

            return res.json();
        }).then((json) => {
            dispatch({
                type : Actions.SetFilteredTags,
                data : json as string[]
            });
        }).catch((error) => console.log('Tag Filter fetch failed: \n' + error));
    }, [state.tagSearch])

    return [state, dispatch];
}