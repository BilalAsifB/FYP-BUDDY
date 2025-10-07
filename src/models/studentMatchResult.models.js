import mongoose from "mongoose";

const studentMatchResultSchema = new mongoose.Schema({
    searchRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentSearchRequest",
    },
    compatibilityScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    rank: {
        type: Number,
        min: 1,
        max: 5
    },
    matchedStudentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
}, {timestamps: true})

export const StudentMatchResult = mongoose.model("StudentMatchResult", studentMatchResultSchema);