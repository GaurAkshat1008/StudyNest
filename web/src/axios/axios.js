import axios from "axios";
import { v4 } from "uuid";

const instance = axios.create({
  baseURL: "https://studynest-backend.onrender.com/api",
  withCredentials: true,
});

export const login = async (email, password) => {
  const res = await instance.post("/user/auth/login", { email, password });
  return res.data;
};

export const register = async (name, username, email, password) => {
  const res = await instance.post("/user/auth/register", {
    name,
    username,
    email,
    password,
  });
  return res.data;
};

export const getMe = async () => {
  const res = await instance.get("/user/auth/getuser");
  return res.data;
};

export const logout = async () => {
  const res = await instance.post("/user/auth/logout");
  return res.data;
};

export const loadRooms = async () => {
  const res = await instance.get("/room/loadrooms");
  return res.data;
};

export const createRoom = async (name, desc, img) => {
  const res = await instance.post("/room/create", { name, desc, img });
  return res.data;
};

export const loadRoom = async (roomId) => {
  const res = await instance.post("/room/loadroom", { roomId });
  return res.data;
};

export const getUsers = async (roomId) => {
  const res = await instance.post("/room/user/getUsers", { roomId });
  return res.data;
};

export const findUserById = async (userId) => {
  const res = await instance.post("/user/util/findbyid", { userId });
  return res.data;
};

export const loadChats = async (roomId) => {
  const res = await instance.post("/room/chats/loadchats", { roomId });
  return res.data;
};

export const createChats = async (roomId, message) => {
  const res = await instance.post("/chat/create", { roomId, message });
  return res.data;
};

export const readChatById = async (chatId) => {
  const res = await instance.post("/chat/read", { chatId });
  return res.data;
};

export const searchUser = async (emailOrUsername) => {
  const res = await instance.post("/user/util/searchuser", { emailOrUsername });
  return res.data;
};

export const invitemember = async (roomId, userId) => {
  const res = await instance.post("/room/user/invitemember", {
    roomId,
    userId,
  });
  return res.data;
};

export const readNotif = async () => {
  const res = await instance.post("/user/util/readnotif");
  return res.data;
};

export const deleteNotif = async (notifId) => {
  const res = await instance.post("/user/util/deletenotif", { notifId });
  return res.data;
};

export const joinRoom = async (roomId) => {
  const res = await instance.post("/room/joinroom", { roomId });
  return res.data;
};

export const addResource = async (roomId, resource) => {
  const res = await instance.post("/room/res/add", { roomId, resource });
  return res.data;
};

export const handleUpload = async (file, room) => {
  const formData = new FormData();
  const upload_preset = "hxhc2dge";
  const cloudName = "drk6tmn92";
  console.log(file);
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);
  formData.append("folder", room._id);
  const filename = file.name + v4();
  formData.append("public_id", filename);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    formData
  );
  const url = res.data.secure_url;
  return url;
};

export const addTask = async (roomId, taskObj) => {
  const res = await instance.post("/room/task/add", { roomId, taskObj });
  return res.data;
};

export const removeTask = async (roomId, taskId) => {
  const res = await instance.post("/room/task/remove", { roomId, taskId });
  return res.data;
};
