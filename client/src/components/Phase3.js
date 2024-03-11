import { useEffect, useState } from "react";

const Phase3 = ({ onSubmit }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [currentTime, setCurrentTime] = useState(3);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    onSubmit();
  }, []);

  const handleChangePhase = () => {
    onSubmit();
  };

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="phase3">
      <h3>Phase3</h3>
      <p>バトル開始</p>
      <h2>Player1</h2>
      <p>カード名</p>
      <h2>Player2</h2>
      <p>カード名</p>
      <div>残り時間: {formatTime(currentTime)}</div>
      <button onClick={handleChangePhase}>終了</button>
    </div>
  );
};

export default Phase3;
