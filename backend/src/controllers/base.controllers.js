import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const baseReply = (req, res) => {
    return res.status(200).json(new ApiResponse(200,"Express + MongoDb working fine."))
}
const baseApiReply = (req, res) => {
    return res.status(200).json(new ApiResponse(200,"Express + MongoDb + v1 Api working fine."))
}
const endpointNotFound = (req, res) => {
    return res.status(404).json(new ApiError(404, "The endpoint doesn't exist"))
}

export {baseReply, baseApiReply, endpointNotFound}