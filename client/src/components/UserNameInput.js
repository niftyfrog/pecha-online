const UserNameInput = ({ onSubmit }) => {
  const handleSubmit = () => {
    // フォームの値を処理する
    onSubmit(); // 状態を更新してコンポーネントを切り替える
  };

  return (
    <div>
      <h3>UserNameInput</h3>
      <input type="text" />
      <button onClick={handleSubmit} variant="contained">
        次へ
      </button>
      <p>a</p>
    </div>
  );
};

export default UserNameInput;
