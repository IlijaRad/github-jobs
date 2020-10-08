import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component{
    state = {
        jobs: []
    }
    searchAPI = async () => {
        const request = await fetch('https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?' + new URLSearchParams({
            title: "",
            location: "",
            type: "Full Time",
            company: "",
        }))
        const json = await request.json();
        console.log(json);
        this.setState({
            jobs: json
        })
        console.log(this.state.jobs)
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
    return (
        <div>
            <div className="job-container">
                <img src={props.company_logo} alt="" className="company-logo"/>
                <div className="column">
                    <div className="title">{props.title}</div>
                    <div className="company-name">{props.company}</div>
                    
                    <div className="type">{props.type}</div>
                </div>
                
            </div>
        </div>
    )
}

const JobList = (props) => {
    const renderedList = props.jobs.map((item) => {
        return <Job key = {item.id} title={item.title} location={item.location} type={item.type} company={item.company} company_logo={item.company_logo}/>
    })
    return (
        <div>
            {renderedList}
        </div>
    )
}




const rt = document.getElementById("root");

ReactDOM.render(<App />, rt);