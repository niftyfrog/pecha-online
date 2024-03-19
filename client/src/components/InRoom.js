import React, { useEffect, useState } from "react";

const InRoom = ({ socket, userInfo, onSubmit }) => {
  const [modalState, setModalState] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
    socket.on("userList", (data) => {
      setUserList(data);
    });
  }, [modalState, socket, onSubmit]);

  const handleclick = (state) => {
    setModalState(state);
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
      <button onClick={() => handleclick("UserNameInput")}>戻る</button>
      <div className="join">
        <button>プレイヤーとして参加</button>
        <button>観戦者として参加</button>
        <button onClick={() => handleclick("InGame")}>ゲームを開始する</button>
      </div>
      <div className="joined">
        <h3>プレイヤー</h3>
        <h3>観戦者</h3>
      </div>
    </div>
  );
};

export default InRoom;
