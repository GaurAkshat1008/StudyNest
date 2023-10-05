import express from "express";
import connectDB from "./DB/connection.js";
import cors from "cors";
import Redis from "ioredis";
import session from "express-session";
import RedisStore from "connect-redis";
import dotenv from "dotenv";
import userRouter from "./Router/auth.js";
import roomRouter from "./Router/room.js";
import chatRouter from "./Router/chat.js";
import { Server } from "socket.io";
import { createServer } from "http";
import Chat from "./Schema/chatSchema.js";

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
  io.on("connection", (socket) => {
    socket.on("createChat", (data) => {
      socket.broadcast.emit("chatCreated", data);
      console.log(data)
    })
  });
  app.use(express.json());
  await connectDB();
  app.use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );
  const redis = new Redis();
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      name: "qid",
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 30,
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
