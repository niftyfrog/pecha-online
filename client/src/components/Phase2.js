import React, { useEffect } from "react";

const Phase2 = ({ onStart }) => {
  useEffect(() => {
    onStart();
  }, []);
  return (
    <div className="phase2">
      <h3>Phase2</h3>
      <p>特徴カードを引いてください</p>
      <h2>Player1</h2>
      <button>カードを引く</button>
      <h2>Player2</h2>
      <button>カードを引く</button>
    </div>
  );
};

export default Phase2;
