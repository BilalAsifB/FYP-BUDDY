import mongoose from"mongoose";

const studentChatRoomSchema = new mongoose.Schema({
    connectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentConnection",
    },
    lastMessageAt: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

export const StudentChatRoom = mongoose.model("StudentChatRoom", studentChatRoomSchema);