import Link from "next/link";
import Homeschedule from "./homeschedules";
import Hometimetable from "./hometimetable";
import maintaps from "./maintabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hello from "./hellohome";

export default function home() {
  return (
    <>
      <div className="home-layout">
        <Hello />
        <div className="main-container">
          <div className="event-imgbox">
            <Link
              href="./indetail"
              className="main-container-display margin-bottom-15"
            >
              <p>교내 행사 및 홍보</p>
              <button className="icon-gt snowgray">&gt;</button>
            </Link>
            <div className="main-event-img"></div>
          </div>
        </div>
        <div className="main-container">
          <p className="notice">공지사항 ㅣ</p>
        </div>
        <div className="main-container">
          <div className="scroll-containercenter">
            <div className="scroll-container">
              <div className="scroll-list">
                {maintaps.map((tab, index) => (
                  <Link href={tab.route} className="box" key={index}>
                    <div className="maintab-container">
                      <FontAwesomeIcon
                        className="maintab-icon"
                        icon={tab.icon}
                      />
                      <div className="maintab-label">{tab.label}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="main-container-display">
          <div className="main-container-50">
            <div className="main-container ">
              <Link
                href="./schedules"
                className="main-container-display margin-bottom-15"
              >
                <p>
                  오늘의 시간표
                  <br />
                  🕒📖
                </p>
              </Link>
              <Hometimetable />
            </div>
          </div>
          <div className="main-container-50">
            <div className="main-container ">
              <Link
                href="./meals"
                className="main-container-display margin-bottom-15"
              >
                <p>
                  오늘의 식단 <br />
                  🍚🥢
                </p>
              </Link>
              <Homeschedule />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
