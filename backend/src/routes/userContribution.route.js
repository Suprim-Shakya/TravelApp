import { Router } from "express";
import { createUserContribution } from "../controllers/userContribution.controller.js";



const userContributionRouter = Router();

userContributionRouter.route("/add").post(createUserContribution)


export default userContributionRouter