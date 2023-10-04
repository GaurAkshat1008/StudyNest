import express from "express";
import { createChat, loadChat } from "../Controllers/chatController.js";
import { protect } from "../Middleware/protect.js";

const chatRouter = express.Router();

chatRouter.post("/create", protect, createChat);
chatRouter.post("/read", protect, loadChat);

export default chatRouter;
