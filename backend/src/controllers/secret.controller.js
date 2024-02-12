import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const secretMessage = asyncHandler(async(req, res, next) => {
    return res.status(200).json(new ApiResponse(200, "this is a secret message shown to verified individual", req.user))
})