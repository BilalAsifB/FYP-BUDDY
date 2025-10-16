import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    batch: {
        type: Number,
        required: true,
        default: new Date().getFullYear()
    },
    department: {
        type: String,
        required: true,
        enum: ["CS", "CYS", "AI", "DS", "SE"]
    },
    cgpa: {
        type: Number,
        required: true,
        min: 2.0,
        max: 4.0
    },
    projectTitle: {
        type: String,
        trim: true,
        default: ""
    },
    projectDomain: {
        type: String,
        trim: true,
        default: ""
    },
    projectIdea: {
        type: String,
        trim: true,
        default: ""
    },
    projectTechStack: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least 1 interest']
    },
    skills: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least 1 skill']
    },
    hasTeam: {
        type: Boolean,
        default: false
    },
    teamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    }
}, {timestamps: true});

function arrayLimit(val) {
    return val.length >= 1;
}

export const Student = mongoose.model("Student", studentSchema);