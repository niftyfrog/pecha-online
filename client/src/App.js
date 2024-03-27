import UserNameInput from "./components/UserNameInput";
import Header from "./components/Header";
// import RoomJoin from "./components/RoomJoin";
import InRoom from "./components/InRoom";
import InGame from "./components/InGame";
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:4000");

function App() {
  const [gameState, setGameState] = useState("UserNameInput");
  const [userInfo, setUserInfo] = useState("");

  socket.on("userInfo", (data) => {
    setUserInfo(data);
  });

  const renderScene = () => {
    switch (gameState) {
      case "UserNameInput":
        return <UserNameInput socket={socket} onSubmit={() => setGameState("InRoom")} />;
      case "InRoom":
        return (
          <InRoom userInfo={userInfo} socket={socket} onSubmit={(data) => setGameState(data)} />
        );
      case "InGame":
        return (
          <InGame userInfo={userInfo} socket={socket} onSubmit={(data) => setGameState(data)} />
        );
      default:
        return null;
    }
  };
  return (
    <div className="app">
      <div className="header">
        <Header />
      </div>
      <div className="content">{renderScene()}</div>
    </div>
  );
}
// function App() {
//   const [gameState, setGameState] = useState("UserNameInput");
//   const renderScene = () => {
//     switch (gameState) {
//       case "UserNameInput":
//         console.log(gameState);
//         return <UserNameInput onSubmit={() => setGameState("RoomJoin")} />;
//       case "RoomJoin":
//         console.log(gameState);
//         return <RoomJoin onSubmit={(data) => setGameState(data)} />;
//       case "InRoom":
//         console.log(gameState);
//         return <InRoom onSubmit={(data) => setGameState(data)} />;
//       case "InGame":
//         console.log(gameState);
//         return <InGame onSubmit={(data) => setGameState(data)} />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div className="app">
//       <div className="header">
//         <Header />
//       </div>
//       <div className="content">{renderScene()}</div>
//     </div>
//   );
// }

export default App;
