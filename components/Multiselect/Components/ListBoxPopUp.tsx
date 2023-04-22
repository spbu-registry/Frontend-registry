import { useState, useMemo, useImperativeHandle, useRef, useCallback } from "react";
import Option from "./Option";
import Announce from "./Announce";
import styles from './css/ListBoxPopUp.module.scss';
import React from "react";
import { initMultiselectController } from "./ListBoxController";
import { Theme } from "./enums";
import classNames from "classnames";



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

    const convertHighlightedToId = useCallback((highlighted : number | null) => {
        if (highlighted === null) return null;
        else if (highlighted >= 0 && highlighted < indexOptions.length)
            return `${parentId}-${highlighted}`;
        else return `${parentId}-menu`;
    }, [parentId, indexOptions])

    const listBoxRef = useRef<HTMLDivElement>(null);

    // Handler to move selection from outside
    useImperativeHandle(ref, () => initMultiselectController(
        {
            listBoxRef, highlighted, 
            setHighLighted, convertHighlightedToId,
            indexOptions, toggleOption
        }
    )
    , [highlighted, convertHighlightedToId, indexOptions, toggleOption])

    // ClassName
    const className = classNames(styles.ComboMenu, {
        [styles.highlighted] : convertHighlightedToId(highlighted) === `${parentId}-menu`,
        [styles.Blue] : props.theme === Theme.Blue
    })

    return (props.expanded === undefined || props.expanded) ? <div ref={listBoxRef}
    className={className}
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
            highlighted={convertHighlightedToId(highlighted) === `${parentId}-${index}`}
            theme={props.theme}
            />
        )
    }
    </div> : <div ref={listBoxRef}></div>
}

export default React.forwardRef<ListBoxPopUpRef, ListBoxPopUpProps>(ListBoxPopUp);