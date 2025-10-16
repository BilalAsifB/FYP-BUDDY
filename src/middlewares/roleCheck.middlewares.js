import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";

const checkStudentRole = asyncHandler(async (req, _, next) => {
    if  (req.user?.role !== "STUDENT") {
        throw new ApiError(403, "Access denied, students only")
    }
    next()
})

const checkSupervisorRole = asyncHandler(async (req, _, next) => {
    if  (req.user?.role !== "SUPERVISOR") {
        throw new ApiError(403, "Access denied, supervisors only")
    }
    next()
})

export { checkStudentRole, checkSupervisorRole };