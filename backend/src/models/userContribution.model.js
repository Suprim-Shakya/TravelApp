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
    description: {
        type: String,
        default: "No description Given"
    },
    ticketRequired: {
        type: Boolean,
    },
    ticketPrice: {
        type: Number,
        validate: {
            validator: function(value) {
                // Custom validation to ensure ticketPrice is provided when ticketRequired is true
                return !this.ticketRequired || (this.ticketRequired && value != null);
            },
            message: "Ticket price is required when ticket is required"
        }
    },
    restrictions: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})



export const UserContribution = model("UserContribution", userContributionSchema)