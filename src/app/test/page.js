"use client";

import React from "react";
import { useTimer } from "react-timer-hook";
function MyTimer({ expiryTimestamp }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });
  return (
    <div style={{ textAlign: "center" }}>
      <div className="main-timer-title">타이머</div>
      <div className="main-timer-container">
        <div className="main-timer">
          <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
        <p>{isRunning ? "시간이 흘러가고 있어요" : "일시정지"}</p>
      </div>
      <div className="main-timer-buttons">
        <button onClick={start}>시작</button>
        <button onClick={pause}>일시정지</button>
        <button
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            {
              restart(time);
              pause();
            }
          }}
        >
          재설정
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds()); // 10 minutes timer
  return (
    <div>
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
