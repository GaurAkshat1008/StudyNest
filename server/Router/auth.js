import express from "express";
import {
  deleteNotif,
  findUserById,
  getUser,
  login,
  logout,
  readNotif,
  register,
  searchUser,
} from "../Controllers/userController.js";
import { protect } from "../Middleware/protect.js";

const userRouter = express.Router();

userRouter.post("/auth/register", register);
userRouter.get("/auth/getuser", protect, getUser);
userRouter.post("/auth/login", login);
userRouter.post("/auth/logout", protect, logout);

userRouter.post("/util/searchuser", searchUser);
userRouter.post("/util/findbyid", protect, findUserById);
userRouter.post("/util/readnotif", protect, readNotif);
userRouter.post("/util/deletenotif", protect, deleteNotif);

export default userRouter;
