import React from 'react';

function SearchBar(props) {

    return (
        <input
            className="border-2 rounded-lg py-3 mt-2 mx-2 px-6"
            value={props.result.name}
            placeholder={props.placeholder}
            onChange={props.searchChange}
            name={props.name}
        />
    )
};

export default SearchBar;