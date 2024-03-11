import { useEffect } from "react";

const Phase1 = ({ onStart }) => {
  useEffect(() => {
    onStart();
  }, []);
  return (
    <div className="phase1">
      <h3>Phase1</h3>
      <p>キャラクターカードを引いてください</p>
      <h2>Player1</h2>
      <button>カードを引く</button>
      <h2>Player2</h2>
      <button>カードを引く</button>
    </div>
  );
};

export default Phase1;
