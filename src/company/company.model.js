
import { Schema, model } from 'mongoose'

const companySchema = Schema(
    {  
        name: {
            type: String,
            required: [true, 'Company name is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        description: {
            type: String,
            required: [true, 'description is required'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        category: {
            type: String,
            required: [true, 'category is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        level: {
            type: String,
            required: true,
            enum: ['HIGH', 'MEDIUM', 'LOW']
        },
        contact: {
            type: String,
            required: [true, 'contact is required'],
            maxLength: [25, `Can't be overcome 25 characters`],
        },
        yearsOfExperience: {
            type: String,
            required: [true, 'years of experience is required']
        },
        createdDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: Boolean,
            default: true
        }
    }
)

export default model('Company', companySchema)