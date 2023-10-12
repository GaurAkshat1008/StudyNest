import RedisStore from "connect-redis";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import Redis from "ioredis";
import { Server } from "socket.io";
import connectDB from "./DB/connection.js";
import userRouter from "./Router/auth.js";
import chatRouter from "./Router/chat.js";
import roomRouter from "./Router/room.js";

const main = async () => {
  const app = express();
  dotenv.config();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
      credentials: true,
    },
  });
  const emailToSocketMap = new Map();
  const socketToEmailMap = new Map();
  io.on("connection", (socket) => {
    socket.on("createChat", (data) => {
      socket.broadcast.emit("chatCreated", data);
      // console.log(data);
    });
    socket.on("call-joined", (data) => {
      const {user, room} = data;
      emailToSocketMap.set(user, socket.id);
      socketToEmailMap.set(socket.id, user);
      io.to(socket.id).emit("call-joined", data);
    });
  });
  app.use(express.json());
  await connectDB();
  app.use(
    cors({
      origin: ["https://studynest.vercel.app","http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://studynest.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  const redis = new Redis(process.env.REDIS_URL);
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: "qid",
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: "lax"
      },
    })
  );
  app.use("/api/user", userRouter);
  app.use("/api/room", roomRouter);
  app.use("/api/chat", chatRouter);

  server.listen(4000, () => {
    console.log("Server on http://localhost:4000");
  });
};

try {
  main();
} catch (e) {
  console.error(e);
}
