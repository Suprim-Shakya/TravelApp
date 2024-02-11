import { Router } from "express";
import { createUserContribution, getAllUserContribution, getCurrentUserContribution } from "../controllers/userContribution.controller.js";


const userContributionRouter = Router();

userContributionRouter.route("/create").post(createUserContribution)
userContributionRouter.route("/list").get(getAllUserContribution)
userContributionRouter.route("/current").get(getCurrentUserContribution)

export default userContributionRouter