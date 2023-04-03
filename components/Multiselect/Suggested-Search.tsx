import { useRef, useState, useMemo, useEffect } from 'react';
import Announce from './Announce';
import styles from './Multiselect.module.scss';
import { Option } from './Option';
import { useDebounce } from '../TagFilter/useDebounce';

function MagnifyingGlass ({className} : ArrowProps) {
    return <svg aria-label='Search Icon' className={className} fill='abb5be' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
}

export default function SuggestedSearch (props : SuggestedSearchProps) {

    const {id, lable, options, toggleOption, height, setInput} = props;

    const [expanded, setExpanded] = useState(false);
    const [focus, setFocus] = useState(false);
    // Индекс выбранного подсвечиваемого компонента
    const [highlighted, setHighLighted] = useState<number | null>(null);
    
    const [inputText, setInputText] = useState<string>('');
    const debouncedInput = useDebounce(inputText, 200);

    const indexOptions = useMemo(() => {
        const ans : string[] = [];
        
        options.forEach((value, key) => ans.push(key));
        
        return ans;
        
    }, [options])

    // Для aria конвертируем highlight в id
    const convertHighlightedToId = () => {
        if (highlighted === null) return null;
        if (highlighted < indexOptions.length && 
                highlighted >= 0) return `${id}-${highlighted}`
        else return null
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const fullBoxRef = useRef<HTMLInputElement>(null);

    // Handle debounceUpdate
    
    useEffect(() => {
        setInput(debouncedInput);
    }, [debouncedInput])

    // Handle expansion on focus
    useEffect (() => {
        if (inputRef.current === null) return;

        const input = inputRef.current;

        const handleFocus = () => {
            setFocus(true);
            setExpanded(true);
        }

        input.addEventListener('focus', handleFocus);
        return () => input.removeEventListener('focus', handleFocus);

    }, [indexOptions]);

    // Handle Click
    useEffect(() => {
        if (inputRef.current === null) return;

        const input = inputRef.current;

        const handleClick = () => setExpanded(true);

        input.addEventListener('click', handleClick);
        return () => input.removeEventListener('click', handleClick);
    })

    // Handle expansion on blur 
    useEffect(() => {
        if (inputRef.current === null || fullBoxRef.current === null) return;

        const input = inputRef.current;
        const fullBox = fullBoxRef.current;

        const loseFocus = (event : FocusEvent) => {

            if (!fullBox.contains(
                    event.relatedTarget as HTMLElement)) {
                    
                    setFocus(false);
                    setExpanded(prev => false);
                    setHighLighted(null);
                }
            else {
                setTimeout(() => input.focus(), 10)
            }
                
        }

        input.addEventListener('focusout', loseFocus);
        return () => input.removeEventListener('focusout', loseFocus);
    });

    // Handle controls for listbox collapsed
    useEffect(() => {
        if (expanded || inputRef.current === null) return;
        const input = inputRef.current;

        const handleOnKeyDownCollapsed = (event : KeyboardEvent) => {

            if (event.key === 'ArrowUp' ||
                event.key === 'ArrowDown' ||
                event.key === 'Enter') {
                    event.preventDefault();
                    setExpanded(true);
                    setHighLighted(0);
            }
        }

        input.addEventListener('keydown', handleOnKeyDownCollapsed);
        return () => input.removeEventListener('keydown', handleOnKeyDownCollapsed);

    }, [expanded, indexOptions])

    // Handle controls for listbox expanded
    useEffect(() => {
        if (!expanded || inputRef.current === null) return;
        const input = inputRef.current;

        const handleOnKeyDownExpanded = (event : KeyboardEvent) => {

            if (event.key.length === 1 ||
                event.key === 'Tab' || event.key === 'Backspace'
                || event.key==='ArrowLeft' || event.key === 'ArrowRight'
                || event.key === 'Home' || event.key === 'End') return;

            event.preventDefault();

            if ('Enter'.includes(event.key)) {
                const keyForMap = indexOptions[highlighted === null ? 0 : highlighted];
                toggleOption(keyForMap)
            } else if ('Escape'.includes(event.key)) {
                setHighLighted(null);
                setExpanded(false);
            } else if ('ArrowDown'.includes(event.key)) {

                if (highlighted === null) {
                    setHighLighted(0);
                }
                else if (highlighted as number + 1 < indexOptions.length) {
                    setHighLighted(prev => prev as number + 1);
                }
            } else if ('ArrowUp'.includes(event.key)) {
                if (highlighted === null) {
                    setHighLighted(0);
                }
                if (highlighted as number - 1 >= 0) {
                    setHighLighted(prev => prev as number - 1);
                }
            }
            else if ('PageUp'.includes(event.key)){ 
                if (highlighted === null) setHighLighted(0);
                else setHighLighted(
                    highlighted as number - 10 >= 0 ? 
                        highlighted as number - 10 : 0
                )
            }
            else if ('PageDown'.includes(event.key)) {
                if (highlighted === null) setHighLighted(
                    0 + 10 < indexOptions.length ? 
                        0 + 10 : indexOptions.length - 1
                )
                else setHighLighted(
                highlighted as number + 10 < indexOptions.length ? 
                    highlighted as number + 10 : indexOptions.length - 1
                )}
            }

        input.addEventListener('keydown', handleOnKeyDownExpanded);
        return () => input.removeEventListener('keydown', handleOnKeyDownExpanded);
    })


    return <div ref={fullBoxRef} className={`${styles.Combobox} 
                ${expanded && indexOptions.length !== 0 ? styles.Expanded : styles.Collapsed}`}>

        <MagnifyingGlass className={styles.MagnifyingGlass}/>

        <input ref={inputRef} 
        className={`${styles.Input} 
        ${focus ? styles.Focused : ''}`} type='text' placeholder={lable}
        onChange={(event : React.FormEvent<HTMLInputElement>) => 
                setInputText(event.currentTarget.value ?? '')}
        id={id}
        // Aria
        role='combobox'
        aria-expanded={expanded && indexOptions.length !== 0}
        aria-controls={`${id}-menu`}
        aria-autocomplete='list'
        aria-activedescendant={convertHighlightedToId() ?? undefined}
        ></input>

        {expanded ? 
        <div
            className={`${styles.ComboMenu} 
                ${convertHighlightedToId() === `${id}-menu` ? styles.highlighted : ''}`}
            style={{'--options' : Math.min(height, indexOptions.length)} as React.CSSProperties}
            id={`${id}-menu`}
            tabIndex={-1}
            // Aria
            role='listbox'
            aria-multiselectable={true}
            >
            <Announce n={indexOptions.length}></Announce>
            {
                indexOptions.map(
                    (key, index) => <Option 
                    id={`${id}-${index}`}
                    key={key}
                    option={[key, options.get(key) as boolean]}
                    toggleOption={() => toggleOption(key)}
                    highlighted={convertHighlightedToId() === `${id}-${index}`}
                    />
                )
            }
        </div> : null}
   </div>
}