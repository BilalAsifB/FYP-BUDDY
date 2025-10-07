import mongoose from "mongoose";

const teamSupervisorConnectionSchema = new mongoose.Schema({
    teamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    },
    supervisorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor' 
    },
    connectionType: {
        type: String,
        enum: ["SUPERVISOR", "CO-SUPERVISOR"]
    },
    initiatedBy: {
        type: String,
        enum: ["TEAM", "SUPERVISOR"]
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    },
    acceptedAt: { 
        type: Date 
    },
}, { timestamps: true });  

export const TeamSupervisorConnection = mongoose.model('TeamSupervisorConnection', teamSupervisorConnectionSchema);