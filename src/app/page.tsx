export default function home() {
  const user = {
    name: "서진맘",
  };
  return (
    <>
      <div className="home-layout">
        <div className="hello">
          <p>
            안녕하세요 {user.name}님! 👋
            <br /> 무엇을 해볼까요?
          </p>
        </div>
        <div className="scroll-container">
          <div className="scroll-list">
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
          </div>
        </div>
      </div>
    </>
  );
}
