import mongoose from "mongoose";

const studentConnectionSchema = new mongoose.Schema({
    initiatorStudentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    recipientStudentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"   
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    },
    acceptedAt: { 
        type: Date 
    },
}, {timestamps: true})

export const StudentConnection = mongoose.model("StudentConnection", studentConnectionSchema);