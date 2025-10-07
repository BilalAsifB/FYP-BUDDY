import mongoose from "mongoose";

const confirmedTeamSupervisorSchema = new mongoose.Schema({
    teamid: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    },
    supervisorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor',
        reuired: true
    },
    relationshipType: {
        type: String,
        enum: ["SUPERVISOR", "CO-SUPERVISOR"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    confirmedAt: {
        type: Date
    },
});

export const ConfirmedTeamSupervisor = mongoose.model("ConfirmedTeamSupervisor", confirmedTeamSupervisorSchema);