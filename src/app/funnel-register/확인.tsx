import { useEffect, useState } from "react";

export default function StartRegister(props: any) {
  const { email, password, name, nickname, id } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttoncomment, setButtoncomment] = useState<string>("");
  useEffect(() => {
    if (showPassword) {
      setButtoncomment("비밀번호 보기");
    } else {
      setButtoncomment("비밀번호 가리기");
    }
  });

  return (
    <>
      <div className="funnel-layout home-layout">
        <div className="register-main">
          <h2 className="start-register-title">
            입력하신 사용자님의 정보를 <br />
            확인해볼까요?
          </h2>
          <p className="subtitle">아래의 정보를 확인해주세요</p>
          <div className="card-display">
            <div className="card">
              <div style={{ display: "flex", justifyContent: "right" }}>
                <h1
                  style={{
                    marginTop: "3rem",
                    fontSize: "2.3rem",
                  }}
                >
                  {name}
                </h1>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <p className="subtitlewhite margin0">이메일</p>
                <p className="margintop0">{email}</p>
                <p className="subtitlewhite margin0">비밀번호</p>
                <p className="margintop0">
                  {showPassword ? <span>{password}</span> : null}
                  <span>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {buttoncomment}
                    </button>
                  </span>
                </p>
                <p className="subtitlewhite margin0">닉네임</p>
                <p className="margintop0">{nickname}</p>
                <p className="subtitlewhite margin0">id</p>
                <p className="margintop0">{id}</p>
              </div>
            </div>
          </div>
          <div className="ok-button-div">
            <form action="/api/post/regist" method="POST">
              <input
                style={{ display: "none" }}
                name="email"
                placeholder="이메일"
                value={email}
              />
              <input
                style={{ display: "none" }}
                name="password"
                placeholder="비밀번호"
                value={password}
              />
              <input
                style={{ display: "none" }}
                name="name"
                placeholder="이름"
                value={name}
              />
              <input
                style={{ display: "none" }}
                name="nickname"
                placeholder="닉네임"
                value={nickname}
              />
              <input
                style={{ display: "none" }}
                name="handle"
                placeholder="id"
                value={id}
              />
              <button className="ok-button" type="submit">
                맞아요
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
