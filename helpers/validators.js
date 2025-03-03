import { body } from "express-validator"

export const loginValidator = [
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8})
]

