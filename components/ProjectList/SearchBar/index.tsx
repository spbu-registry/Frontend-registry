import React, {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
    searchInputClassName: string;
    handleSearchChange: any;
    iconClassName: string;

}

const SearchBar: FC<SearchBarProps> = ({searchInputClassName, handleSearchChange, iconClassName}) => {

    return (
        <div className={searchInputClassName}>
            <FontAwesomeIcon icon={faMagnifyingGlass} className={iconClassName}/>
            <input
                type="text"
                onChange={handleSearchChange}
            />
        </div>
    )
}

export default SearchBar;