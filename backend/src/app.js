import express from "express"
import { baseReply } from "./controllers/base.controllers.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.on("error", error => console.log(`Error occurred on creating express app: ${error}`))


//handle CORS access
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


//middlewares 
app.use(express.urlencoded({ extended: true })); //parse form data 
app.use(express.json());//parse JSON data
app.use(cookieParser())//parse cookies(access token)


//routes
app.route("/").get(baseReply)
// app.route("/api/v1/auth/register").post(register)

import authRoutes from "./routes/auth.routes.js";
app.use("/api/v1/auth", authRoutes)


export default app