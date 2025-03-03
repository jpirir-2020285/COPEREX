import XlsxPopulate from "xlsx-populate" 
import Company from "../company/company.model.js" 
import fs from "fs" 
import path from "path" 
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

export const generateCompanyReport = async (req, res) => {
    try {
        const companies = await Company.find({ status: true }) 

        if (companies.length === 0) {
            return res.status(404).send({
                success: false,
                message: "There are no registered companies"
            }) 
        }

        const workbook = await XlsxPopulate.fromBlankAsync() 
        const sheet = workbook.sheet(0) 

        const headers = ["Nombre", "Descripción", "Categoría", "Nivel", "Contacto", "Años de Experiencia", "Fecha de Creación"] 
        headers.forEach((header, index) => {
            sheet.cell(1, index + 1).value(header).style({
                bold: true,
                horizontalAlignment: "center"
            }) 
        }) 

        companies.forEach((company, rowIndex) => {
            sheet.cell(rowIndex + 2, 1).value(company.name) 
            sheet.cell(rowIndex + 2, 2).value(company.description) 
            sheet.cell(rowIndex + 2, 3).value(company.category) 
            sheet.cell(rowIndex + 2, 4).value(company.level) 
            sheet.cell(rowIndex + 2, 5).value(company.contact) 
            sheet.cell(rowIndex + 2, 6).value(company.yearsOfExperience) 
            sheet.cell(rowIndex + 2, 7).value(company.createdDate.toISOString().split("T")[0]) 
        }) 

        const reportsDir = path.join(__dirname, "./reports") 
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true }) 
        }

        const filePath = path.join(reportsDir, "CompanyReport.xlsx") 
        await workbook.toFileAsync(filePath) 

        return res.send({
            success: true,
            message: "Report generated successfully",
            filePath: `/reports/CompanyReport.xlsx`
        }) 

    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: "General error",
            err
        })
    }
} 
