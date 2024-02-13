import ApiError from "./ApiError.js";

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            console.error("Async Handler Error: ", error);
            res.status(500).json(new ApiError(500, "An unexpected error occurred."));
        });
    };
};

export default asyncHandler;