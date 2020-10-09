import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
    state = {
        jobs: []
    }
    searchAPI = async () => {
        const request = await fetch('https://morning-refuge-16267.herokuapp.com/https://jobs.github.com/positions.json?' + new URLSearchParams({
            title: "",
            location: "US",
            type: "",
            company: "",
        }))
        const json = await request.json();
        this.setState({jobs: json})
    }
    componentDidMount(){
        this.searchAPI();
    }

    render(){
        return (
            <div className="container">
                <h1 className="main-title">Github Jobs</h1>
                <JobList jobs={this.state.jobs}/>
            </div>
        )
    }
    
}

const Job = (props) => {
    let posted = new Date(props.time);
    let today = new Date();
    let dateDiff = Math.floor((Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) - Date.UTC(posted.getFullYear(), posted.getMonth(), posted.getDate()) ) /(1000 * 60 * 60 * 24));
    let postedComponent;
    if (dateDiff === 0) {
        postedComponent = <div className="time">Posted today</div>
    } else if (dateDiff === 1) {
        postedComponent = <div className="time">Posted yesterday</div>
    } else {
        postedComponent = <div className="time">Posted {dateDiff} days ago</div>
    }
    let imgSrc = props.company_logo ? props.company_logo : 'office.jpg';
  
    
    return (
        <div>
            <div className="job-container">
                <div className="main-details">
                    <img src={imgSrc} alt="" className="company-logo"/>
                    <div className="column">
                        <a href="#"><div className="title">{props.title}</div></a>
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
                        {postedComponent}
                    </div>
                    
                                  
                </div>          
            </div>
        </div>
    )
}

const JobList = (props) => {
    const renderedList = props.jobs.map((item) => {
        return <Job key = {item.id} title={item.title} location={item.location} type={item.type} company={item.company} company_logo={item.company_logo} time={item.created_at}/>
    })
    return (
        <div>
            {renderedList}
        </div>
    )
}




const rt = document.getElementById("root");

ReactDOM.render(<App />, rt);