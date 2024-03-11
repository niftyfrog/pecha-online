import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

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
      <Button onClick={() => handleclick("RoomJoin")}>戻る</Button>
      <div className="join">
        <button>プレイヤーとして参加</button>
        <button>観戦者として参加</button>
        <Button onClick={() => handleclick("InGame")}>ゲームを開始する</Button>
      </div>
      <div className="joined">
        <h3>プレイヤー</h3>
        <h3>観戦者</h3>
      </div>
    </div>
  );
};

export default InRoom;
