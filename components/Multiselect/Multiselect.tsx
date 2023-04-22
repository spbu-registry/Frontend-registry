import styles from './Multiselect.module.scss';

import { useEffect, useRef, useState, useCallback, MouseEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';
import classNames from 'classnames';

import { useSuccession } from './useSuccession';
import { useMultiselectController } from './useMultiselectController';

import { isOneOf, convertHighlightedToId } from './Components/utils';

import { FocusAt, Theme } from './Components/enums';
import { Arrow } from './Components/SVGs';
import ListBoxPopUp from './Components/ListBoxPopUp';

/* 
    Компонент мультиселект полностью заполняет контейнер, в котором оказывается,
    поэтому его нужно оборачивать в собственный wrapper.

    Компонент создан в соответствии со стандартом
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
*/

export default function Multiselect (props : MultiselectProps) {
    const {options, toggleOption, id, height, lable} = props;

    const [expanded, setExpanded] = useState(false);

    // Храним строку для автопоиска
    const [succession, addChar] = useSuccession(1000);

    const comboboxRef = useRef<HTMLDivElement>(null);
    const comboMenuRef = useRef<HTMLDivElement>(null);

    const [controller, viewer] = useMultiselectController(options, toggleOption);

    // Control handlers

    const handleClick : MouseEventHandler = useCallback((event) => {

        const menu = comboMenuRef.current;
        const multiselect = comboboxRef.current;

        if (menu === null || multiselect === null) return;

        if (!expanded) {
            setExpanded(true);
        }
        else if (
            multiselect.contains(event.target as HTMLElement)
            && !menu.contains(event.target as HTMLElement)
            ) {
                setExpanded(false);
                controller.loseFocus();
            }
    }, [expanded, controller])

    const handleBlur : FocusEventHandler = useCallback((event) => {
        if ((event.currentTarget as HTMLElement).contains(
            event.relatedTarget as HTMLElement)) return;

        setExpanded(false);
        controller.loseFocus()
    }, [controller])

    const handleKeyDownCollapsed : KeyboardEventHandler = useCallback((event) => {

        if (!isOneOf(event.key, [
            'ArrowDown', 'Enter', ' ', 'ArrowUp', 'Home', 'End'
        ])) return;

        event.preventDefault();
        setExpanded(true);

        switch (event.key) {
            case 'ArrowDown' :
            case 'Enter' :
            case ' ' :
                return controller.focusOnMenu()
            
            case 'ArrowUp' :
            case 'Home' :
                return controller.focusOnStart();
            
            case 'End':
                return controller.focusOnEnd();

        }
    }, [controller])

    const handleKeyDownExpanded : KeyboardEventHandler = useCallback((event) => {

        if (!isOneOf(event.key, [
            'Enter', ' ', 'Escape', 'ArrowDown', 'ArrowUp', 'Home', 'End', 'PageUp', 'PageDown'
        ])) return;

        event.preventDefault();

        switch (event.key) {
            case 'Enter' :
            case ' ' : 
                return controller.toggle();

            case 'Escape' :
                return setExpanded(false);

            case 'ArrowDown' :
                if (controller.focusAt() !== FocusAt.Option) 
                    return controller.focusOnStart();
                else return controller.focusDown(1);

            case 'ArrowUp' : 
                if (controller.focusAt() !== FocusAt.Option) 
                        return controller.focusOnStart();
                else return controller.focusUp(1);

            case 'Home' : 
                return controller.focusOnStart();

            case 'End' :
                return controller.focusOnEnd();

            case 'PageUp' : 
                if (controller.focusAt() === FocusAt.Menu) 
                    return controller.focusOnStart();
                else return controller.focusUp(10);
            
            case 'PageDown' :
                if (controller.focusAt() === FocusAt.Menu) 
                    return controller.focusOnEnd();
                else return controller.focusDown(10);
        }
    }, [controller])

    // Handle autocomplete
    useEffect(() => {
        if (comboboxRef.current === null ) return;

        const combobox = comboboxRef.current;

        const handleAutoComplete = (event : KeyboardEvent) => {

            if (event.key.length !== 1 || event.key === ' ') return;

            controller.focusAutocomplete(succession, event.key)
            addChar(event.key);
            setExpanded(true);
        }

        combobox.addEventListener('keydown', handleAutoComplete);
        return () => combobox.removeEventListener('keydown', handleAutoComplete);

    }, [addChar, succession, controller])

    // ClassNames
    const comboboxClass = classNames(styles.Combobox, {
        [styles.Expanded] : expanded,
        [styles.Blue] : props.theme === Theme.Blue
    })

    return <div 
        ref={comboboxRef} 
        className={comboboxClass}
        id={id}
        tabIndex={0}
        // Aria
        role="combobox"
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
        aria-expanded={expanded}
        aria-controls={expanded ? `${id}-menu` : undefined}
        aria-activedescendant={
            convertHighlightedToId(
                props.id, options.size, controller.highlighted
                ) ?? undefined
            }
        // Handle Events
        onClick={handleClick}
        onBlurCapture={handleBlur}
        onKeyDown={ expanded ? handleKeyDownExpanded : handleKeyDownCollapsed}
        >
        <label id={`${id}-label`} htmlFor={id}>{lable}</label>
        <Arrow turned={expanded} />
        
        <ListBoxPopUp
        expanded={expanded}
        ref={comboMenuRef}
        controller={controller}
        viewer={viewer}
        toggleOption={toggleOption}
        parentId={id}
        height={height}
        theme={props.theme}
        />

    </div>
}

Multiselect.defaultProps = {
    height : 5
}