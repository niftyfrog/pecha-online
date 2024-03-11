import React, { useEffect, useState } from "react";

const RoomJoin = ({ onSubmit }) => {
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
    <div id="room-join">
      <h3>RoomJoin</h3>
      <button onClick={() => handleclick("UserNameInput")}>戻る</button>
      <div id="room">
        <button onClick={() => handleclick("InRoom")} variant="contained">
          ルームを作成する
        </button>
        <button onClick={() => handleclick("UserNameInput")} variant="outlined">
          ルームを参加する
        </button>
      </div>
    </div>
  );
};

export default RoomJoin;
