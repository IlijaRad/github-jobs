import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import logo from './images/office.jpg'
import SearchBar from './components/SearchBar/SearchBar'
import Pagination from './components/Pagination/Pagination'

class App extends React.Component{
    state = {
        jobs: [],
        currentPage: 1,
        postsPerPage: 10
    }
    searchAPI = async (description="") => {
        const request = await fetch('https://morning-refuge-16267.herokuapp.com/https://jobs.github.com/positions.json?' + new URLSearchParams({
            title: "",
            location: "",
            type: "",
            company: "",
            description,
        }))
        const json = await request.json();
        this.setState({jobs: json})
    }
 
    componentDidMount(){
        this.searchAPI();
    }

    
    onSearchSubmit =  (term) =>{
        this.setState({currentPage: 1})
        this.searchAPI(term);
    }
    
    render(){
        let indexOfLastPost= this.state.currentPage * this.state.postsPerPage;
        let indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        let currentPosts = this.state.jobs.slice(indexOfFirstPost, indexOfLastPost);
        const paginate = (pageNumber) => this.setState({currentPage: pageNumber});
        return (
            <div className="container">
                <header>
                    <h1 className="main-title">Github Jobs</h1>
                    <SearchBar onSubmit={this.onSearchSubmit}/>
                </header>     
                <JobList jobs={currentPosts}/>
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.jobs.length} paginate={paginate} currPage={this.state.currentPage} />
            </div>
        )
    }
    
}

const Job = (props) => {
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

const root = document.getElementById("root");

ReactDOM.render(<App />, root);