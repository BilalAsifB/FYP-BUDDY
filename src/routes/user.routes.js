import { Router } from "express";
import { refreshAccessToken, registerUser, loginUser, logOutUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import rateLimit from  "express-rate-limit";

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        statusCode: 429,
        message: "Too many accounts created from this IP, please try again after 15 minutes"
    }
})

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        statusCode: 429,
        message: "Too many login attempts from this IP, please try again after 15 minutes"
    }
});

const router = Router();

router.route("/register").post(
    registerLimiter,
    registerUser
); 

router.route("/login").post(
    loginLimiter,
    loginUser
)

// secured routes
router.route("/logout").post(
    verifyJWT,
    logOutUser
)

router.route("/refresh-token").post(
    refreshAccessToken
)

export default router;