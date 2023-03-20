import React, {useState, useEffect, useDeferredValue} from "react";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const debouncedSearchTerm = useDeferredValue(searchTerm);

    useEffect(
        () => {
            if (debouncedSearchTerm) {

            } else {
                setResults([]);
            }

        },
        [debouncedSearchTerm]
    )
    return (
        <div>
            <input
            onChange={event => setSearchTerm(event.target.value)}
            />

        </div>
    )
}

export default Search;