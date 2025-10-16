import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyStudentProfileOwnership } from "../middlewares/verifyOwnership.middlewares.js";
import {
    createStudentProfile,
    getStudentProfile,
    updateStudentProfile
} from "../controllers/profile.controllers.js";


const router = Router();

// protect routes
router.use(verifyJWT);

router.route("/student").post(
    createStudentProfile
);
router.route("/student").patch(
    verifyStudentProfileOwnership,
    updateStudentProfile
);
router.route("/student").get(
    verifyStudentProfileOwnership,
    getStudentProfile
);

export default router;