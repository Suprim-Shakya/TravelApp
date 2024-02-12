import moment from "moment-timezone";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!accessToken) return res.status(401).json(new ApiError(401, "Unauthorized: Missing access token"));

    let decodedToken 
    try{
        decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
        // catch token expiration error
        // {
        //     "name": "TokenExpiredError",
        //     "message": "jwt expired",
        //     "expiredAt": "2024-02-11T03:42:22.000Z"
        // }
    
        return res.status(401).json(new ApiError(401, "access token expired", {...error, npt: moment(error.expiredAt).tz('Asia/Kathmandu').format()}))
    }

    // if (decodedToken.exp < Date.now() / 1000) {
    //     return res.status(401).json(new ApiError(401, "Unauthorized: Access token expired"));
    // }

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if (!user) return res.status(401).json(new ApiError(401, "Unauthorized: Invalid access token"));
    req.user = user;

    next();
})