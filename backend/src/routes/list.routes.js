import express from "express";
import { listContributions,listContributionsDetails } from "../controllers/list.controller.js";

const listRouter = express.Router()

listRouter.route("/contribution/id").get(listContributions)
listRouter.route("/contribution").get(listContributionsDetails)

export default listRouter