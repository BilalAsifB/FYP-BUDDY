import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatRoomId: {
        // could be studentChatRoomId or teamSupervisorChatRoomId
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'chatRoomType'
    },
    chatRoomType: {
        type: String,
        enum: ["studentChatRoom", "teamSupervisorChatRoom"],
    },
    senderId: {
        type: String
    },
    content: {
        type: String,
        default: ""
    },
    isRead: {
        type: Boolean,
        default: false
    },
    sentAt: {
        type: Date,
        default: Date.now()
    }
})

export const Message = mongoose.model("Message", messageSchema);