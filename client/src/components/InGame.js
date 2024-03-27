import React, { useEffect, useState } from "react";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";

const InGame = ({ socket, onSubmit }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [modalState, setModalState] = useState("");
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
    socket.on("phaseUpdate", ({ currentPhase, remainingTime }) => {
      setCurrentPhase(currentPhase);
      setRemainingTime(remainingTime);
    });
  }, [modalState, onSubmit, socket]);

  const handleClick = (state) => {
    setModalState(state);
  };

  const handleStartGame = () => {
    socket.emit("startGame");
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
      <button onClick={handleStartGame}>ゲーム開始</button>
      <div className="phase1">{currentPhase === 1 && <Phase1 socket={socket} />}</div>
      <div className="phase2">{currentPhase === 2 && <Phase2 />}</div>
      <div className="phase3">{currentPhase === 3 && <Phase3 />}</div>
      <div className="phase4">{currentPhase === 4 && <Phase4 />}</div>
      <div className="phaseTimer">
        <div>フェーズ時間: {formatTime(remainingTime)}</div>
      </div>
    </div>
  );
};

export default InGame;
