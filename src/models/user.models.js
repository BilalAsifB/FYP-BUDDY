import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        required: [true, "Password is required"],
        trim: true  
    },
    role: {
        type: String,
        required: true,
        enum: ["STUDENT", "SUPERVISOR"],
        default: "STUDENT"
    },
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = bcrypt.hash(
            this.password,
            salt=10  
        )
        next()
    }
    return next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function(){
    jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY      
    })
}

userSchema.methods.generateRefreshToken = async function(){
    jwt.sign({
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY      
    })
}

export const User = mongoose.model("User", userSchema);