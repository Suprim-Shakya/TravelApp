import express from "express"
import { baseReply } from "./controllers/base.controllers.js";


const app = express();
app.on("error", error => console.log(`Error occurred on creating express app: ${error}`))


//middlewares
// Middleware to parse form data 
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data
app.use(express.json());

app.route("/").get(baseReply)



export default app