/* eslint-disable prettier/prettier */
import http from "http";
import * as socketio from "socket.io";
import express from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  method: ["GET", "POST", "PUT", "DELETE"],
  credential: true,
  optionsSuccessStatus: 200,
};
app.use("/files", express.static(path.resolve(__dirname, "upload")));

const server = http.createServer(app);

const io = new socketio.Server(server, {
  cors: corsOptions,
});

export { server, io, corsOptions, app };
