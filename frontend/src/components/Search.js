import React from 'react'
import { useForm } from '../hooks/useForm'

export const Search = ( {handleSearch} ) => {

    const initialSearch = {
        searchValue: ''
    }

    const [ {searchValue}, handleInputChange] = useForm(initialSearch)

    const searchHandler = () => {
        
        handleSearch(searchValue);

    }

    return (
        <>
        <input 
                type="text" 
                className="form-control"
                placeholder="Search by name or ID..."
                name = "searchValue"
                onChange={handleInputChange}
                value={searchValue}
                />
                <div className="input-group-append">
                    <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={searchHandler}>
                        Search
                    </button>
                </div>
        </>
    )
}
