const { Router } = require('express');
const { checks } = require('./helpers/checks')
const { upload } = require('../libs/multerStorage')

const router = Router();

const {getEmployeeById, deleteEmployee, createEmployee,
         editEmployee, getAllEmployees, search} = require('../controllers/employee')

router.get('/get', getAllEmployees);

router.get('/get/:id', getEmployeeById);

router.get('/search/:q', search);

router.delete('/delete/:id', deleteEmployee );

router.put('/edit/:id', checks, editEmployee);

router.post('/new', checks/*[checks, upload.single('picture')]*/, createEmployee );



module.exports = router;