import React, { useEffect, useState } from "react";

const InRoom = ({ socket, userInfo, onSubmit }) => {
  const [modalState, setModalState] = useState("");
  const [userList, setUserList] = useState([]);
  const [gameMode, setGameMode] = useState("");
  const [roomState, setRoomState] = useState([]);

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
    socket.on("userList", (data) => {
      setUserList(data);
    });
    socket.on("game_room", (data) => {
      setRoomState(data);
    });
  }, [modalState, socket, gameMode, onSubmit]);

  const handleclick = (state) => {
    setModalState(state);
  };

  const GameModeState = (mode) => {
    setGameMode(mode);
  };

  return (
    <div className="in-room">
      <h3>InRoom</h3>
      <h3>{`ようこそ  ${userInfo.username}様`}</h3>
      <ul>
        {userList.map((user) => (
          <li key={user.username}>{user.username}</li>
        ))}
      </ul>
      <div className="join">
        <button onClick={() => GameModeState("Player")}>プレイヤーとして参加</button>
        <button onClick={() => GameModeState("Spectators")}>観戦者として参加</button>
      </div>
      <div className="joined">
        <h3>プレイヤー</h3>
        <ul></ul>
        <h3>観戦者</h3>
      </div>
      <div className="gamestart">
        <button onClick={() => handleclick("InGame")}>ゲームスタート</button>
      </div>
    </div>
  );
};

export default InRoom;
