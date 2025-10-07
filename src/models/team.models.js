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
    finalizedProjectTitle: {
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
    projectIdeas: {
        type: [String],
        default: []
    },
    isProjectIdeaFinalized: {
        type: Boolean,
        default: false
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
        max: 3
    },
    canAddMember: {
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

function arrayLimit(val) {
    return val.length >= 2;
}

export const Team = mongoose.Model("Team", teamSchema);