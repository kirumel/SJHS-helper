"use client";

export default function StartRegister({ next }: { next: () => void }) {
  return (
    <div className="funnel-layout home-layout">
      <div className="register-main">
        <h1 className="start-register-title">회원가입 하기</h1>
        <div className="start-register-content">
          <p>
            회원가입 하면 SJHS-helper의
            <br /> 모든 서비스를 이용 가능해요! 📱
          </p>
          <p>
            다음 화면에 나오는 개인정보 이용약관은 <br />
            모두 확인해주세요! ✅
          </p>
          <p>회원가입은 약 3분정도 소요됩니다</p>
        </div>
      </div>
      <div className="ok-button-div">
        <button className="ok-button" type="button" onClick={next}>
          회원가입 하러가기
        </button>
      </div>
    </div>
  );
}
