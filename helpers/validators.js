import { body } from "express-validator"

export const loginValidator = [
    body('password', 'Password cannot be empty').notEmpty().isStrongPassword().withMessage('The password must be strong').isLength({min: 8})
]

export const addCompanyValidator = [
    body("name", "Company name cannot be empty").notEmpty().isLength({ max: 25 }).withMessage("Name cannot exceed 25 characters"),
    body("description", "Description is required").notEmpty().isLength({ max: 100 }).withMessage("Description cannot exceed 100 characters"),
    body("category", "Category is required").notEmpty().isLength({ max: 25 }).withMessage("Category cannot exceed 25 characters"),
    body("level").notEmpty().withMessage("Level is required").isIn(["HIGH", "MEDIUM", "LOW"]).withMessage("Level must be HIGH, MEDIUM, or LOW"),
    body("contact", "Contact is required").notEmpty().withMessage("Contact must be a valid email or phone number"),
    body("yearsOfExperience", "Years of experience is required and must be a number").notEmpty().withMessage("Must be a valid number")
]

export const updateCompanyValidator = [
    body("name", "Company name cannot be empty").notEmpty().isLength({ max: 25 }).withMessage("Name cannot exceed 25 characters"),
    body("description", "Description is required").notEmpty().isLength({ max: 100 }).withMessage("Description cannot exceed 100 characters"),
    body("category", "Category is required").notEmpty().isLength({ max: 25 }).withMessage("Category cannot exceed 25 characters"),
    body("contact", "Contact is required").notEmpty().withMessage("Contact must be a valid email or phone number")
]
