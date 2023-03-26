import styles from './Multiselect.module.scss';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useSuccession } from './useSuccession';
import { Option } from './Option';

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

export default function Multiselect (props : MultiselectProps) {
    const {options, setOption, id, height, lable} = props;

    const [expanded, setExpanded] = useState(false);
    // Индекс выбранного подсвечиваемого компонента
    const [highlighted, setHighLighted] = useState<number | null>(null);
    // Храним строку для автопоиска
    const [succession, addChar] = useSuccession(1000);
    
    // Пронумеруем map - options
    const indexOptions = useMemo(() => {
        const ans : string[] = [];
        
        options.forEach((value, key) => ans.push(key));
        
        return ans;   
        
    }, [options])
    
    // Для aria конвертируем highlight в id
    const convertHighlightedToId = () => {
        if (highlighted === null) return null;
        else if (highlighted < indexOptions.length && 
                highlighted >= 0) return `${id}-${highlighted}`
        else return `${id}-menu`
    }

    const comboboxRef = useRef<HTMLDivElement>(null);
    const comboMenuRef = useRef<HTMLDivElement>(null);

    // Handle expansion on click
    useEffect(() => {
        if (comboboxRef.current === null) return;

        const multiselect = comboboxRef.current;
        const menu = comboMenuRef.current;

        const handleClick = (event : Event) => {

            if (menu === null)
                setExpanded(true);
            else if (
                multiselect.contains(event.target as HTMLElement)
                && !menu.contains(event.target as HTMLElement)
                ) setExpanded(false);
        }

        multiselect.addEventListener('click', handleClick);
        return () => {
            multiselect.removeEventListener('click', handleClick);
        }

    }, [comboboxRef, expanded])

    // Handle expansion on blur 
    useEffect(() => {
        if (comboboxRef.current === null) return;
        const combobox = comboboxRef.current;

        const loseFocus = (event : FocusEvent) => {

            if (!(event.currentTarget as HTMLElement).contains(
                    event.relatedTarget as HTMLElement))
                setExpanded(prev => false);
                setHighLighted(null);
        }

        combobox.addEventListener('focusout', loseFocus);
        return () => combobox.removeEventListener('focusout', loseFocus);
    })

    // Handle controls for listbox collapsed
    useEffect(() => {
        if (expanded || comboboxRef.current === null) return;
        const combobox = comboboxRef.current;

        const handleOnKeyDownCollapsed = (event : KeyboardEvent) => {

            if (event.key.length === 1 && 
                event.key !== ' ' || event.key === 'Tab') return;

            event.preventDefault();

            if ('ArrowDownEnter '.includes(event.key)) {
                setExpanded(true);
                setHighLighted(indexOptions.length);
            }
            else if ('ArrowUpHome'.includes(event.key)) {
                setExpanded(true);0
                setHighLighted(0);
            }
            else if ('End'.includes(event.key)) {
                setExpanded(true);
                setHighLighted(indexOptions.length - 1);
            }
        }

        combobox.addEventListener('keydown', handleOnKeyDownCollapsed);
        return () => combobox.removeEventListener('keydown', handleOnKeyDownCollapsed);

    }, [expanded, indexOptions])

    // Handle controls for listbox expanded
    useEffect(() => {
        if (!expanded || comboboxRef.current === null) return;
        const combobox = comboboxRef.current;

        const handleOnKeyDownExpanded = (event : KeyboardEvent) => {

            if (event.key.length === 1 && 
                event.key !== ' ' || event.key === 'Tab') return;

            event.preventDefault();

            if ('Enter '.includes(event.key)) {
                const keyForMap = indexOptions[highlighted as number];

                setOption(keyForMap, !(options.get(keyForMap) as boolean))
            } else if ('Escape'.includes(event.key)) {
                setHighLighted(null);
                setExpanded(false);
            } else if ('ArrowDown'.includes(event.key)) {
                if (highlighted === indexOptions.length) {
                    setHighLighted(0);
                }
                if (highlighted as number + 1 < indexOptions.length) {
                    setHighLighted(prev => prev as number + 1);
                }
            } else if ('ArrowUp'.includes(event.key)) {
                if (highlighted === indexOptions.length) {
                    setHighLighted(0);
                }
                if (highlighted as number - 1 >= 0) {
                    setHighLighted(prev => prev as number - 1);
                }
            } else if ('Home'.includes(event.key)) setHighLighted(0);
            else if ('End'.includes(event.key)) setHighLighted(indexOptions.length - 1);
            else if ('PageUp'.includes(event.key)){ 
                if (highlighted as number === indexOptions.length) setHighLighted(0);
                else setHighLighted(
                    highlighted as number - 10 >= 0 ? 
                        highlighted as number - 10 : 0
                )
            }
            else if ('PageDown'.includes(event.key)) setHighLighted(
                highlighted as number + 10 < indexOptions.length ? 
                    highlighted as number + 10 : indexOptions.length - 1
            )
        }

        combobox.addEventListener('keydown', handleOnKeyDownExpanded);
        return () => combobox.removeEventListener('keydown', handleOnKeyDownExpanded);
    })

    // Handle autocomplete
    useEffect(() => {
        // Функция для поиска совпадений среди вариантов
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
        if (comboboxRef.current === null) return;
        const combobox = comboboxRef.current;

        const handleAutoComplete = (event : KeyboardEvent) => {

            if (event.key.length === 1 && event.key !== ' ')

                setHighLighted( (prev) => {
                    let result = cicleThroughFrom(succession + event.key, prev);
                    result = result ?? cicleThroughFrom(event.key, prev);
                    return result ?? prev
                    }
                )
                addChar(event.key);
                setExpanded(prev => true);
        }

        combobox.addEventListener('keydown', handleAutoComplete);
        return () => combobox.removeEventListener('keydown', handleAutoComplete);

    }, [addChar, succession, indexOptions])

    return <div ref={comboboxRef} 
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
        aria-activedescendant={convertHighlightedToId() ?? undefined}
        >
        <label id={`${id}-label`} htmlFor={id}>{lable}</label>
        <Arrow className={`${styles.Arrow} ${expanded ? styles.Down : styles.Up}`}/>
        
        {expanded ? 
        <div ref={comboMenuRef}
            className={`${styles.ComboMenu} 
                ${convertHighlightedToId() === `${id}-menu` ? styles.highlighted : ''}`}
            style={{'--options' : height} as React.CSSProperties}
            id={`${id}-menu`}
            tabIndex={-1}
            // Aria
            role='listbox'
            aria-multiselectable={true}
            >
            {
                indexOptions.map(
                    (key, index) => <Option 
                    id={`${id}-${index}`}
                    key={key}
                    option={[key, options.get(key) as boolean]}
                    setOption={(value) => setOption(key, value)}
                    highlighted={convertHighlightedToId() === `${id}-${index}`}
                    />
                )
            }
        </div> : null}

    </div>
    
}

Multiselect.defaultProps = {
    height : 2
}