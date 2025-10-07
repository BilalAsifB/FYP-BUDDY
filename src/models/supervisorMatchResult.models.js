import mongoose from "mongoose";

const supervisorMatchResultSchema = new mongoose.Schema({
    searchRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SupervisorSearchRequest'
    },
    compatibiltyScore: {
        type: Number,
        min: 0,
        max: 100
    },
    rank: {
        type: Number,
        min: 1,  
        max: 5
    },
    matchedSupervisorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true })