import { useState, useEffect, useRef, memo } from "react";

export const Roulette = memo(({ socket }) => {
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const rouletteContents = [
    "カレー",
    "パスタ",
    "唐揚げ",
    "天ぷら",
    "中華",
    "ハンバーグ",
    "うどん",
    "肉じゃが",
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setIndex((oldIndex) => {
          if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
          return 0;
        });
      }, 50);

      timeoutRef.current = setTimeout(() => {
        setIsRunning(false);
        const interval = setInterval(() => {
          setIndex((oldIndex) => {
            if (oldIndex < rouletteContents.length - 1) return oldIndex + 1;
            return 0;
          });
        }, 200);
        setTimeout(() => clearInterval(interval), 2000);
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
      const charcterCard = rouletteContents[index];
      socket.emit("charCardGet", charcterCard);
    };
  }, [isRunning, socket]);

  const startRoulette = () => {
    setIsRunning(true);
  };

  return (
    <>
      <div>
        <h3>{rouletteContents[index]}</h3>
      </div>
      <button type="button" onClick={startRoulette}>
        カードを引く
      </button>
    </>
  );
});
