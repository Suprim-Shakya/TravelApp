import ApiError from "./ApiError";

function asyncHandler(func) {
    return function (req, res) {

        Promise
            .resolve(func(req, res))
            .catch(
                (error) => {
                    console.log(`Async handler error: ${error}`);
                    // next(error); 
                    res.status(500).json(new ApiError(500, "Internal server error", error))
                }
            );
    }
};

export default asyncHandler