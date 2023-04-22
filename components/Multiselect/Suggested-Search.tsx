import { useRef, useState, useEffect, FocusEventHandler, useCallback, MouseEventHandler, KeyboardEventHandler } from 'react';
import styles from './Multiselect.module.scss';
import { FocusAt } from './Components/enums';
import ListBoxPopUp from './Components/ListBoxPopUp';
import { useDebounce } from '../TagFilter/useDebounce';
import { Theme } from './Components/enums';
import classNames from 'classnames';

function MagnifyingGlass ({className} : ArrowProps) {
    return <svg aria-label='Search Icon' className={className} fill='abb5be' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
}

function isOneOf(target : string, list : string[]) {
    for (const str of list) 
        if (target === str) return true;
    
    return false;
}

/*
    Мультиселект с текстовым фильтром
*/

export default function SuggestedSearch (props : SuggestedSearchProps) {

    const {id, lable, options, toggleOption, height, setOuterInput} = props;

    const [expanded, setExpanded] = useState(false);
    // Focus is used to make sure that we won't lose input focus during actions
    const [focus, setFocus] = useState(false);
    
    // Text from input
    const [inputText, setInputText] = useState<string>('');
    const debouncedInput = useDebounce(inputText, 200);

    const inputRef = useRef<HTMLInputElement>(null);
    const fullBoxRef = useRef<HTMLInputElement>(null);
    const comboMenuRef = useRef<ListBoxPopUpRef>(null);

    // Handle debounceUpdate
    
    useEffect(() => {
        setOuterInput(debouncedInput);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedInput])

    // Control handlers

    const handleFocus : FocusEventHandler = useCallback(() => {
        setFocus(true);
        setExpanded(true);
    }, [])

    const handleClick : MouseEventHandler = useCallback(() => {
        setExpanded(true);
    }, [])

    const handleBlur : FocusEventHandler = useCallback((event) => {

        const fullBox = fullBoxRef.current;
        if (fullBox === null) return

        if (!fullBox.contains(
            event.relatedTarget as HTMLElement)) {
            
            setFocus(false);
            setExpanded(false);
            comboMenuRef.current?.loseFocus();
        }
        else {
            setTimeout(() => inputRef.current?.focus(), 10)
        }
    }, [])

    const handleKeyDownCollapsed : KeyboardEventHandler = useCallback((event) => {

        if (options.size === 0) return;

        switch (event.key) {
            case 'ArrowUp' :
            case 'ArrowDown' :
            case 'Enter' :
                event.preventDefault();
                setExpanded(true);     
        }

    }, [options])

    const handleKeyDownExpanded : KeyboardEventHandler = useCallback((event) => {

        if (!isOneOf(event.key, ['Enter', 'Escape', 'ArrowDown',
            'ArrowUp', 'PageUp', 'PageDown'])) return;

        const comboMenu = comboMenuRef.current;
        if (comboMenu === null) return;

        event.preventDefault();

        switch (event.key) {
            case 'Enter' :
                return comboMenu.toggle()
            case 'Escape' :
                comboMenu.loseFocus();
                return setExpanded(false);
            case 'ArrowDown' :
                if (comboMenu.focusAt() !== FocusAt.Option) 
                    return comboMenu.focusOnStart();
                else return comboMenu.focusDown(1);
            case 'ArrowUp' :
                if (comboMenu.focusAt() !== FocusAt.Option) 
                    return comboMenu.focusOnStart();
                else return comboMenu.focusUp(1);
            case 'PageUp':
                if (comboMenu.focusAt() !== FocusAt.Option) 
                    return comboMenu.focusOnStart();
                else return comboMenu.focusUp(10);
            case 'PageDown' :
                if (comboMenu.focusAt() !== FocusAt.Option) 
                    return comboMenu.focusOnEnd();
                else return comboMenu.focusDown(10);
        }

    }, [])

    // ClassNames

    const comboboxClass = classNames( styles.Combobox, {
        [styles.Expanded] : expanded && options.size !== 0,
        [styles.Blue] : props.theme === Theme.Blue
    })
    const inputClass = classNames(styles.Input, {
        [styles.Focused] : focus
    })

    return <div ref={fullBoxRef} className={comboboxClass}>

        <MagnifyingGlass className={styles.MagnifyingGlass}/>

        <input ref={inputRef} 
        className={inputClass} type='text' placeholder={lable}
        id={id}
        // Aria
        role='combobox'
        aria-expanded={expanded && options.size !== 0}
        aria-controls={`${id}-menu`}
        aria-autocomplete='list'
        aria-activedescendant={ comboMenuRef.current?.getId() ?? undefined}
        // Event Handlers
        onChange={(event) => setInputText(event.currentTarget.value ?? '')}
        onBlurCapture={handleBlur}
        onClick={handleClick}
        onFocus={handleFocus}
        onKeyDown={expanded ? handleKeyDownExpanded : handleKeyDownCollapsed}

        ></input>

        <ListBoxPopUp
        expanded={expanded && options.size !== 0}
        ref={comboMenuRef}
        options={options}
        toggleOption={toggleOption}
        parentId={id}
        height={height}
        announce={true}
        theme={props.theme}
        />
   </div>
}