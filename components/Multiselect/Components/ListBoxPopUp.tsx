import { useState, useMemo, useImperativeHandle, useRef, useCallback } from "react";
import Option from "./Option";
import Announce from "./Announce";
import styles from './ListBoxPopUp.module.scss';
import React from "react";

export enum FocusAt {
    Menu, Option, None
}

/* 
    Pop Up, который используется в мультиселектах. Управление выделением 
    и выбором в основном выполняется из вне, используя ref
*/

function ListBoxPopUp (
    props : ListBoxPopUpProps, ref : React.ForwardedRef<ListBoxPopUpRef>) {

    const {parentId, options, toggleOption, height} = props;

    const indexOptions = useMemo(() => {
        const ans : string[] = [];
        
        props.options.forEach((value, key) => ans.push(key));
        
        return ans;
        
    }, [props.options])

    // highlighted = 0 ... n-1 => One of options is highlighted
    // highlighted = -1 (or highlighted < 0 or highlighted > n) => whole listbox if highlighted
    // highlighted = null => nothing is highlighted
    const [highlighted, setHighLighted] = useState<number | null>(null);

    const convertHighlightedToId = useCallback(() => {
        if (highlighted === null) return null;
        else if (highlighted >= 0 && highlighted < indexOptions.length)
            return `${parentId}-${highlighted}`;
        else return `${parentId}-menu`;
    }, [highlighted, parentId, indexOptions])

    const listBoxRef = useRef<HTMLDivElement>(null);
    // Handler to move selection from outside
    useImperativeHandle(ref, () => {
        return {
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
                return convertHighlightedToId();
            }
        }
    }, [highlighted, convertHighlightedToId, indexOptions, toggleOption])

    return (props.expanded === undefined || props.expanded) ? <div ref={listBoxRef}
    className={styles.ComboMenu + ' ' + (convertHighlightedToId() === `${parentId}-menu` ? styles.highlighted : '')}

    style={{'--options' : Math.min(height, indexOptions.length)} as React.CSSProperties}
    id={`${parentId}-menu`}
    tabIndex={-1}
    // Aria
    role='listbox'
    aria-multiselectable={true}
    >
    {/* Aria Announcer */}
    {props.announce ? <Announce n={indexOptions.length}/> : null}

    {/* All options*/}
    {
        indexOptions.map(
            (key, index) => <Option 
            id={`${parentId}-${index}`}
            key={key}
            option={[key, options.get(key) as boolean]}
            toggleOption={() => toggleOption(key)}
            highlighted={convertHighlightedToId() === `${parentId}-${index}`}
            />
        )
    }
    </div> : <div ref={listBoxRef}></div>
}

export default React.forwardRef<ListBoxPopUpRef, ListBoxPopUpProps>(ListBoxPopUp);