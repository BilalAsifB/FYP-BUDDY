import mongoose from "mongoose";

const supervisorSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    domains: {
        type: [String],
        default: []
    },
    interests: {
        type: [String],
        default: []
    },
    supervisingCount: {
        type: Number,
        min: 0,
        max: 7,
        default: 0
    },
    cosupervisingCount: {
        type: Number,
        min: 0,
        default: 0
    },
})

export const Supervisor = mongoose.model("Supervisor", supervisorSchema);