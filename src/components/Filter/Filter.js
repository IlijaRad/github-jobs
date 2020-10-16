import React from 'react';
import './Filter.css';
import SearchBar from '../SearchBar/SearchBar';
import CheckBox from '../CheckBox/CheckBox'

class Filter extends React.Component {
    state = {
        checkboxes: [{
            id: 0,
            text: "Berlin",
            checked: true
        }, {
            id: 1,
            text: "Amsterdam",
            checked: false
        }, {
            id: 2,
            text: "Vienna",
            checked: false
        }, {
            id: 3,
            text: "London",
            checked: false
        }],
        checkedCount: 1,
        fullTime: true
    }

    handleCheck = (text, checked, id) => {
        let location = '';
        if (this.state.checkedCount === 0){
            this.setState({checkboxes: this.state.checkboxes.map((chkbox) => {
                if (id === chkbox.id) {
                    chkbox.checked = true;
                    location = chkbox.text;
                }
                return chkbox;
            }), checkedCount: 1});
        } else if (this.state.checkedCount === 1){
            if (checked === true){
                this.setState({checkboxes: this.state.checkboxes.map((chkbox) => {
                    if (id === chkbox.id) {
                        chkbox.checked = false;
                    }
                    return chkbox;
                }), checkedCount: 0});
            }
            if (checked === false){
                this.setState({checkboxes: this.state.checkboxes.map((chkbox) => {
                    if (chkbox.checked){
                        chkbox.checked = false;
                        
                    }
                    if (chkbox.id === id){
                        chkbox.checked = true;
                        location = chkbox.text;
                    }
                    return chkbox;
                }), checkedCount: 1})
            }
        }
        this.props.handleCheck(location);
    }
    render(){
        return (
            <div className="filter-container">
                <div className="search">
                    <CheckBox text="Full Time" checked={this.state.fullTime} onCheck={() => {if (!this.state.fullTime) this.props.handleType('Full Time'); else this.props.handleType(''); this.setState({fullTime: !this.state.fullTime})}}/>
                    <div className="search-container">
                        <i className="las la-location-arrow arr-left"></i>
                        <label className="search-location">Location</label>
                        <SearchBar placeholder={this.props.placeholder} onSubmit={this.props.onSubmit} />
                    </div>
                        
                    <div>
                        {this.state.checkboxes.map((checkbox) => (<CheckBox key={checkbox.id} text={checkbox.text} checked={checkbox.checked} onCheck={(checked) => this.handleCheck(checkbox.text, checkbox.checked, checkbox.id)}/>))}
                    </div>

                </div>          
            </div>
        )
    }
}

export default Filter;