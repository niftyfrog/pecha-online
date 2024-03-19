import React, { useEffect, useState } from "react";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";

const InGame = ({ onSubmit }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [modalState, setModalState] = useState("");
  const [phaseTimer, setPhaseTimer] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    //modalstateが変更されれば発火
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
    clearTimeout(phaseTimer); // 前のタイマーをクリアする
    const timer = setTimeout(() => {
      if (currentPhase < 4) {
        setCurrentPhase(phase); // ここで指定されたフェーズに更新
      } else {
        handleClick("Result");
      }
      setRemainingTime(0); // 残り時間をリセット
    }, sec * 1000);
    setPhaseTimer(timer);
    setRemainingTime(sec); // 残り時間を設定
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [remainingTime]);

  return (
    <div className="in-game">
      <h3>InGame</h3>
      <button onClick={() => handleClick("UserNameInput")}>最初に戻る</button>
      <div className="phase1">
        {currentPhase === 1 && <Phase1 onStart={() => handlePhaseTimer(3, 2)} />}
      </div>
      <div className="phase2">
        {currentPhase === 2 && <Phase2 onStart={() => handlePhaseTimer(3, 3)} />}
      </div>
      <div className="phase3">
        {currentPhase === 3 && <Phase3 onStart={() => handlePhaseTimer(3, 4)} />}
      </div>
      <div className="phase4">
        {currentPhase === 4 && <Phase4 onStart={() => handlePhaseTimer(3)} />}
      </div>
      <div className="phaseTimer">
        <div>フェーズ時間: {formatTime(remainingTime)}</div>
      </div>
    </div>
  );
};

export default InGame;
