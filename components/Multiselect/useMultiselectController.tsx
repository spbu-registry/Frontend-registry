import { FocusAt } from "./Components/enums"
import { useState, useMemo } from "react"

export function useMultiselectController (
    options : Map<string, boolean>, toggleOption : (key : string) => void) : [MultiselectController, MultiselectViewer]
    {
        const indexOptions = useMemo(() => {
            const ans : string[] = [];

            options.forEach((value, key) => ans.push(key));
            
            return ans; 
        }, [options]);

        const [highlighted, setHighLighted] = useState<number | null>(null);

        const controller = useMemo(() => {
            return {
                loseFocus : () => setHighLighted(null),
                focusOnOption : (ind : number) => setHighLighted(ind),
                focusOnMenu : () => setHighLighted(-1),
                focusDown : (n : number) => setHighLighted((prev) => {
                    const safeHighLighted = prev ?? 0;
                    return safeHighLighted + n < indexOptions.length ?
                    safeHighLighted + n : indexOptions.length - 1 
                }),
                focusUp : (n : number) => setHighLighted((prev) => {
                    const safeHighLighted = prev ?? 0;
                    return safeHighLighted - n > -1 ?
                        safeHighLighted - n : 0

                }), 
                focusOnStart : () => setHighLighted(0),
                focusOnEnd : () => setHighLighted(indexOptions.length - 1),
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
            }
        }, [indexOptions])
        
        const viewer = useMemo(() => {
            return {
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
                toggle : () => {
                    toggleOption(indexOptions[highlighted as number]);
                },
            }
        }, [highlighted, indexOptions, toggleOption])

        return [
        {highlighted, ...controller, ...viewer}, 
        {indexOptions, options}
    ]
}