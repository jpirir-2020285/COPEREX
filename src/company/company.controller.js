import Company from "./company.model.js" 

export const save = async (req, res) => {
    const data = req.body 
    try {
        const company = new Company(data) 

        await company.save() 
        return res.send({
            success: true,
            message: `${company.name} saved successfully`,
            company
        }) 
    } catch (err) {
        console.error(err) 
        return res.status(500).send({
            success: false,
            message: "General error when adding company",
            err
        }) 
    }
} 

export const update = async (req, res) => {
    try {
        const id = req.params.id 
        const data = req.body 
        const update = await Company.findByIdAndUpdate(id, data, { new: true }) 

        if (data.status) return res.status(403).send({ message: 'Status not editable' }) 

        if (!update) {
            return res.status(404).send({
                success: false,
                message: "Company not found"
            }) 
        }

        return res.send({
            success: true,
            message: "Company updated successfully",
            update
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

export const getCompanies = async (req, res) => {
    try {
        let { search, orderBy, order } = req.body
        let filter = { status: true }

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } }, 
                { category: { $regex: search, $options: "i" } }
            ]  
        }

        let sortOption = {}  
        if (orderBy === "yearsOfExperience") {
            sortOption.yearsOfExperience = order === "ascending" ? 1 : -1 
        } else if (orderBy === "name") {
            sortOption.name = order === "ascending" ? 1 : -1 
        }

        const companies = await Company.find(filter).sort(sortOption)  

        return res.send({
            success: true,
            message: "Companies retrieved successfully",
            companies
        })  

    } catch (err) {
        console.error(err)  
        return res.status(500).send({
            success: false,
            message: "General error retrieving companies",
            err
        })  
    }
} 
