import { UserContribution } from "../models/userContribution.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createUserContribution = asyncHandler(async (req, res, next) => {
    // const userContribution = new userContribution(req.body);
    // const savedUserContribution = await userContribution.save();
    // return res.status(201).json(new ApiResponse(201, "Details are added successfully!", savedUserContribution))

    // Extract data from request body


    const imageLocalPath = req.file?.path;

    if (!imageLocalPath) return res.status(400).json(new ApiError(400, "Image is required"));

    const { name, description, ticketRequired, ticketPrice, restrictions, isVerified } = req.body;

    // Validate data
    if (!name) return res.status(400).json(new ApiResponse(400, "Name is required"));

    const existingPlace = await UserContribution.findOne({ name })
    if (existingPlace) return res.status(409).json(new ApiError(409, "place with name already exists", existingPlace))

    const image = await uploadOnCloudinary(imageLocalPath)
    // Create a new UserContribution object with validated details
    const userContribution = new UserContribution({
        userId: req.user._id,
        imageUrl: image?.url,
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


// export const deleteUserContribution = asyncHandler(async (req , res) => {
//     const initiatorUser = req.user._id

//     const {contributedPlace} = req.body
// })

export const getAllUserContribution = asyncHandler(async (req, res) => {
    
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 5;
    if (isNaN(page) || page < 1) {
        return res.status(400).json(new ApiError(400, 'Invalid page number. Page must be a positive integer.'))
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
        return res.status(400).json(new ApiError(400, 'Invalid limit value. Limit must be a positive integer between 1 and 100.'))
    }

    const count = await UserContribution.countDocuments()
    // If no places are found, return a 404 Not Found response
    if (count === 0) {
        return res.status(404).json(new ApiResponse(404, "No places found"));
    }



    const totalPages = Math.ceil(count / limit);
    const hasNextPage = page < totalPages;

    if (page > totalPages) {
        return res.json(new ApiResponse(200, "No items found on this page", { userContribution: [], pageInfo: { totalItems: count, totalPages, currentPage: page, hasNextPage: false } }));
    }

    const userContribution = await UserContribution.find()
        .skip((page - 1) * limit)
        .limit(limit);

    const responseData = {
        userContribution,
        pageInfo: {
            totalItems: count,
            totalPages,
            currentPage: page,
            hasNextPage,
        }
    }

    return res.json(new ApiResponse(200, "Places retrieved successfully", responseData));
})


export const getCurrentUserContribution = asyncHandler(async (req, res) => {
    const currentUser = req.user._id;

    const retrievedPlaces = await UserContribution.find({
        userId: currentUser
    })

    if (retrievedPlaces.length === 0) return res.status(404).json(new ApiError(400, "No contributions found for the current user"));

    return res.status(200).json(new ApiResponse(200, "Current user's contributions retrieved successfully", retrievedPlaces))
})


export const modifyUserContribution = asyncHandler(async (req, res) => {
    const { _id, name, description, ticketRequired, ticketPrice, restrictions } = req.body;

    // Check if ID is provided
    if (!_id) {
        return res.status(400).json(new ApiResponse(400, "Item ID is required"));
    }

    // Find the item to be modified by ID
    const itemToModify = await UserContribution.findById(_id);

    // Check if the item exists
    if (!itemToModify) {
        return res.status(404).json(new ApiResponse(404, "Item not found"));
    }

    // Check if the current user is authorized to modify the contribution
    if (itemToModify.userId !== req.user._id) {
        return res.status(403).json(new ApiResponse(403, "Unauthorized: You do not have permission to modify this contribution"));
    }

    const imageLocalPath = req.file.path;
    let image

    if (imageLocalPath) {
        image = await uploadOnCloudinary(imageLocalPath)
    }

    // Update the item's fields with provided data
    itemToModify.imageUrl = image?.url || itemToModify.imageUrl;
    itemToModify.name = name || itemToModify.name;
    itemToModify.description = description || itemToModify.description;
    itemToModify.ticketRequired = ticketRequired ?? itemToModify.ticketRequired;
    itemToModify.ticketPrice = ticketPrice ?? itemToModify.ticketPrice;
    itemToModify.restrictions = restrictions || itemToModify.restrictions;
    itemToModify.isVerified = false;

    // // Extract data from request body
    // const newData = { imageUrl, name, description, ticketRequired, ticketPrice, restrictions, isVerified };

    // // Update the item's fields with provided data
    // for (const key in newData) {
    //     if (newData[key] !== undefined) {
    //         itemToModify[key] = newData[key];
    //     }
    // }

    // Save the modified item
    const modifiedItem = await itemToModify.save();

    // Send the modified item as a response
    return res.status(200).json(new ApiResponse(200, "Item modified successfully", modifiedItem));
});


export const deleteUserContribution = asyncHandler(async (req, res) => {
    // Extract the contribution ID from the request parameters
    const { _id } = req.query;

    // Check if the ID is provided
    if (!_id) return res.status(400).json(new ApiResponse(400, "Contribution ID is required"));

    // Find the contribution by ID
    const contribution = await UserContribution.findById(_id);

    // Check if the contribution exists
    if (!contribution) return res.status(404).json(new ApiResponse(404, "Contribution not found"));

    // Check if the current user is authorized to delete the contribution
    if (contribution.userId.toString() !== req.user._id.toString()) return res.status(403).json(new ApiResponse(403, "Unauthorized: You do not have permission to delete this contribution"));

    // Delete the contribution
    await contribution.deleteOne({ _id });

    // Send a success response
    return res.status(200).json(new ApiResponse(200, "Contribution deleted successfully", contribution));
});