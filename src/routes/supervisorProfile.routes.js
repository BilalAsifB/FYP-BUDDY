import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    createSupervisorProfile,
    getSupervisorProfile,
    updateSupervisorProfile
} from "../controllers/profile.controllers.js";


const router = Router();

// protect routes
router.use(verifyJWT);

router.route("/student").post(createSupervisorProfile);
router.route("/student").patch(updateSupervisorProfile);
router.route("/student").get(getSupervisorProfile);

export default router;