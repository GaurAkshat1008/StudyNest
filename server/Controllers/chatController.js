import User from "../Schema/userSchema.js";
import Room from "../Schema/roomSchema.js";
import Chat from "../Schema/chatSchema.js";

export const createChat = async (req, res) => {
  const { roomId, message } = req.body;
  const userId = req.session.userId;
  const newChat = new Chat({
    message: message,
    room: roomId,
    sender: userId
  })
  await newChat.save();
  const room = await Room.findById(roomId);
  room.chats.push(newChat._id);
  await room.save();
  return res.json({
    chat: newChat,
  })
};

export const loadChat = async (req, res) => {
  const {chatId} = req.body;
  const chat = await Chat.findById(chatId);
  return res.json({
    chat: chat
  })
}
