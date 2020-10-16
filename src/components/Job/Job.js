import React from 'react';
import logo from '../../images/office.jpg'

export default (props) => {
    let posted = new Date(props.time);
    let today = new Date();
    let dateDiff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(posted.getFullYear(), posted.getMonth(), posted.getDate()) ) /(1000 * 60 * 60 * 24));
    let postedString;
    if (dateDiff === 0) postedString = 'Posted today';
    else if (dateDiff === 1) postedString = 'Posted yesterday';
    else postedString = `Posted ${dateDiff} days ago`;
    
    let imgSrc = props.company_logo ? props.company_logo : logo;
    
    return (
        <div>
            <div className="job-container">
                <div className="main-details">
                    <img src={imgSrc} alt="" className="company-logo"/>
                    <div className="column">
                        <a href="#!"><div className="title">{props.title}</div></a>
                        <div className="company-name">{props.company}</div>
                        <div className="type">{props.type}</div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="column center">
                        <i className="las la-location-arrow"></i>
                        <div className="location">{props.location}</div>
                    </div>
                    <div className="column center">
                        <i className="las la-calendar"></i>
                        <div className="time">{postedString}</div>
                    </div>
                                 
                </div>          
            </div>
        </div>
    )
}