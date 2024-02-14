import { Router } from "express";
import { createUserContribution, deleteUserContribution, getUserContribution, getCurrentUserContribution, modifyUserContribution, getAllContribution, getAllContributionName } from "../controllers/userContribution.controller.js";
import upload from "../middlewares/multer.middleware.js";


const userContributionRouter = Router();

userContributionRouter.route("/").post(upload.single("placeImage"),createUserContribution)
userContributionRouter.route("/").get(getUserContribution)
userContributionRouter.route("/all").get(getAllContribution)
userContributionRouter.route("/id").get(getAllContributionName)
userContributionRouter.route("/current").get(getCurrentUserContribution)
userContributionRouter.route("/").patch(upload.single("placeImage"),modifyUserContribution)
userContributionRouter.route("/").delete(deleteUserContribution)

export default userContributionRouter