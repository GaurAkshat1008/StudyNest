import express from "express";
import {
  createRoom,
  joinRoom,
  loadChats,
  makeAdmin,
  loadRooms,
  loadRoom,
  getUsers,
  inviteMember,
  addResource,
  addTask,
  removeTask,
} from "../Controllers/roomController.js";
import { protect } from "../Middleware/protect.js";

const roomRouter = express.Router();

roomRouter.post("/create", protect, createRoom);
roomRouter.post("/joinroom", protect, joinRoom);
roomRouter.get("/loadrooms", protect, loadRooms);
roomRouter.post("/loadroom", protect, loadRoom);

roomRouter.post("/user/makeadmin", protect, makeAdmin);
roomRouter.post("/user/getusers", protect, getUsers);
roomRouter.post("/user/invitemember", protect, inviteMember);

roomRouter.post("/chats/loadchats", protect, loadChats);

roomRouter.post("/res/add", protect, addResource);

roomRouter.post("/task/add", protect, addTask);
roomRouter.post("/task/remove", protect, removeTask);

export default roomRouter;
