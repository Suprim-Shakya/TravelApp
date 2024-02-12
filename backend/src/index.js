import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";


dotenv.config({path: "./.env"});

async function startServer() {
    try{
        console.log('\x1b[35m',`[index] Initiating Database Connection`);
        await connectDB();
        app.listen(process.env.PORT, ()=> {
            console.log('\x1b[35m',`[index] Initiating Server`);
            console.log('\x1b[32m',`[index] Server is running at http://localhost:${process.env.PORT}`);
        });
    }
    catch(error) {
        console.error('\x1b[31m',`[index] Failed to start the server due to MongoDB error: { ${error} }`);
        process.exit(1);
    }
};

startServer();