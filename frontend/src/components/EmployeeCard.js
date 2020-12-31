import React, { useState } from 'react'
import '../styles.css'
import Modal from "react-bootstrap/Modal";
import { EmployeePopUp } from './EmployeePopUp';




export const EmployeeCard = ({ employee, getData }) => {


    const [isOpen, setIsOpen] = useState(false)

    const hide = () => {
        
        setIsOpen(false);
    }

    const show = () => {
        setIsOpen(true);
    }

    return (


        <div className="card ms-10 mb-2" style={{ maxWidth: 800 }} onClick={show} >
            <div className="row" >
                <div className="col-md-3 m-1" >
                    <img className="imgborder" src="./pictures/cara.jpg" width="100" height="100" alt="foto" />
                </div>
                <div className="col-md-8">
                    <div className="card-body" >
                        <h5 className="card-title">{"ID: " + employee.idNumber}</h5>
                        <p className="card-text"> {`${employee.name} ${employee.lastname}`} </p>

                    </div>
                </div>

            </div>

            <EmployeePopUp   
                employee={employee} 
                isOpen={isOpen}
                hide={hide} 
                getData={getData}
                />

        </div>
    )
}
