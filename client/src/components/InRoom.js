import React, { useEffect, useState } from "react";

const InRoom = ({ onSubmit }) => {
  const [modalState, setModalState] = useState("");

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
  }, [modalState, onSubmit]);

  const handleclick = (state) => {
    setModalState(state);
  };

  return (
    <div className="in-room">
      <h3>InRoom</h3>
      <button onClick={() => handleclick("RoomJoin")}>戻る</button>
      <div className="join">
        <button>プレイヤーとして参加</button>
        <button>観戦者として参加</button>
        <button onClick={() => handleclick("InGame")}>ゲームを開始する</button>
      </div>
      <div className="joined">
        <h3>プレイヤー</h3>
        <h3>観戦者</h3>
        <p>a</p>
      </div>
    </div>
  );
};

export default InRoom;
