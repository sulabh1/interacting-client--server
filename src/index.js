import express from "express";
import http from "http";
import dotenv from "dotenv";
import path from "path";
import * as socketio from "socket.io";

dotenv.config({ path: "./../config.env" });

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server);

//let count = 0;

io.on("connection", (socket) => {
  console.log("Socket.io is connected");
  socket.emit("message", "Welcome");
  socket.broadcast.emit("message", "A new user has joined");
  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });
  socket.on("sendLocation", (coords) => {
    io.emit(
      "message",
      `https://google.com/maps?q=${coords.lattitude},${coords.longitude}`
    );
  });
  socket.on("disconnect", () => {
    io.emit("message", "A user has left!!!");
  });
  // socket.emit("countUpdated", count);
  // socket.on("increment", () => {
  //   count++;
  //   // socket.emit("countUpdated", count);
  //   io.emit("countUpdated", count);
  // });
});

app.use(express.static(path.join("__dirname", "../public")));
const port = process.env.PORT || 8000;

server.listen(port, (req, res) => {
  console.log(`App running in port ${port}`);
});
