import React, { useState } from 'react'

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {

    let pageNos = []
    for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
        pageNos.push(i)
    }

    return (
        <div>
            {
                pageNos.map((pageNo) => {
                    return (
                        <button onClick={()=>setCurrentPage(pageNo)}>{pageNo}</button>
                    )
                })
            }
        </div>
    )
}

export default Pagination