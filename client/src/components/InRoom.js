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
    socket.on("roomUpdate", ({ players, spectators }) => {
      setRoomState({ players, spectators });

      socket.on("changePhase", (data) => {
        setModalState(data);
      });
    });
  }, [modalState, socket, onSubmit]);

  const handleclick = (state) => {
    socket.emit("changeState", state);
  };

  const GameModeState = (mode) => {
    userInfo.gamemode = mode;
    socket.emit("gameMode", { userInfo });
  };

  return (
    <div className="in-room">
      <h3>InRoom</h3>
      <h3>{`ようこそ  ${userInfo.username}様`}</h3>
      <h3 className="joinedUser">現在参加中のユーザー</h3>
      <ul>{userList && userList.map((user) => <li key={user.username}>{user.username}</li>)}</ul>
      <p>ゲームに参加する↓↓↓↓↓</p>
      <div className="join">
        <button onClick={() => GameModeState("Player")}>プレイヤーとして参加</button>
        <button onClick={() => GameModeState("Spectators")}>観戦者として参加</button>
      </div>
      <div className="joined">
        <h3>プレイヤー</h3>
        <ul>
          {roomState.players &&
            roomState.players.map((player) => <li key={player.userId}>{player.username}</li>)}
        </ul>
        <h3>観戦者</h3>
        <ul>
          {roomState.spectators &&
            roomState.spectators.map((spectators) => (
              <li key={spectators.userId}>{spectators.username}</li>
            ))}
        </ul>
      </div>
      <div className="gamestart">
        <button onClick={() => handleclick("InGame")}>ゲームスタート</button>
      </div>
    </div>
  );
};

export default InRoom;
