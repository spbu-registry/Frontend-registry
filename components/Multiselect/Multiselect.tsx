import styles from './Multiselect.module.scss';
import { useEffect, useRef, useState, useCallback, MouseEventHandler, FocusEventHandler, KeyboardEventHandler } from 'react';
import { useSuccession } from './useSuccession';
import ListBoxPopUp, {FocusAt} from './Components/ListBoxPopUp';

/* 
    Компонент мультиселект полностью заполняет контейнер, в котором оказывается,
    поэтому его нужно оборачивать в собственный wrapper.

    Компонент создан в соответствии со стандартом
    https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
*/

function Arrow ({className} : ArrowProps) {
    return <svg aria-label='Cosmetic Arrow' className={className} width="12" height="9" viewBox="0 0 12 9" fill="abb5be" xmlns="http://www.w3.org/2000/svg">
    <path className={styles.Path} d="M6 8.41602L0 2.41566L2.00094 0.416016L6 4.41672L9.99906 0.416016L12 2.41566L6 8.41602Z" fill="#ABB5BE"/>
    </svg>
}

function isOneOf(target : string, list : string[]) {
    for (const str of list) 
        if (target === str) return true;
    
    return false;
}

export default function Multiselect (props : MultiselectProps) {
    const {options, toggleOption, id, height, lable} = props;

    const [expanded, setExpanded] = useState(false);

    // Храним строку для автопоиска
    const [succession, addChar] = useSuccession(1000);

    const comboboxRef = useRef<HTMLDivElement>(null);
    const comboMenuRef = useRef<ListBoxPopUpRef>(null);

    const handleClick : MouseEventHandler = useCallback((event) => {

        const menu = comboMenuRef.current?.element;
        const multiselect = comboboxRef.current;

        if (menu === null || menu === undefined || multiselect === null) return;

        if (!expanded) {
            setExpanded(true);
        }
        else if (
            multiselect.contains(event.target as HTMLElement)
            && !menu.contains(event.target as HTMLElement)
            ) {
                setExpanded(false);
                comboMenuRef.current?.loseFocus();
            }
    }, [expanded])

    const handleBlur : FocusEventHandler = useCallback((event) => {
        if ((event.currentTarget as HTMLElement).contains(
            event.relatedTarget as HTMLElement)) return;

        setExpanded(false);
        comboMenuRef.current?.loseFocus()
    }, [])

    const handleKeyDownCollapsed : KeyboardEventHandler = useCallback((event) => {

        const comboMenu = comboMenuRef.current;
        if (comboMenu === null) return;

        if (!isOneOf(event.key, [
            'ArrowDown', 'Enter', ' ', 'ArrowUp', 'Home', 'End'
        ])) return;

        event.preventDefault();
        setExpanded(true);

        switch (event.key) {
            case 'ArrowDown' :
            case 'Enter' :
            case ' ' :
                return comboMenu.focusOnMenu()
            
            case 'ArrowUp' :
            case 'Home' :
                return comboMenu.focusOnStart();
            
            case 'End':
                return comboMenu.focusOnEnd();

        }
    }, [])

    const handleKeyDownExpanded : KeyboardEventHandler = useCallback((event) => {

        const comboMenu = comboMenuRef.current;
        if (comboMenu === null) return;

        if (!isOneOf(event.key, [
            'Enter', ' ', 'Escape', 'ArrowDown', 'ArrowUp', 'Home', 'End', 'PageUp', 'PageDown'
        ])) return;

        event.preventDefault();

        switch (event.key) {
            case 'Enter' :
            case ' ' : 
                return comboMenu.toggle();

            case 'Escape' :
                return setExpanded(false);

            case 'ArrowDown' :
                if (comboMenu.focusAt() !== FocusAt.Option) 
                    return comboMenu.focusOnStart();
                else return comboMenu.focusDown(1);

            case 'ArrowUp' : 
                if (comboMenu.focusAt() !== FocusAt.Option) 
                        return comboMenu.focusOnStart();
                else return comboMenu.focusUp(1);

            case 'Home' : 
                return comboMenu.focusOnStart();

            case 'End' :
                return comboMenu.focusOnEnd();

            case 'PageUp' : 
                if (comboMenu.focusAt() === FocusAt.Menu) 
                    return comboMenu.focusOnStart();
                else return comboMenu.focusUp(10);
            
            case 'PageDown' :
                if (comboMenu.focusAt() === FocusAt.Menu) 
                    return comboMenu.focusOnEnd();
                else return comboMenu.focusDown(10);
        }
    }, [])

    // Handle autocomplete
    useEffect(() => {
        if (
            comboboxRef.current === null 
            || comboMenuRef.current === null) return;

        const combobox = comboboxRef.current;
        const comboMenu = comboMenuRef.current;

        const handleAutoComplete = (event : KeyboardEvent) => {

            if (event.key.length !== 1 || event.key === ' ') return;

            comboMenu.focusAutocomplete(succession, event.key)
            addChar(event.key);
            setExpanded(true);
        }

        combobox.addEventListener('keydown', handleAutoComplete);
        return () => combobox.removeEventListener('keydown', handleAutoComplete);

    }, [addChar, succession])

    return <div 
        ref={comboboxRef} 
        className={`${styles.Combobox}
            ${expanded ? styles.Expanded : styles.Collapsed}`}
        id={id}
        tabIndex={0}
        // Aria
        role="combobox"
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label`}
        aria-expanded={expanded}
        aria-controls={expanded ? `${id}-menu` : undefined}
        aria-activedescendant={comboMenuRef.current?.getId() ?? undefined}
        // Handle Events
        onClick={handleClick}
        onBlurCapture={handleBlur}
        onKeyDown={ expanded ? handleKeyDownExpanded : handleKeyDownCollapsed}
        >
        <label id={`${id}-label`} htmlFor={id}>{lable}</label>
        <Arrow className={`${styles.Arrow} ${expanded ? styles.Down : styles.Up}`}/>
        
        
        <ListBoxPopUp
        expanded={expanded}
        ref={comboMenuRef}
        options={options}
        toggleOption={toggleOption}
        parentId={id}
        height={height}
        />

    </div>
}

Multiselect.defaultProps = {
    height : 5
}