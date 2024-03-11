import React, { useEffect, useState } from "react";
import Phase1 from "./Phase1";
import { Button } from "@mui/material";
import styled from "@emotion/styled";
import Phase2 from "./Phase2";

/* ↓これ追加 */
const TextButton = styled(Button)`
  text-transform: none;
`;

const InGame = ({ onSubmit }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [modalState, setModalState] = useState("");
  const [PhaseTimer, setPhaseTimer] = useState(null);
  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
    if (currentPhase) {
      console.log("currentPhase:", currentPhase);
    }
  }, [modalState, onSubmit]);
  const handleClick = (state) => {
    setModalState(state);
  };

  const handlePhaseTimer = () => {
    console.log("handlePhaseTimer起動");
    const timer = setTimeout(() => {
      setCurrentPhase(2); // ここで状態を更新
    }, 3 * 1000);
    setPhaseTimer(timer);
  };

  return (
    <div className="in-game">
      <h3>InGame</h3>
      <Button onClick={() => handleClick("UserNameInput")}>最初に戻る</Button>
      <div className="phase1">{currentPhase === 1 && <Phase1 onStart={handlePhaseTimer} />}</div>
      <div className="phase2">{currentPhase === 2 && <Phase2 />}</div>
    </div>
  );
};

export default InGame;
