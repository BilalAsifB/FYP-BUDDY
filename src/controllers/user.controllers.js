import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    const {
        name, email, gender, password, role
    } = req.body


    // validate if all fields are provided
    if ([name, email, gender, password, role].some(
        (field) => !field || field?.trim() === "" )) {
            throw new ApiError(400, "All fields are required")
    }

    // email validation: must be a @nu.edu.pk email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/;
    if (!emailRegex.test(email.toLowerCase())) {
        throw new ApiError(400, "Email must be a valid @nu.edu.pk email address")
    }

    // password validation: min 8 characters, one capital, one special char, alphanumeric
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password.trim())) {
        throw new ApiError(400, "Password does not meet requirements. It must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.");
    }

    // check if user already exists
    const existingUser = await User.findOne({
        email: email.toLowerCase()
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    // create user
    const user = await User.create({
        name: name.trim(), 
        email: email.toLowerCase().trim(),
        gender,
        password: password.trim(), 
        role
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    // check if user creation was successful
    if (!userCreated) {
        throw new ApiError(500, "User creation failed")
    }

    // return response
    return res.status(201).json(
        new ApiResponse(201, userCreated, "User created successfully")
    )
})

export { registerUser }