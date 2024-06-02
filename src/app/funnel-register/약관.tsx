"use client";

export default function StartRegister({ next }: { next: () => void }) {
  return (
    <>
      <div className="funnel-layout home-layout">
        <div className="register-main">
          <video
            src="/초.mp4"
            style={{ margin: 0 }}
            autoPlay
            muted
            loop
            width={30}
            height={30}
          />
          <h2 className="start-register-title">이용약관 동의</h2>
          <div className="start-register-content">
            <p>먼저 아래의 이용약관을 읽어주세요</p>
          </div>
          <a className="register" href="https://www.youtube.com/">
            &gt; 개인정보 처리방침
          </a>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input className="custom-checkbox" type="checkbox" />
            <p>
              위 약관을 모두 확인하였으며 <br />본 약관에 동의합니다
            </p>
          </div>
        </div>
        <div className="ok-button-div">
          <button className="ok-button" type="button" onClick={next}>
            회원가입 하러가기
          </button>
        </div>
      </div>
    </>
  );
}
