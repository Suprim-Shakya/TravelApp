import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js"
import bcryptjs from "bcryptjs"
import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";



export const register = asyncHandler(async(req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;

    const requiredFields = ['firstName', 'lastName', 'userName', 'email', 'password'];
    const missingOrEmptyFields = requiredFields.filter(field => !(field in req.body) || req.body[field]?.trim() == "");

    if (missingOrEmptyFields.length > 0) {
        const errorMessage = `Required field ${missingOrEmptyFields.join(", ")} ${missingOrEmptyFields.length === 1 ? 'is' : 'are'} missing or empty.`;
        return res.status(400).json(new ApiError(400, errorMessage));
    }

    if (password.length < 8) {
        return res.status(400).json(
            new ApiError(400, "Password must be at least 8 characters long")
        );
    }

    const existingUser = await User.findOne({
        $or: [{ userName }, { email }]
    }).select("-password")

    if (existingUser?.userName === userName) {
        return res.status(409).json(new ApiError(409, "userName already exists"))
    } else if (existingUser?.email === email) {
        return res.status(409).json(new ApiError(409, "email is already used"))
    }

    const hashedPassword = bcryptjs.hashSync(password)

    const newUser = await User.create({
        firstName,
        lastName,
        userName: userName.toLowerCase(),
        email,
        password: hashedPassword,
    })


    return res.status(200).json(new ApiResponse(200, "signup successful", { userName: newUser.userName, email: newUser.email, userId: newUser._id }))
})


export async function generateTokens(userId) {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }) // do not give error on missing other required fields

        return accessToken

    }
    catch (error) {
        throw new Error("Something went wrong when generating access and refresh token: " + error.message);
    }
}


export const login = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    if (!userName && !email) return res.status(400).json(new ApiError(400, "Email or username is required"));

    const user = await User.findOne({
        $or: [{ userName }, { email }]
    });
    if (!user) return res.status(400).json(new ApiError(400, "User doesn't exist"));

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) return res.status(400).json(new ApiError(400, "Password is incorrect"));

    const accessToken  = await generateTokens(user._id);

    return res.status(200).cookie("accessToken", accessToken, { httpOnly: true, secure: true }).json(
            new ApiResponse(200, "LoginSuccessful", { userId: user._id, accessToken, userName })
        );
});


