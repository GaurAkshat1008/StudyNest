import User from "../Schema/userSchema.js";
import Room from "../Schema/roomSchema.js";
import Chat from "../Schema/chatSchema.js";
// import OpenAI from "openai";
// import readlineSync from "readline-sync";

// const openai = new OpenAI({ apiKey: process.env.OPENAI_APIKEY });

// async function ask(){
//   const chat = await openai.chat.completions.create({
//     messages: [{role:'user', content:"say this is a test"}],
//     model: 'gpt-3.5-turbo',
//   })
//   console.log(chat.data.choices)
// }
// // ask()

export const createChat = async (req, res) => {
  const { roomId, message } = req.body;
  const userId = req.session.userId;
  const newChat = new Chat({
    message: message,
    room: roomId,
    sender: userId,
  });
  await newChat.save();
  const room = await Room.findById(roomId);
  room.chats.push(newChat._id);
  await room.save();
  return res.json({
    chat: newChat,
  });
};

export const loadChat = async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);
  return res.json({
    chat: chat,
  });
};

export const createAiChat = async (req, res) => {};
