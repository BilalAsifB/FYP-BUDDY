import mongoose from "mongoose";

const studentMatchResultSchema = new mongoose.Schema({
    searchRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentSearchRequest",
    },
    compqtibilityScore: {
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
    macthedStudentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export const StudentMatchResult = mongoose.model("StudentMatchResult", studentMatchResultSchema);