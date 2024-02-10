import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) return res.status(401).json(new ApiError(401, "Unauthorized: Missing access token"));

    const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);

    // Check for token expiration
    if (decodedToken.exp < Date.now() / 1000) {
        return res.status(401).json(new ApiError(401, "Unauthorized: Access token expired"));
    }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) return res.status(401).json(new ApiError(401, "Unauthorized: Invalid access token"));
    req.user = user;

    next();
})