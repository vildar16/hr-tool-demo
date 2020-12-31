import axios from 'axios';
import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";
import { useForm } from '../hooks/useForm';
import { format } from 'timeago.js'
import 'react-datepicker/dist/react-datepicker.css'

export const EmployeePopUp = ({ employee, isOpen, hide, getData }) => {

    const [{ ok, msg }, setValidation] = useState({ ok: true, msg: '' })

    const [{ updatedOk }, setUpdated] = useState({ updatedOk: false })

    



    const [{ idNumber, name, lastname,
        picture, phone, email, manager }, handleInputChange, reset] = useForm(
            {
                idNumber: employee.idNumber,
                name: employee.name,
                lastname: employee.lastname,
                picture: employee.picture,
                phone: employee.phone,
                email: employee.email,
                manager: employee.manager
            }
        )


    const onUpdate = async (e, id) => {

        e.preventDefault()

        try {
            await axios.put('http://localhost:4000/api/employee/edit/' + id, {
                idNumber,
                name,
                lastname,
                picture,
                phone,
                email,
                hiredate: employee.hiredate,
                manager
            })
            setValidation({ ok: true, errors: {}, msg: '' });
            setUpdated({ updatedOk: true })

            update();
        } catch (error) {
            console.log(error)
            setValidation({ ok: error.response.data.ok, msg: error.response.data.msg })


        }

    }

    const update = () => {
        getData()
    }

    const onExit = () => {

        setValidation({ ok: true });
        setUpdated({ updated: true });
        reset();
    }

    const onDelete = async (e, id) => {
        e.preventDefault();
        console.log(id)
        try {
            await axios.delete('http://localhost:4000/api/employee/delete/' + id);
            hide();
            update();

        } catch (error) {
            console.log(error)
        }
    }

   

    return (
        <div>
            <Modal show={isOpen} onHide={hide} onExit={onExit}>
                <Modal.Header>
                    <Modal.Title>{employee.name + " " + employee.lastname}</Modal.Title>
                    <h6>ID:{employee.idNumber}</h6>

                </Modal.Header>

                <Modal.Body>
                    <div className="m-3 divImage" >
                        <img className="imgborder-full" src="./pictures/cara.jpg" width="200" height="200" alt="foto" />
                        <h6>Hired: {format(employee.hiredate)}</h6>
                    </div>

                    <div className="card card-body">
                        <h5>Edit Employee</h5>
                        <hr />
                        <form onSubmit={(e) => onUpdate(e, employee._id)}>

                            <h6>ID:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="idNumber"
                                    className="form-control"
                                    placeholder="ID"
                                    value={idNumber}
                                    onChange={handleInputChange}

                                />
                            </div>

                            <h6>Name:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleInputChange}

                                />
                            </div>


                            <h6>Lastname:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="lastname"
                                    className="form-control"
                                    placeholder="Last Name"
                                    value={lastname}
                                    onChange={handleInputChange}

                                />
                            </div>

                            <h6>Phone Number:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Phone Number"
                                    value={phone}
                                    onChange={handleInputChange}

                                />
                            </div>

                            <h6>Email:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleInputChange}

                                />

                            </div>


                            <h6>Manager ID:</h6>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="manager"
                                    className="form-control"
                                    placeholder="ID Manager"
                                    value={manager}
                                    onChange={handleInputChange}
                                    autoComplete={false}

                                />
                            </div>

                            <h6>Hired Date:</h6>
                            <div className="form-group">
                                <p>{employee.hiredate}</p>
                            </div>


                            {(!ok) && <div className="alert alert-danger">
                                <p>{msg}</p>
                            </div>}
                            {(updatedOk) && <div className="alert alert-info">
                                <p>{"Updated"}</p>
                            </div>}


                            <button type="submit" className="btn btn-success">
                                Update
                            </button>

                            <button onClick={(e) => onDelete(e, employee._id)} className="btn btn-danger ml-2">
                                Delete
                            </button>


                        </form>

                    </div>
                </Modal.Body>



            </Modal>
        </div>
    )
}
