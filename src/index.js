import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import JobList from './components/JobList/JobList'
import SearchBar from './components/SearchBar/SearchBar'
import Pagination from './components/Pagination/Pagination'
import Filter from './components/Filter/Filter'

class App extends React.Component{
    state = {
        jobs: [],
        currentPage: 1,
        postsPerPage: 10,
        location: 'Berlin',
        description: '',
        type: "Full Time"
    }
    searchAPI = async () => {
        const request = await fetch('https://morning-refuge-16267.herokuapp.com/https://jobs.github.com/positions.json?' + new URLSearchParams({
            location: this.state.location,
            type: "",
            description: this.state.description,
        }))
        const json = await request.json();
        this.setState({jobs: json, currentPage: 1});
    }
 
    componentDidMount(){
        this.searchAPI();
    }
    shouldComponentUpdate(nextProps, nextState){
        if (this.state.jobs.length !== nextState.jobs.length){   
            return true;
            
        } else if (this.state.jobs.length === nextState.jobs.length){
            for (let i = 0; i < this.state.jobs.length; i++){
                if (this.state.jobs[i].id !== nextState.jobs[i].id){
                    return true;
                }
            }
        }
        if (this.state.currentPage !== nextState.currentPage) {
            return true;
        }
        return false;
    }
    searchByDescription = (term) =>{
        this.setState({description: term}, () => this.searchAPI());
    }

    searchByLocation =  (term) =>{
        this.setState({location: term}, () => this.searchAPI());
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
                    <SearchBar onSubmit={this.searchByDescription} placeholder="Title, companies, expertise or benefits" />
                </header>
                <div className="content">
                    <Filter onSubmit={this.searchByLocation} handleType={(type) => this.setState({type}, () => this.searchAPI())} placeholder="City, state, zip code or country" handleCheck={(loc) => this.setState({location: loc}, () => this.searchAPI())}/>
                    <JobList jobs={currentPosts}/>
                </div>
                    <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.jobs.length} paginate={paginate} currPage={this.state.currentPage} />
            </div>
                
        )
    }
    
}

ReactDOM.render(<App />, document.getElementById("root"));