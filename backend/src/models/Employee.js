const { Schema, model} = require('mongoose');

const EmployeeSchema = Schema({

    idNumber: {
        type: String,
        require: true,
        unique: true
    },

    name: {
        type: String,
        require: true
    },

    lastname: {
        type: String,
        require: true,
    },

    picture: {
        type: String,
        require: false,
        default: "./pictures/cara.jpg"
    },

    phone: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    hiredate: {
        type: Date,
        require: true,
        default: Date.now()
    },

    manager: {
        type: String,
        require : true,
        
    }


})

module.exports=model('Employee', EmployeeSchema)