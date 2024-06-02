"use client";

export default function StartRegister({ next }: { next: () => void }) {
  return (
    <>
      <div className="funnel-layout home-layout">
        <div className="register-main">
          <h2 className="start-register-title">
            비밀번호를 <br />
            작성해주세요!
          </h2>
          <p className="subtitle">아래의 비밀번호를 작성해주세요</p>
          <input
            placeholder="비밀번호"
            className="start-register-input"
            type="text"
            name="name"
          ></input>
          <input
            style={{ marginTop: "15px" }}
            placeholder="비밀번호 확인"
            className="start-register-input"
            type="text"
            name="name"
          ></input>
        </div>
        <div className="ok-button-div">
          <button className="ok-button" type="button" onClick={next}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}
