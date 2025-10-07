import mongoose from "mongoose";

const studentSearchRequestSchema = new mongoose.Schema({
    searchPurpose: {
        type: String,
        enum: ["FORM_TEAM", "FIND_THIRD_MEMBER"],
        required: true
    },
    requiredSkills: {
        type: [String],
        default: []
    },
    desiredQualities: {
        type: [String],
        default: []
    },
    genderPreference: {
        type: String,
        enum: ["MALE", "FEMALE", "ANY"],
        default: "ANY"
    },
    departmentPreference: {
        type: String,
        enum: ["CS", "CYS", "AI", "DS", "SE", "ANY"],
        default: "ANY"
    },
    batchPreference: {
        type: Number,
        default: null
    },
    minCGPA: {
        type: Number,
        min: 2.0,
        max: 4.0,
        default: 2.0
    },
    maxCGPA: {
        type: Number,
        min: 2.0,
        max: 4.0,
        default: 4.0
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
        default: "ACTIVE"
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    currentTeamId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    }
}, {timestamps: true})

export const StudentSearchRequest = mongoose.model("StudentSearchRequest", studentSearchRequestSchema);