"use client";
import { useSession } from "next-auth/react";
import Settimetable from "./settimetable";
import { useEffect, useState} from "react";
export default function setting() {
  const { data: session, loading } = useSession();
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  useEffect(() => {
    if (!loading) {
      setIsLoading(false); // Set loading state to false when session data is loaded
    }
  }, [loading]); 
    if (isLoading) {
      return <p>Loading...</p>; // Show loading text if data is still loading
    } else {
  return (
    <>
      <div>
        <div className="main-container">
          <div className="profile">
          <img className="profileimg"src={session?.user?.image}></img>
          <p>{session?.user?.name}</p>
          <p>성지고등학교</p>
          </div>
        </div>
        <div className="main-container">
          <p>달성한 최대 공부시간</p>
          <p>최근 기록된 공부시간</p>
        </div>
        <Settimetable />
      </div>
    </>
  );
}}
