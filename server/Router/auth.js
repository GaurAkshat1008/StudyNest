import express from "express";
import {
  findUserById,
  getUser,
  login,
  logout,
  register,
  searchUser,
} from "../Controllers/userController.js";
import { protect } from "../Middleware/protect.js";

const userRouter = express.Router();

userRouter.post("/auth/register", register);
userRouter.get("/auth/getuser", protect, getUser);
userRouter.post("/auth/login", login);
userRouter.post("/auth/logout", protect, logout);

userRouter.get("/util/searchuser", searchUser);
userRouter.post("/util/findbyid", protect, findUserById)

export default userRouter;
