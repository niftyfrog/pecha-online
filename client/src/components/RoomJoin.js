import io from "socket.io-client";
import React, { useEffect, useState } from "react";
const socket = io.connect("http://localhost:4000");

const RoomJoin = ({ onSubmit }) => {
  const [modalState, setModalState] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }

    socket.on("roomCreated", (roomId) => {
      console.log("room created");
      console.log("RoomID :" + roomId);
      setModalState("InRoom");
    });
  }, [modalState, onSubmit]);

  const handleclick = (state) => {
    switch (state) {
      case "InRoom":
        socket.emit("createRoom");
        break;
      case "UserNameInput":
        socket.emit("joinRoom");
        break;
      default:
        break;
    }
  };

  return (
    <div id="room-join">
      <h3>RoomJoin</h3>
      <button onClick={() => handleclick("UserNameInput")}>戻る</button>
      <div id="room">
        <button onClick={() => handleclick("InRoom")} variant="contained">
          ルームを作成する
        </button>
        <h3>ルームに参加する</h3>
        <input type="text" onchange={(e) => setJoinRoomId(e.target.value)} />
        <button onClick={() => handleclick("UserNameInput")} variant="outlined">
          ルームを参加する
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
