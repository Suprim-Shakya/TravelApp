import express from "express";
import { listContributions } from "../controllers/list.controller.js";

const listRouter = express.Router()

listRouter.route("/contribution").get(listContributions)

export default listRouter