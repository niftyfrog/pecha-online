import React, { useEffect, useState } from "react";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";

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

  const handlePhaseTimer = (sec, phase) => {
    console.log("handlePhaseTimer起動");
    const timer = setTimeout(() => {
      setCurrentPhase(phase); // ここで状態を更新
    }, sec * 1000);
    setPhaseTimer(timer);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="in-game">
      <h3>InGame</h3>
      <button onClick={() => handleClick("UserNameInput")}>最初に戻る</button>
      <div className="phase1">
        {currentPhase === 1 && (
          <Phase1 onStart={() => handlePhaseTimer(3, 2)} />
        )}
      </div>
      <div className="phase2">
        {currentPhase === 2 && (
          <Phase2 onStart={() => handlePhaseTimer(5, 3)} />
        )}
      </div>
      <div className="phase3">
        {currentPhase === 3 && (
          <Phase3 onStart={() => handlePhaseTimer(10, 4)} />
        )}
      </div>
      <div className="phaseTimer">
        <div>残り時間: {}</div>
      </div>
    </div>
  );
};

export default InGame;
