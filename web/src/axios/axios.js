import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
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
}

export const createChats = async(roomId, message) => {
  const res = await instance.post("/chat/create", { roomId, message });
  return res.data;
}

export  const readChatById = async (chatId) => {
  const res = await instance.post("/chat/read", {chatId});
  return res.data
}