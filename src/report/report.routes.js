import { Router } from "express"
import { generateCompanyReport } from "./report.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"


const api = Router() 

api.get(
    "/generate", 
    [validateJwt], 
    generateCompanyReport
)

export default api