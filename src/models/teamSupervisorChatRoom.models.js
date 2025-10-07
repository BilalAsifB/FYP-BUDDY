import mongoose from "mongoose";

const teamSupervisorChatRoomSchema = new mongoose.Schema({
    teamId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team'
    },
    supervisorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supervisor' 
    },
    connectionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'TeamSupervisorConnection' 
    },
    lastMessageAt: {
        type: Date
    },
}, { timestamps: true });

export const TeamSupervisorChatRoom = mongoose.model("TeamSupervisorChatRoom", teamSupervisorChatRoomSchema);