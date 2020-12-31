const { validationResult } = require('express-validator');
const Employee = require('../models/Employee');

const createEmployee = async (req, res)=>{
    const { idNumber,  email, manager  } = req.body;

    
    try {

        let employee = await Employee.findOne({ idNumber })
        
        if(employee){
            return res.status(400).json({
                ok: false,
                msg: 'That id already belongs to a registered employee.'
            })
        }

        employee = await Employee.findOne({ email })

        if(employee){
            return res.status(400).json({
                ok: false,
                msg: 'That email is already registered.'
            })
        }

        employee = await Employee.findOne({ idNumber: manager })

        if(!employee){
            return res.status(400).json({
                ok: false,
                msg: 'That id manager is incorrect.'
            })
        }

        employee = await Employee.findOne({ email })
        
        employee = new Employee(req.body)
    
        await employee.save()
    
        res.status(201).json({ 
            ok: true,
            msg: "register",
            employee
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }
}


const deleteEmployee = async (req, res)=>{

    

    try {

        await Employee.findByIdAndDelete(req.params.id)
        res.status(200).json({
            ok: true,
            msg: `Employee deleted.`
        })
        
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }
}

const editEmployee = async (req, res)=>{

    const {idNumber, name, lastname, picture, phone, email, hiredate, manager } = req.body;
    console.log(req.body)

    try {

        let employee = await Employee.findOne({ idNumber })

        const curId = req.params.id
        

        
        if(employee){

            if(curId!=employee._id){
                return res.status(400).json({
                    ok: false,
                    msg: 'that id already belongs to a registered employee.'
                })
            }
        }

        employee = await Employee.findOne({ email })

        if(employee){


            if(curId!=employee._id){
                
                return res.status(400).json({
                    ok: false,
                    msg: 'That email is already registered.'
                })
            }
        }

        employee = await Employee.findOne({ idNumber: manager })

        if(!employee){


            
                
                return res.status(400).json({
                    ok: false,
                    msg: 'That id manager is incorrect.'
                })
            
        }

        
        await Employee.findOneAndUpdate( {_id: req.params.id}, {
            idNumber,
            name,
            lastname, 
            picture,
            phone,
            email,
            hiredate,
            manager

        } )
    
        res.status(201).json({ 
            ok: true,
            msg: "Updated",
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }
    
}

const getAllEmployees = async (req, res)=>{


    try {
        
        const employees = await Employee.find().sort({name: 1})
    
        res.json({
            ok: true,
            employees
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }
}

const getEmployeeById = async (req, res)=>{

    try {

        const employee = await Employee.findById(req.params.id)
    
        res.json({
            ok: true,
            employee
        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }

}

const search = async (req, res)=>{

    const query = req.params.q;
    

    try {

        const employees = Employee.find({ $or: [{ name: { $regex: query, $options: 'i' }},
                                                { lastname: { $regex: query, $options: 'i' }},
                                                { idNumber: { $regex: query, $options: 'i'}}] }, 
            function(err, result) {
            if (err) {
              res.send(err);
            } else {
              res.status(200).json(result);
            }
          }).sort({name: 1})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Something went wrong...'

        })
        
    }
}

module.exports = {
    createEmployee, deleteEmployee,
    editEmployee, getEmployeeById,
    getAllEmployees, search
}