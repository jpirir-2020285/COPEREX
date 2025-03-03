import { Router } from "express" 
import { remove, save, update, getCompanies } from "./company.controller.js"
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router() 

api.get("/", getCompanies)

api.post(
    "/",
    [validateJwt],
    save
) 

api.put(
    "/update/:id",
    [validateJwt],
    update
) 

api.put(
    "/disable/:id",
    [validateJwt],
    remove
) 

export default api 
