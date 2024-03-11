import { Button } from "@mui/material";
import styled from "@emotion/styled";

const Phase2 = () => {
  return (
    <div className="phase2">
      <h3>Phase2</h3>
      <p>特徴カードを引いてください</p>
      <h2>Player1</h2>
      <Button>カードを引く</Button>
      <h2>Player2</h2>
      <Button>カードを引く</Button>
    </div>
  );
};

export default Phase2;
