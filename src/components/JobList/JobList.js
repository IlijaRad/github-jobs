import React from 'react'
import Job from '../Job/Job'

export default (props) => {
    const renderedList = props.jobs.map((item) => (
        <Job key = {item.id} title={item.title} location={item.location} type={item.type} company={item.company} company_logo={item.company_logo} time={item.created_at}/>
    ))
    return (
        <div className="job-list">
            {renderedList}
        </div>
    )
}