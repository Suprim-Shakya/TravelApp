//save received file from user in temp storage at own server and then
// send to cloudinary for remote storage and add link to mongodb
//then delete from temp folder

import { v2 as cloudinary } from "cloudinary"
import fs from "node:fs"
import ApiError from "./ApiError.js";


const uploadOnCloudinary = async (localFilePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    try {
        if (!localFilePath) return null
        //upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded successfully
        console.log(`File has been uploaded on cloudinary successfully, \n ${response.url}`)
        return response

    } catch (error) {
        console.error(`Couldn't upload file into cloudinary ${error}`)
        return null;
    } 
    finally {
        fs.unlinkSync(localFilePath) // now remove the locally saved temp file as the upload operation got failed or succedded 
    }
}

const deleteFromCloudinary = async (fileURL) => {
    try {

        if(!fileURL) return null

        const parts = fileURL.split("/");
        const publicId = parts[parts.length -1].split(".")[0];
        console.log(publicId)
        const response = await cloudinary.api.delete_resources([publicId])
        console.log(response)

    } catch(error) {
        throw new ApiError("error occurred while removing old asset")
    }
}

export { uploadOnCloudinary, deleteFromCloudinary}


