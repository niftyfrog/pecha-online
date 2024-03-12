import { useEffect } from "react";

const Phase4 = ({ onStart }) => {
  useEffect(() => {
    onStart();
  }, []);

  const handleChangePhase = () => {
    onStart();
  };

  return (
    <div className="phase4">
      <h3>Phase4</h3>
      <p>観戦者は勝敗を決めてください</p>
      <h2>Player1</h2>
      <p>カード名</p>
      <h2>Player2</h2>
      <p>カード名</p>
      <button onClick={handleChangePhase}>終了</button>
    </div>
  );
};

export default Phase4;
