import { useEffect, useState } from "react";

export default function StartRegister(props: any) {
  const { email, password, name, nickname, id } = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [buttoncomment, setButtoncomment] = useState<string>("");
  useEffect(() => {
    if (showPassword) {
      setButtoncomment("카드보기");
    } else {
      setButtoncomment("가리기");
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
          <div>
            <p>{name}</p>
            <p>{email}</p>
            <p>
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
            <p>{nickname}</p>
            <p>{id}</p>
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
