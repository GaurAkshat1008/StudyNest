import User from "../Schema/userSchema.js";
import Room from "../Schema/roomSchema.js";
import Chat from "../Schema/chatSchema.js";
import { v4 } from "uuid";

export const createRoom = async (req, res) => {
  const { name, desc, img } = req.body;
  const roomName = name + v4();
  const host = req.session.userId;
  const newRoom = new Room({
    name: roomName,
    admin: [host],
    users: [host],
    desc: desc,
    img: img,
  });
  await newRoom.save();
  const user = await User.findById(host);
  user.rooms.push(newRoom._id);
  await user.save();
  return res.json({
    room: newRoom,
  });
};

export const joinRoom = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.json({
      errors: [
        {
          field: "room",
          message: "Room not found!",
        },
      ],
    });
  }
  const userId = req.session.userId;
  const user = await User.findById(userId);
  user.rooms.push(roomId);
  await user.save();
  room.users.push(userId);
  await room.save();
  return res.json({
    room: room,
  });
};

export const makeAdmin = async (req, res) => {
  const { userId, roomId } = req.body;
  const room = await Room.findById(roomId);
  room.admin.push(userId);
  await room.save();
  return res.json({
    room: room,
  });
};

export const loadRooms = async (req, res) => {
  const userId = req.session.userId;
  const user = await User.findById(userId);
  const rooms = await Room.find({ _id: { $in: user.rooms } });
  return res.json({
    rooms: rooms,
  });
};

export const loadRoom = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.json({
      errors: [
        {
          message: "Room not found",
        },
      ],
    });
  }
  return res.json({
    room: room,
  });
};

export const loadChats = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.json({
      chats: [],
    });
  }
  return res.json({
    chats: room.chats,
  });
};

export const getUsers = async (req, res) => {
  const { roomId } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    return res.json({
      errors: [
        {
          message: "No Room found",
        },
      ],
    });
  }
  return res.json({
    users: room.users,
  });
};

export const inviteMember = async (req, res) => {
  const { roomId, userId } = req.body;
  const user = await User.findById(userId);
  const room = await Room.findById(roomId);
  const obj = {
    seen: false,
    message: `You have been invited to join ${room.name}`,
    room: room._id,
  };
  user.notifs.push(obj);
  await user.save();
  return res.json({
    user: user,
  });
};

export const addResource = async (req, res) => {
  const { roomId, resource } = req.body;
  const room = await Room.findById(roomId);
  room.resources.push(resource);
  await room.save();
  return res.json({
    room: room,
  });
};

export const addTask = async (req, res) => {
  const { roomId, taskObj } = req.body;
  const room = await Room.findById(roomId);
  room.tasks.push(taskObj);
  await room.save();
  return res.json({
    room: room,
  });
};

export const removeTask = async (req, res) => {
  const { roomId, taskId } = req.body;
  const room = await Room.findById(roomId);
  room.tasks = room.tasks.filter((task) => task._id.toString() !== taskId);
  await room.save();
  return res.json({
    room: room,
  });
};

