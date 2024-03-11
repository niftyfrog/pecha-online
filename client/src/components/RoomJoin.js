import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

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
      <Button onClick={() => handleclick("UserNameInput")}>戻る</Button>
      <div id="room">
        <Button onClick={() => handleclick("InRoom")} variant="contained">
          ルームを作成する
        </Button>
        <Button onClick={() => handleclick("UserNameInput")} variant="outlined">
          ルームを参加する
        </Button>
      </div>
    </div>
  );
};

export default RoomJoin;
