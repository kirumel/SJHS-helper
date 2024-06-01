"use client";

export default function StartRegister({ next }: { next: () => void }) {
  return (
    <>
      <div className="home-layout">
        <h1 className="start-register-title">이용약관 동의</h1>
        <div className="start-register-content">
          <p>먼저 아래의 이용약관을 읽어주세요</p>
        </div>
        <input type="checkbox" />
        <p> 약관을 모두 확인하였으며 위 약관을 동의합니다</p>
        <button className="ok-button" type="button" onClick={next}>
          확인했어요
        </button>
      </div>
    </>
  );
}
