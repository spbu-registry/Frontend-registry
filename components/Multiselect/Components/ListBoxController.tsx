import { FocusAt } from "./enums"
import { Dispatch, SetStateAction, RefObject } from "react"

interface ListBoxControllerProps {
    highlighted : number | null
    setHighLighted : Dispatch<SetStateAction<number | null>>
    convertHighlightedToId : (highlighted : number | null) => string | null

    indexOptions : string[]
    toggleOption : (key : string) => void
    listBoxRef : RefObject<HTMLDivElement>
}

export function initMultiselectController (
    {highlighted, convertHighlightedToId, setHighLighted,
    indexOptions, toggleOption, listBoxRef} : ListBoxControllerProps
    ) : ListBoxPopUpRef {
        return  {
            element : listBoxRef.current,
            focusAt : () => {
                if (highlighted === null) return FocusAt.None;
                else if (highlighted >= 0 && highlighted < indexOptions.length)
                    return FocusAt.Option;
                else return FocusAt.Menu;
            },
            focusAtNum : () => {
                if (highlighted === null) return null;
                else if (highlighted >= 0 && highlighted < indexOptions.length)
                    return highlighted;
                else return -1;
            },
            loseFocus : () => {
                setHighLighted(null);
            },
            focusOnOption : (ind : number) => {
                setHighLighted(ind);
            },
            focusOnMenu : () => {
                setHighLighted(-1)
            },
            focusDown : (n : number) => {
                const safeHighLighted = highlighted ?? 0;
                setHighLighted(
                    safeHighLighted + n < indexOptions.length ?
                        safeHighLighted + n : indexOptions.length - 1 
                )
            },
            focusUp : (n : number) => {
                const safeHighLighted = highlighted ?? 0;
                setHighLighted(
                    safeHighLighted - n > -1 ?
                        safeHighLighted - n : 0
                )
            }, 
            focusOnStart : () => {
                setHighLighted(0);
            },
            focusOnEnd : () => {
                setHighLighted(indexOptions.length - 1);
            },
            focusAutocomplete : (full : string, lastChar : string) => {
                const cicleThroughFrom = (searchFor : string, from : number | null) => {

                    if (from === null || from >= indexOptions.length - 1 || from < 0)
                        from = 0;
        
                    for (let n = 1; n < indexOptions.length + 1; n++) {
                        if ((indexOptions[(from + n) % indexOptions.length].toLowerCase())
                            .includes(searchFor.toLowerCase())) 
                                return (from + n) % indexOptions.length;
        
                    }
        
                    return null;
                }

                setHighLighted( (prev) => {
                    let result = cicleThroughFrom(full + lastChar, prev);
                    result = result ?? cicleThroughFrom(lastChar, prev);
                    return result ?? prev
                    }
                )
            },
            toggle : () => {
                toggleOption(indexOptions[highlighted as number]);
            },
            getId : () => {
                return convertHighlightedToId(highlighted);
            }
        }
    }