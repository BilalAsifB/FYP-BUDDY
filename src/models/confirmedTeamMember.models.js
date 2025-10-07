import mongoose from "mongoose";

const confirmedTeamMemberSchema = new mongoose.Schema({
    teamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    joinedAt: {
        type: Date
    },
})

export const ConfirmedTeamMember = mongoose.model("ConfirmedTeamMember", confirmedTeamMemberSchema);