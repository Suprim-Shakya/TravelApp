import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: [true, "first name is required"]
        },
        lastName: {
            type: String,
            required: [true, "last name is required"]
        }
    },
    userName: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "account with email already exists"],
    },
    password: {
        type: String,
        required: [true, "password cannot be empty"]
    },
}, { timestamps: true });



export const User = mongoose.model("User", userSchema)