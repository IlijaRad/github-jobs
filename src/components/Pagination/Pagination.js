import React from 'react';
import './Pagination.css'

const Pagination = ({postsPerPage, totalPosts, paginate, currPage}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length === 1) {
        return null;
    }

    return (
        <div>
            <div className="pagination>">
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => paginate(number)} className={`page-link${currPage === number ? ' active' : ''}`}>
                        {number}
                    </button> 
                ))}
            </div>
        </div> 
    )
}

export default Pagination;