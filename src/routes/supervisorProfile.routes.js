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

router.route("/supervisor").post(createSupervisorProfile);
router.route("/supervisor").patch(updateSupervisorProfile);
router.route("/supervisor").get(getSupervisorProfile);

export default router;