interface ArrowProps {
    className : string
}


interface MultiselectProps {
    options : Map<string, boolean>,
    toggleOption : (key : string) => void
    toggleOption : (key : string) => void
    id : string
    lable : string

    height : number
}



interface SuggestedSearchProps extends MultiselectProps {
  setOuterInput : ( value : string ) => void
}

// Private Components

interface AnnounceProps {
  n : number
}

interface OptionProps {
  option : [string, boolean];
  toggleOption : () => void;

  highlighted : boolean;
  id : string;
}


interface ListBoxPopUpProps {
  options : Map<string, boolean>;
  toggleOption : (key : string) => void;

  parentId : string;

  height : number;

  announce? : boolean;
  expanded? : boolean
}

type ListBoxPopUpRef = {
  element: HTMLDivElement | null
  focusAt : () => FocusAt
  focusAtNum : () => number | null 
  loseFocus : () => void
  focusOnOption : (ind : number) => void
  focusOnMenu : () => void
  focusDown : (n : number) => void
  focusUp : (n : number) => void
  focusOnStart : () => void
  focusOnEnd : () => void
  focusAutocomplete : (full : string, lastChar : string) => void
  getId : () => string | null
  toggle : () => void
} | null;