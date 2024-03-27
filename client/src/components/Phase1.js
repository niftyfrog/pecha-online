import { useEffect } from "react";
import { Roulette } from "./Roulette";

const Phase1 = ({ socket }) => {
  return (
    <div className="phase1">
      <h3>Phase1</h3>
      <p>キャラクターカードを引いてください</p>
      <div className="player1">
        <h2>Player1</h2>
        <Roulette socket={socket} />
      </div>
      <div className="player2">
        <h2>Player2</h2>
        <Roulette socket={socket} />
      </div>
    </div>
  );
};

export default Phase1;
