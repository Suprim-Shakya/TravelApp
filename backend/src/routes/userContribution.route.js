import { Router } from "express";
import { createUserContribution, getAllUserContribution } from "../controllers/userContribution.controller.js";


const userContributionRouter = Router();

userContributionRouter.route("/create").post(createUserContribution)
userContributionRouter.route("/list").get(getAllUserContribution)

export default userContributionRouter