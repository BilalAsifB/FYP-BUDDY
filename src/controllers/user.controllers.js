import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
        
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false }) // save on db without running validators

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, `Token generation failed: ${error.message}`)
    }
}

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
        role,
        refreshToken: ""
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
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

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email  || email?.trim() === "") {
        throw new ApiError(400, "Email is required")
    }
    
    if (!password  || password?.trim() === "") {    
        throw new ApiError(400, "Password is required")
    }

    const user = await User.findOne({
        email: email.toLowerCase().trim()
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isCorrect = await user.isPasswordCorrect(password.trim())

    if (!isCorrect) {
        throw new ApiError(401, "Invalid credentials")  
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // cookies are only server modifiable
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie(
        "acccessToken", accessToken, options
    ).cookie(
        "refreshToken", refreshToken, options
    ).json(
        new ApiResponse(200, {
            user: loggedInUser,
            accessToken,
            refreshToken
        }, "Login successful")
    )
})

const logOutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id
    await User.findByIdAndUpdate(userId,
        {$set: {refreshToken: undefined}},
        {new: true}
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200).clearCookie(
        "accessToken", options
    ).clearCookie(
        "refreshToken", options
    ).json(
        new ApiResponse(200, {}, "Logout successful")
    )
})

export { 
    registerUser,
    loginUser,
    logOutUser
}