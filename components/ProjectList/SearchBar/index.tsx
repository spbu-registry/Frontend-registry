import React, {FC, useState, useEffect} from "react";
import { useDebounce } from "../../TagFilter/useDebounce";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import styles from './Search.module.scss';

interface SearchBarProps {
    id : string;
    label : string;
    setInput : (value : string) => void;
}

const SearchBar: FC<SearchBarProps> = (props) => {

    const [textInput, setTextInput] = useState<string>('');

    const debounced = useDebounce(textInput, 200);

    
    useEffect(() => {
        props.setInput(debounced)
    }, [debounced]);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTextInput(e.currentTarget.value);
    };

    return (
        <div className={styles.SearchBar}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.Icon}/>
            <label style={{display : 'none'}} htmlFor={props.id}>{props.label}</label>
            <input
                className={styles.Search}
                id={props.id}
                type="text"
                onChange={handleOnChange}
            />
        </div>
    )
}

export default SearchBar;