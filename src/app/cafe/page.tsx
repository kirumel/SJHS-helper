import cafetap from "./cafetap";
import "./cafe.css";
import Cafe from "./cafe";
export default function Page() {
  return (
    <>
      <h2 className="cafe-home-title padding1 bottom-padding0">커뮤니티</h2>
      <div className="scroll-container padding1">
        {cafetap.map((array, i) => (
          <div className="scroll-list" key={i}>
            <div className="cafe-scroll-box">{array.label}</div>
          </div>
        ))}
      </div>
      <div className="line"></div>
      <div>
        <Cafe />
      </div>
    </>
  );
}
