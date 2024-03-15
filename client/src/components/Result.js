import React, { useState, useEffect } from "react";

const Result = ({ onSubmit }) => {
  const [modalState, setModalState] = useState("");

  useEffect(() => {
    if (modalState) {
      onSubmit(modalState);
    }
  }, [modalState, onSubmit]);

  const handleClick = (state) => {
    setModalState(state);
  };
  return (
    <div className="result">
      <h1>Player1の勝ち</h1>
      <button onClick={() => handleClick("InRoom")}>ルームに戻る</button>
    </div>
  );
};

export default Result;
