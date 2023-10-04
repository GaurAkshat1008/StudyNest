import express from "express";
import {
  createRoom,
  joinRoom,
  loadChats,
  makeAdmin,
  loadRooms,
  loadRoom,
  getUsers,
} from "../Controllers/roomController.js";
import { protect } from "../Middleware/protect.js";

const roomRouter = express.Router();

roomRouter.post("/create", protect, createRoom);
roomRouter.post("/joinroom", protect, joinRoom);
roomRouter.get("/loadrooms", protect, loadRooms);
roomRouter.post("/loadroom", protect, loadRoom);

roomRouter.post("/user/makeadmin", protect, makeAdmin);
roomRouter.post("/user/getusers", protect, getUsers);

roomRouter.post("/chats/loadchats", protect, loadChats);

export default roomRouter;
