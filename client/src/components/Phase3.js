import { useEffect } from "react";

const Phase3 = ({ onStart }) => {
  useEffect(() => {
    onStart();
  }, []);

  const handleChangePhase = () => {
    onStart();
  };

  return (
    <div className="phase3">
      <h3>Phase3</h3>
      <p>バトル開始</p>
      <h2>Player1</h2>
      <p>カード名</p>
      <h2>Player2</h2>
      <p>カード名</p>
      <button onClick={handleChangePhase}>終了</button>
    </div>
  );
};

export default Phase3;
