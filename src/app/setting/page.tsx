"use client";
import { useSession } from "next-auth/react";
import Settimetable from "./settimetable";
export default function setting() {
  const { data: session } = useSession();
  return (
    <>
      <div>
        <div className="main-container">
          <img src={session?.user?.image}></img>
          <p>{session?.user?.name}</p>
          <p>성지고등학교</p>
        </div>
        <div className="main-container">
          <p>달성한 최대 공부시간</p>
          <p>최근 기록된 공부시간</p>
        </div>
        <Settimetable />
      </div>
    </>
  );
}
