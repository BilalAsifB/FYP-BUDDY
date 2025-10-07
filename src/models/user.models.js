import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["MALE", "FEMALE"]
    },
    password: {
        type: String,
        required: true,
        trim: true  
    },
    role: {
        type: String,
        required: true,
        enum: ["STUDENT", "SUPERVISOR"],
        default: "STUDENT"
    },
}, {timestamps: true})

export const User = mongoose.model("User", userSchema);