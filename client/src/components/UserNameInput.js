import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

const UserNameInput = ({ onSubmit }) => {
  const [UserName, setUserName] = useState("");
  const handleSubmit = () => {
    // フォームの値を処理する
    console.log(UserName);
    socket.emit("user_name", { userID: socket.id, username: UserName });
    //onSubmit(); 状態を更新してコンポーネントを切り替える
  };

  return (
    <div>
      <h3>UserNameInput</h3>
      <input
        type="text"
        placeholder="UserName"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <button onClick={handleSubmit} variant="contained">
        次へ
      </button>
    </div>
  );
};

export default UserNameInput;
