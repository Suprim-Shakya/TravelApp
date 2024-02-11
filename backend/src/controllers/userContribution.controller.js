import { UserContribution } from "../models/userContribution.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createUserContribution = asyncHandler(async (req, res, next) => {
    // const userContribution = new userContribution(req.body);
    // const savedUserContribution = await userContribution.save();
    // return res.status(201).json(new ApiResponse(201, "Details are added successfully!", savedUserContribution))

    // Extract data from request body
    const { imageUrl, name, description, ticketRequired, ticketPrice, restrictions, isVerified } = req.body;

    // Validate data
    if (!imageUrl) return res.status(400).json(new ApiError(400, "ImageUrl is required"));
    if (!name) return res.status(400).json(new ApiResponse(400, "Name is required"));
    
    const existingPlace = await UserContribution.findOne({name})
    if(existingPlace) return res.status(409).json(new ApiError(409, "place with name already exists", existingPlace))

    // Create a new UserContribution object with validated details
    const userContribution = new UserContribution({
        userId: req.user._id,
        imageUrl,
        name: name.toLowerCase(),
        description: description || "No description given",
        ticketRequired: ticketRequired || false,
        ticketPrice,
        restrictions,
        isVerified: isVerified || false
    });

    // Save the user contribution to the database
    const savedUserContribution = await userContribution.save();

    return res.status(201).json(new ApiResponse(201, "Details are added successfully!", savedUserContribution));
})