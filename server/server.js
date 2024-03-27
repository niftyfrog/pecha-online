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
let Users = [];
let currentPhase = 1;
let remainingTime = 0;
let phaseTimer = null;
let charCard = [];

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  let loginUser = {};

  socket.on("user_name", (data) => {
    loginUser = { userid: socket.id, username: data.username, gamemode: "none" };
    Users.push(loginUser);
    console.log(Users);
    socket.emit("userInfo", loginUser);
    io.emit("userList", Users);
  });

  socket.on("gameMode", ({ userInfo }) => {
    const userIndex = Users.findIndex((user) => user.userid === userInfo.userid);
    if (userIndex !== -1) {
      Users[userIndex].gamemode = userInfo.gamemode;

      const players = Users.filter((user) => user.gamemode === "Player");
      const spectators = Users.filter((user) => user.gamemode === "Spectators");

      io.emit("roomUpdate", { players, spectators });
    }
  });

  socket.on("charCardGet", (data) => {
    charCard = { charCard: data };
    console.log(charCard);
  });

  socket.on("startGame", () => {
    currentPhase = 1;
    startPhaseTimer(3, 2);
  });

  socket.on("changeState", (data) => {
    io.emit("changePhase", data);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
    Users = Users.filter((user) => user.userid !== socket.id);
    io.emit("userList", Users);
    const players = Users.filter((user) => user.gamemode === "Player");
    const spectators = Users.filter((user) => user.gamemode === "Spectators");
    io.emit("roomUpdate", { players, spectators });
    if (Users.length === 0) {
      console.log("現在ログイン中のユーザーはいません");
    }
  });
});

const startPhaseTimer = (duration, nextPhase) => {
  clearTimeout(phaseTimer);
  remainingTime = duration;

  phaseTimer = setTimeout(() => {
    currentPhase = nextPhase;
    io.emit("phaseUpdate", { currentPhase, remainingTime: 0 });

    if (currentPhase < 5) {
      startPhaseTimer(10, currentPhase + 1);
    }
  }, duration * 1000);

  io.emit("phaseUpdate", { currentPhase, remainingTime });
};

setInterval(() => {
  if (remainingTime > 0) {
    remainingTime--;
    io.emit("timeUpdate", remainingTime);
  }
}, 1000);

server.listen(4000, () => {
  console.log("listening on *:4000");
});
