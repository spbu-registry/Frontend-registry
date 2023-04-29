interface FiltersState {
    search : string;
    tagSearch : string;

    clinic : Map<string, boolean>;
    status : Map<string, boolean>;
    sort : Map<string, boolean>;

    filteredTags : Map<string, boolean>;
    activeTags : string[];

    from : string;
    to : string;
}

interface FiltersAction {
    type : Actions,
    payload? : string
    data? : string[]
}

interface FiltersProps {
    state : FiltersState,
    dispatch : React.Dispatch<FiltersAction>,
    n : number
}

interface Project {
    header : string;
    clinic : string;
    task : string;
    status : string;
    date : string;
}