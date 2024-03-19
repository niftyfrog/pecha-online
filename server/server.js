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
var rooms = {};
var Users = [];

function generateRoomID() {
  return "room-" + Math.random().toString(36).substr(2, 8);
}

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  var loginUser = {};

  socket.on("user_name", (data) => {
    loginUser = { userid: socket.id, username: data.username };
    Users.push(loginUser);
    console.log(Users);
    socket.emit("userInfo", loginUser);
    io.emit("userList", Users);
  });

  //   socket.on("userInfoConfirm",(loginUser)=>{
  //     socket.emit()
  //   })

  socket.on("disconnect", (reason) => {
    console.log(reason);
    Users = Users.filter((user) => user.userid !== socket.id);
    io.emit("userList", Users);
    if (Users.length > 0) {
      console.log(Users);
    } else if (Users.length == 0) {
      console.log("現在ログイン中のユーザーはいません");
    }
  });
  //   socket.on("createRoom", () => {
  //     const roomId = generateRoomID();
  //     rooms[roomId] = {
  //       id: roomId,
  //       players: [],
  //       spectators: [],
  //     };
  //     socket.join(roomId);
  //     socket.emit("roomCreated", roomId);
  //   });

  socket.on("joinRoom", (roomId) => {
    const joinRoomId = roomId;
    rooms[roomId] = {
      id: roomId,
      players: [],
      spectators: [],
    };
    socket.join(roomId);
    socket.emit("roomCreated", roomId);
  });
});

server.listen(4000, () => {
  console.log("listening on *:4000");
});
