interface ArrowProps {
    className : string
}


interface MultiselectProps {
    options : Map<string, boolean>,
    toggleOption : (key : string) => void
    id : string
    lable : string

    height : number
}

interface OptionProps {
  option : [string, boolean];
  toggleOption : () => void;

  highlighted : boolean;
  id : string;
}

interface SuggestedSearchProps extends MultiselectProps {
  setInput : ( value : string ) => void
}

interface AnnounceProps {
  n : number
}
