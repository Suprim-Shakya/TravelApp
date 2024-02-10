import mongoose from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "first name is required"]
    },
    lastName: {
        type: String,
        required: [true, "last name is required"]
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


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
            firstName: this.firstName,
            lastName: this.lastName,
        },
        process.env.ACCESS_TOKEN_SECRET_KEY, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_PERIOD
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id, //from mongodb
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_PERIOD,
        }
    )
}

const User = mongoose.model("User", userSchema)
export default User