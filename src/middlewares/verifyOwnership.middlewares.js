import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Student } from "../models/student.models.js";
import { Supervisor } from "../models/supervisor.models.js";

export const verifyStudentProfileOwnership = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    // Find supervisor profile by userId
    const studentProfile = await Student.findOne({ userId });

    if (!studentProfile) {
        throw new ApiError(404, "Student profile not found");
    }

    // Verify authorization - user can only access their own profile
    if (studentProfile.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to access this profile");
    }

    // Attach supervisor profile to request object for use in controllers
    req.studentProfile = studentProfile;

    next();
});

export const verifySupervisorProfileOwnership = asyncHandler(async (req, res, next) => {
    const userId = req.user._id;

    // Find supervisor profile by userId
    const supervisorProfile = await Supervisor.findOne({ userId });

    if (!supervisorProfile) {
        throw new ApiError(404, "Supervisor profile not found");
    }

    // Verify authorization - user can only access their own profile
    if (supervisorProfile.userId.toString() !== userId.toString()) {
        throw new ApiError(403, "You are not authorized to access this profile");
    }

    // Attach student profile to request object for use in controllers
    req.supervisorProfile = supervisorProfile;

    next();
});