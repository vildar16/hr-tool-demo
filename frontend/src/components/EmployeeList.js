import React from 'react'
import { EmployeeCard } from './EmployeeCard'

export const EmployeeList = ({ employees, getData }) => {

    console.log(employees)
    return (
        <ul className='list-group list-group-flush'>
            {
                employees.map((emp) => (
                    <EmployeeCard
                        employee = {emp}
                        getData = {getData}
                        key={emp._id}
                    />
                ))


            }       
            
        </ul>
    )
}
