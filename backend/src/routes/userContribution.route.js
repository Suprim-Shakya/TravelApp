import { Router } from "express";
import { createUserContribution, deleteUserContribution, getAllUserContribution, getCurrentUserContribution, modifyUserContribution } from "../controllers/userContribution.controller.js";


const userContributionRouter = Router();

userContributionRouter.route("/create").post(createUserContribution)
userContributionRouter.route("/list").get(getAllUserContribution)
userContributionRouter.route("/current").get(getCurrentUserContribution)
userContributionRouter.route("/modify").patch(modifyUserContribution)
userContributionRouter.route("/").delete(deleteUserContribution)

export default userContributionRouter