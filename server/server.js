const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  var loginUser = [];

  socket.on("user_name", (data) => {
    loginUser[data.userID] = data.username;
    console.log(data.username);
    console.log(loginUser);
  });
});
server.listen(4000, () => {
  console.log("listening on *:4000");
});
