import ApiResponse from "../utils/ApiResponse.js"

const baseReply = (req, res) => {
    return res.status(200).json(new ApiResponse(200,"Express + MongoDb working fine."))
}

export {baseReply}