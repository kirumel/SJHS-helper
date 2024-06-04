"use client";
import { useState } from "react";

export default function StartRegister({ next }: { next: () => void }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleTrue = () => {
    setIsChecked(!isChecked);
  };

  const handleButtonClick = () => {
    if (isChecked) {
      next();
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <div className="funnel-layout home-layout">
        <div className="register-main">
          <h2 className="start-register-title">
            사용자님의 이메일을 <br />
            알려주세요!
          </h2>
          <p className="subtitle">아래의 이메일을 작성해주세요</p>
          <input
            placeholder="이메일"
            className="start-register-input"
            type="text"
            name="name"
            onChange={(e) => {
              const email = e.target.value;
              const isValid = validateEmail(email);
              setIsChecked(isValid);
            }}
          ></input>
        </div>
        <div className="ok-button-div">
          <button
            className="ok-button"
            type="button"
            disabled={!isChecked}
            onClick={handleButtonClick}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
