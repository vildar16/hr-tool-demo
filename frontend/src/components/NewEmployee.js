import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



export const NewEmployee = ({ getData }) => {

    const [{ok, msg}, setValidation] = useState({ok: true, msg: ''})

    const [{hiredate}, setDate] = useState({date: new Date()})
    

    const [ {idNumber, name, lastname,
             picture, phone, email, manager}, handleInputChange, reset] = useForm(
        {
            idNumber: '',
            name: '',
            lastname: '',
            phone: '',
            email: '',
            manager: ''} 
    )

    const onChangeDate = (date) =>{
        setDate({hiredate: date});
    }

    const onSubmit = async (e) => {
        e.preventDefault();


        try {
            await axios.post('http://localhost:4000/api/employee/new', {
                idNumber,
                name,
                lastname,
                picture,
                phone,
                email,
                hiredate,
                manager
             })

             reset()
             setValidation({ok: true, errors: {}, msg: ''})
             getData()
        } catch (error) {
            console.log(error)
            setValidation({ok: error.response.data.ok, msg: error.response.data.msg})

                
        }
        
    }

    return (


        <div className="card card-body">
            <h5>Add Employee</h5>
            <hr/>
            <form onSubmit={onSubmit}>

                <h6>ID:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="idNumber"
                        className="form-control"
                        placeholder="ID"
                        onChange={handleInputChange}
                        value={idNumber}
                        autoComplete="off"
                         />
                </div>

                <h6>Name:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={handleInputChange}
                        value={name}
                        autoComplete="off"
                         />
                </div>

                
                <h6>Lastname:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="lastname"
                        className="form-control"
                        placeholder="Last Name"
                        onChange={handleInputChange}
                        value={lastname}
                        autoComplete="off"
                         />
                </div>
                
                <h6>Phone Number:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        value={phone}
                        autoComplete="off"
                         />
                </div>

                <h6>Email:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleInputChange}
                        value={email}
                        autoComplete="off"
                    />
                        
                </div>
                

                <h6>Manager ID:</h6>
                <div className="form-group">
                    <input
                        type="text"
                        name="manager"
                        className="form-control"
                        placeholder="ID Manager"
                        onChange={handleInputChange}
                        value={manager}
                        autoComplete="off"
                         />
                </div>

                <h6>Hired Date:</h6>
                <div className="form-group">
                    <DatePicker
                        className='form-control'
                        selected={hiredate}
                        onChange={onChangeDate}
                         />
                </div>
                
                {(!ok)&&   <div className="alert alert-danger">
                                <n>{msg}</n>...
                            </div>}
                            
                <button type="submit" className="btn btn-success">
                    Submit
                            </button>


            </form>

        </div>
    )
}
