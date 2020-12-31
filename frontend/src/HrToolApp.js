import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { EmployeeList } from './components/EmployeeList'
import { NewEmployee } from './components/NewEmployee'
import { Search } from './components/Search'




export const HrToolApp = () => {

    const [employees, setEmployees] = useState([])


    const getData = () => {

        axios.get('http://localhost:4000/api/employee/get/')
            .then(res => { setEmployees(res.data.employees) })
            .catch(error => { setEmployees([]) })

    }

    useEffect(() => {

        getData()

    }, [])


    const handleSearch = (search) => {


        axios.get('http://localhost:4000/api/employee/search/' + search)
            .then(res => {
                if (res === []) {
                    getData();
                } else {
                    setEmployees(res.data)
                }
            })
            .catch(error => getData())


    }

    return (
        <>
            <div className="input-group m-3 col-xs-4 col-sm-4 col-md-4 col-lg-4">

                <Search handleSearch={handleSearch} />
            </div>

            <div className="row">

                <div className="col-5 m-4 div-main div-with-scroll" >

                    <EmployeeList employees={employees} getData={getData}/>

                </div>

                <div className="col div-main m-4">
                    <NewEmployee getData={getData} />

                </div>
            </div>


            
            
            
            
        </>
    )
}
