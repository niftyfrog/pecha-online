import React, { useEffect, useState } from "react";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";

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
      <button onClick={() => handleClick("UserNameInput")}>最初に戻る</button>
      <div className="phase1">{currentPhase === 1 && <Phase1 onStart={handlePhaseTimer} />}</div>
      <div className="phase2">{currentPhase === 2 && <Phase2 />}</div>
      <p>a</p>
    </div>
  );
};

export default InGame;
