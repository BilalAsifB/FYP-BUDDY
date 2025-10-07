import mongoose from "mongoose";
import connectDB from "./database/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.error("Server error:", error);
        throw error;
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    })
})
.catch((error) => {
    console.error("Database connection error:", error);
    process.exit(1);
});