import { UserContribution } from "../models/userContribution.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const listContributions = asyncHandler(async(req, res)=> {
    const data = await UserContribution.find({}, 'name _id')
    const contributions = data.map(contribution => ({
        _id: contribution._id.toString(),
        name: contribution.name
    }))
    return res.status(200).json(new ApiResponse(200, "list retrieved successfully", contributions))
})

export const listContributionsDetails = asyncHandler(async(req, res)=> {
    const data = await UserContribution.find({}, 'name _id')
    return res.status(200).json(new ApiResponse(200, "list retrieved successfully", data))
})