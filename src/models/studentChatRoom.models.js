import mongoose from"mongoose";

const studentChatRoomSchema = new mongoose.Schema({
    connectionID: {
        types: mongoose.Schema.Types.ObjectId,
        ref: "StudentConnection",
    },
    lastMeessageAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

export const StudentChatRoom = mongoose.model("StudentChatRoom", studentChatRoomSchema);