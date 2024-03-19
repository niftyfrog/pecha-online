import React, { useState, useEffect } from "react";

const UserNameInput = ({ socket, onSubmit }) => {
  const [UserName, setUserName] = useState("");
  const handleSubmit = () => {
    // フォームの値を処理する
    socket.emit("user_name", { userID: socket.id, username: UserName });
    onSubmit(); //状態を更新してコンポーネントを切り替える
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
