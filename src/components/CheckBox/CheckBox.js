
import React from 'react';
import './CheckBox.css'

class CheckBox extends React.Component{
    state={
        checked: true,
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.state.checked) {
          this.setState({ checked: nextProps.checked });
        }
    }
    
    render(){
        return (
            <div className="checkbox-container">
                <label className="label-check"><input type="checkbox" checked={this.state.checked} onChange={() => this.props.onCheck(this.state.checked)} className="checkbox"/>
                    <svg className="checkbox-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
                    <svg className="checkbox-faded" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                    <span className="checkbox-text">{this.props.text}</span>
                </label>  
            </div>
        )
    }
    

}

export default CheckBox;