"use client";
import { useSession } from "next-auth/react";
import Settimetable from "./settimetable";
import { useEffect, useState } from "react";
export default function setting() {
  const { data: session, loading } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    if (!loading) {
      setIsLoading(false); // Set loading state to false when session data is loaded
    }
  }, [loading]);
  if (isLoading) {
    return <video className="로딩" src="/로딩.mp4" autoPlay muted loop />; // Show loading text if data is still loading
  } else {
    if (session) {
      return (
        <>
          <div>
            <div className="home-layout">
              <div className="insert main-container">
                <div className="profile">
                  <img className="profileimg" src={session?.user?.image}></img>
                  <div>
                    <h2>{session?.user?.name}</h2>
                    <p>성지고등학교</p>
                  </div>
                </div>
              </div>
              <div className="main-container">
                <p>달성한 최대 공부시간</p>
                <p>최근 기록된 공부시간</p>
              </div>
            </div>
            <Settimetable />
          </div>
        </>
      );
    } else {
      return (
        <div className="loading">
          로그인이
          <br />
          필요합니다
        </div>
      );
    }
  }
}
