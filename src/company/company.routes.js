import { Router } from "express" 
import { save, update, getCompanies } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"
import { addCompanyValidator, updateCompanyValidator } from "../../helpers/validators.js"

const api = Router() 

api.get("/", getCompanies)

api.post(
    "/",
    [validateJwt, addCompanyValidator],
    save
) 

api.put(
    "/update/:id",
    [validateJwt, updateCompanyValidator],
    update
) 


export default api 
