import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import rateLimit from  "express-rate-limit";

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        statusCode: 429,
        message: "Too many accounts created from this IP, please try again after 15 minutes"
    }
})

const router = Router();

router.post("/register",
    registerLimiter,
    registerUser);

export default router;