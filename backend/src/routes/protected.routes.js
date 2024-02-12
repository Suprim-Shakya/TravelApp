import { Router } from "express";
import { secretMessage } from "../controllers/secret.controller.js";

const secretRouter = Router();


secretRouter.route("/").get(secretMessage)


export default secretRouter