import React from 'react'

/* testing */
export default function SearchBar({ placeholder, data }) {
    return (
        <div className="search">
            <div className='SearchInput'>
                <input type="text" />
                <div className='searchIcon'></div>
            </div>
            <div className='data result'></div>
        </div>
    )
}
