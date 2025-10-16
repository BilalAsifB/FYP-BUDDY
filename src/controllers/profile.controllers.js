import { Student } from "../models/student.models"
import { ApiError } from "../utils/ApiError"
import { asyncHandler } from "../utils/asyncHandler"
import { ApiResponse } from "../utils/ApiResponse"


const createStudentProfile = asyncHandler(async (requestAnimationFrame, res) => {
    const userId = req.user._id;
    
    const {
        studentId, batch, department, cgpa, projectTitle, projectDomain,
        projectIdea, projectTechStack, interests, skills 
    } = requestAnimationFrame.body

    // validate if required fields are present
    if ([studentId, batch, department, cgpa, interests, skills].some(
        (field) => !field || field?.toString().trim() === "")) {
            throw new ApiError(400, "All fields are required except project details")
    }

    // validate studentId format
    const studentIdRegex = /^\d{2}[KI]-\d{4}$/; // Example: xxK-xxxx or xxI-xxxx
    if (!studentIdRegex.test(studentId.uppercase().trim())) {
        throw new ApiError(400, "Student ID must be in the format xxK-xxxx or xxI-xxxx")
    }

    // validate batch range
    const minBatcch = new Date().getFullYear() - 3;
    const maxBatch = new Date().getFullYear() - 6;
    if (batch < maxBatch || batch > minBatcch) {
        throw new ApiError(400, `Batch must be between ${maxBatch} and ${minBatcch}`)
    }
    
    // validate department
    const validDepartments = ["CS", "CYS", "AI", "DS", "SE"];
    if (!validDepartments.includes(department)) {
        throw new ApiError(400, `Department must be one of: ${validDepartments.join(", ")}`)
    }

    // validate cgpa range
    if (cgpa < 2.0 || cgpa > 4.0) {
        throw new ApiError(400, "CGPA must be between 2.0 and 4.0")
    }
    
    // validate interests and skills arrays
    if (!Array.isArray(interests) || interests.length === 0) {
        throw new ApiError(400, "Interests must be a non-empty array")
    }
    if (!Array.isArray(skills) || skills.length === 0) {
        throw new ApiError(400, "Skills must be a non-empty array")
    }

    // validate project details if any project field is provided
    if (projectTitle || projectDomain || projectIdea || projectTechStack) {
        if (!projectTitle || projectTitle.trim() === "") {
            throw new ApiError(400, "Project Title is required if any project detail is provided")
        }
        if (projectTitle.length > 30) {
            throw new ApiError(400, "Project Title cannot exceed 30 characters")
        }
        if (!projectDomain || projectDomain.trim() === "") {
            throw new ApiError(400, "Project Domain is required if any project detail is provided")
        }
        if (projectDomain.length > 30) {
            throw new ApiError(400, "Project Domain cannot exceed 30 characters")
        }
        if (!projectIdea || projectIdea.trim() === "") {
            throw new ApiError(400, "Project Idea is required if any project detail is provided")
        }
        if (projectIdea.length > 300) {
            throw new ApiError(400, "Project Idea cannot exceed 300 characters")
        }
        if (!Array.isArray(projectTechStack) || projectTechStack.length === 0) {
            throw new ApiError(400, "Project Tech Stack must be a non-empty array if provided")
        }
    }
    
    // proceed to create student profile
    const studentProfile = await Student.create({
        userId,
        studentId: studentId.uppercase().trim(),
        batch, department, cgpa,
        projectTitle: projectTitle?.trim() || "",
        projectDomain: projectDomain?.trim() || "",
        projectIdea: projectIdea?.trim() || "",
        projectTechStack: projectTechStack || [],
        interests, skills,
        hasTeam: false,
        teamId: null  
    })

    const profileCreated = await Student.findById(studentProfile._id)

    // check if student profile creation was successful
    if (!profileCreated) {
        throw new ApiError(500, "Failed to create student profile")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(201, profileCreated, "Student profile created successfully")
    )
}) 

const updateStudentProfile = asyncHandler(async (req, res) => {
    const studentProfile = req.studentProfile;

    const {
        batch, department, cgpa, projectTitle, projectDomain,
        projectIdea, projectTechStack, interests, skills
    } = req.body

    // Validate batch if provided
    if (batch !== undefined) {
        const minBatch = new Date().getFullYear() - 3;
        const maxBatch = new Date().getFullYear() - 6;
        if (batch < maxBatch || batch > minBatch) {
            throw new ApiError(400, `Batch must be between ${maxBatch} and ${minBatch}`)
        }
        studentProfile.batch = batch;
    }

    // Validate department if provided
    if (department !== undefined) {
        const validDepartments = ["CS", "CYS", "AI", "DS", "SE"];
        if (!validDepartments.includes(department)) {
            throw new ApiError(400, `Department must be one of: ${validDepartments.join(", ")}`)
        }
        studentProfile.department = department;
    }

    // Validate cgpa if provided
    if (cgpa !== undefined) {
        if (cgpa < 2.0 || cgpa > 4.0) {
            throw new ApiError(400, "CGPA must be between 2.0 and 4.0")
        }
        studentProfile.cgpa = cgpa;
    }

    // Validate interests if provided
    if (interests !== undefined) {
        if (!Array.isArray(interests) || interests.length === 0) {
            throw new ApiError(400, "Interests must be a non-empty array")
        }
        studentProfile.interests = interests;
    }

    // Validate skills if provided
    if (skills !== undefined) {
        if (!Array.isArray(skills) || skills.length === 0) {
            throw new ApiError(400, "Skills must be a non-empty array")
        }
        studentProfile.skills = skills;
    }

    // Validate and update project details if provided
    if (projectTitle !== undefined) {
        if (projectTitle.trim() === "") {
            throw new ApiError(400, "Project Title cannot be empty")
        }
        if (projectTitle.length > 30) {
            throw new ApiError(400, "Project Title cannot exceed 30 characters")
        }
        studentProfile.projectTitle = projectTitle.trim();
    }

    if (projectDomain !== undefined) {
        if (projectDomain.trim() === "") {
            throw new ApiError(400, "Project Domain cannot be empty")
        }
        if (projectDomain.length > 30) {
            throw new ApiError(400, "Project Domain cannot exceed 30 characters")
        }
        studentProfile.projectDomain = projectDomain.trim();
    }

    if (projectIdea !== undefined) {
        if (projectIdea.trim() === "") {
            throw new ApiError(400, "Project Idea cannot be empty")
        }
        if (projectIdea.length > 300) {
            throw new ApiError(400, "Project Idea cannot exceed 300 characters")
        }
        studentProfile.projectIdea = projectIdea.trim();
    }

    if (projectTechStack !== undefined) {
        if (!Array.isArray(projectTechStack) || projectTechStack.length === 0) {
            throw new ApiError(400, "Project Tech Stack must be a non-empty array")
        }
        studentProfile.projectTechStack = projectTechStack;
    }

    // Save the updated profile
    const updatedProfile = await studentProfile.save();

    return res.status(200).json(
        new ApiResponse(200, updatedProfile, "Student profile updated successfully")
    )
})

const getStudentProfile = asyncHandler(async (req, res) => {
    const studentProfile = req.studentProfile;

    return res.status(200).json(
        new ApiResponse(200, studentProfile, "Student profile retrieved successfully")
    )
})

export {
    createStudentProfile,
    updateStudentProfile,
    getStudentProfile
}