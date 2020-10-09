import React from 'react';
import './SearchBar.css'

class SearchBar extends React.Component {
    state = {
        term: '',
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.term);
    }
    
    render () {
        return (
            <div className="search-container">
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" className="search-bar" value={this.state.term} onChange={(e) => this.setState({term: e.target.value})} />
                    <input type="submit" className="search-button" value="Search"  />
                </form>   
            </div>
        )
    }
}

export default SearchBar;