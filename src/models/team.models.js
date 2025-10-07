import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    teamLeadId: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: ""
    },
    finalizedProjectTile: {
        type: String,
        default: ""
    },
    finalizedProjectDomain: {
        type: String,
        default: ""
    },
    finalizedProjectIdea: {
        type: String,
        default: ""
    },
    finalizedProjectTechStack: {
        type: [String],
        default: []
    },
    memberIds: {
        type: [String],
        required: true,
        validate: [arrayLimit, '{PATH} must have at least 2 members']
    },
    averageCgpa: {
        type: Number,
        required: true,
        min: 2.0,
        max: 4.0
    },
    memberCount: {
        type: Number,
        required: true,
        min: 2,
        max: 2
    },
    canAddMembers: {
        type: Boolean,
        default: true
    },
    canSearchSupervisor: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        enum: ["COMPLETE", "INCOMPLETE"],
        default: "INCOMPLETE"
    },
    hasSupervisor: {
        type: Boolean,
        default: false
    },
    hasCoSupervisor: {
        type: Boolean,
        default: false
    },
    supervisorId: {
        type: String,
        default: ""
    },
    coSupervisorId: {
        type: String,
        default: ""
    },
}, {timestamps: true})

export const Team = mongoose.Model("Team", teamSchema);