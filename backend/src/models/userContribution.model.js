import { Schema, model } from "mongoose"


const userContributionSchema = new Schema({
    userId: {
        type: String,
        required: [true, "Id of contributor is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "image is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "A site with same name already exists."]
    },
    location: {
	type: String
    },
    description: {
        type: String,
        default: "No description Given"
    },
    ticketRequired: {
        type: Boolean,
    },
    ticketPrice: {
        type: Number,
    },
    restrictions: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    category: {
        type: String
    }
}, {timestamps: true})



export const UserContribution = model("UserContribution", userContributionSchema)
