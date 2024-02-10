import { Schema, model } from "mongoose"


const userContributionSchema = new Schema({
    imageUrl: {
        type: String,
        required: [true, "image is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "A site with same name already exists."]
    },
    description: {
        type: String,
    },
    ticketRequired: {
        type: Boolean,
    },
    ticketPrice: {
        type: Number,
    },
    restrictions: {
        type: String,
    }
})



export const userContribution = model(userContribution, userContributionSchema)