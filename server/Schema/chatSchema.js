import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;