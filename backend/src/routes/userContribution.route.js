import { Router } from "express";
import { createUserContribution, deleteUserContribution, getAllUserContribution, getCurrentUserContribution, modifyUserContribution } from "../controllers/userContribution.controller.js";


const userContributionRouter = Router();

userContributionRouter.route("/").post(createUserContribution)
userContributionRouter.route("/").get(getAllUserContribution)
userContributionRouter.route("/current").get(getCurrentUserContribution)
userContributionRouter.route("/").patch(modifyUserContribution)
userContributionRouter.route("/").delete(deleteUserContribution)

export default userContributionRouter