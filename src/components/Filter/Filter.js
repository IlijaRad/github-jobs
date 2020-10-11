import React from 'react';
import './Filter.css';
import SearchBar from '../SearchBar/SearchBar'

const Filter = (props) => {
    return (
        <div className="filter-container">
            <div className="search">
            <i className="las la-location-arrow arr-left"></i>
                <label className="search-location">Location</label>
                
                <SearchBar placeholder={props.placeholder} onSubmit={props.onSubmit} />  
            </div>
             
        </div>
    )
}

export default Filter;