import styles from './css/ListBoxPopUp.module.scss';

import React, { useCallback } from "react";
import classNames from "classnames";

import Option from "./Option";
import Announce from "./Announce";

import { Theme } from "./enums";
import { convertHighlightedToId } from "./utils";



/* 
    Pop Up, который используется в мультиселектах. Управление выделением 
    и выбором в основном выполняется из вне, используя ref
*/

function ListBoxPopUp (
    props : ListBoxPopUpProps, ref : React.ForwardedRef<HTMLDivElement>) {

    const {expanded, parentId, controller, viewer, height, toggleOption, theme} = props;

    const {highlighted} = controller;
    const {indexOptions, options} = viewer;
    
    const makeId = useCallback((index : number | null) => convertHighlightedToId(
        parentId, indexOptions.length, index
    ), [parentId, indexOptions]);
        
        // ClassName
    const className = classNames(styles.ComboMenu, {
        [styles.highlighted] : makeId(highlighted) === `${parentId}-menu`,
        [styles.Blue] : props.theme === Theme.Blue,
        [styles.hideScroll] : height >= indexOptions.length
    })

    return (expanded === undefined || expanded) ? <div ref={ref}
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
            highlighted={makeId(highlighted) === `${parentId}-${index}`}
            theme={theme}
            />
        )
    }
    </div> : <div ref={ref}></div>
}

export default React.forwardRef<HTMLDivElement, ListBoxPopUpProps>(ListBoxPopUp);