const { fieldValidation } = require('../../middlewares/fieldValidation')
const { check } = require('express-validator');

const checks = [
    check('idNumber', 'The id must be 6 digits').isLength({min: 6, max: 6}),
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('phone', 'Phone is required').isLength({min: 8, max: 8}),
    check('email', 'Email is required').isEmail(),
    check('manager', 'Manager ID is required').isLength({min: 6, max: 6}),
    fieldValidation
]

module.exports = {checks};