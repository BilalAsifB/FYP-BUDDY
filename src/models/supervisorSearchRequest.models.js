import mongoose from "mongoose";

const supervisorSearchRequestSchema = new mongoose.Schema({
    teamid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    searchType: {
        type: String,
        enum: ["SUPERVISOR", "CO-SUPERVISOR"],
        required: true,
        default: "SUPERVISOR"
    },
    desiredDomains: {
        type: [String],
        default: []
    },
    status: {
        type: String,
        enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
        required: true,
        default: "ACTIVE"
    },
}, { timestamps: true})

export const SupervisorSearchRequest = mongoose.model('SupervisorSearchRequest', supervisorSearchRequestSchema);