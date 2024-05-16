"use client";

import React, { useState, useEffect } from "react";
import getschedules from "../scripts/getschedules";
import { useSession } from "next-auth/react";

interface ScheduleItem {
  status: string;
  grade: string;
  class: string;
  date: string;
  data?: any[];
}

export default function Meals() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const day = ["월", "화", "수", "목", "금"];
  const { data: session } = useSession();

  useEffect(() => {
    const storedSchedules = localStorage.getItem("schedules");

    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    } else {
      fetchSchedules();
    }
  }, []);

  // API에서 시간표 데이터 가져오기
  async function fetchSchedules() {
    const scheduleData = await getschedules();
    setSchedules(scheduleData);

    // 데이터를 로컬 스토리지에 저장
    localStorage.setItem("schedules", JSON.stringify(scheduleData));
  }

  // 슬롯을 수정하는 함수
  const handleSlotEdit = (
    dayIndex: number,
    subjectIndex: number,
    newValue: string
  ) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[dayIndex].data![subjectIndex] = newValue; // 새 값으로 업데이트
    setSchedules(updatedSchedules);

    // 수정된 데이터를 로컬 스토리지에 저장
    localStorage.setItem("schedules", JSON.stringify(updatedSchedules));
  };

  return (
    <div>
      <p>{session?.user?.name}님의 시간표</p>
      <div className="subject-row">
        {schedules.map((schedule, dayIndex) => (
          <div key={dayIndex} className="subject">
            <div className="slot1">{day[dayIndex]}</div>
            {schedule.data &&
              schedule.data.map((subject, subjectIndex) => (
                <div
                  className="slot"
                  key={subjectIndex}
                  onDoubleClick={() => {
                    const newValue =
                      prompt("새로운 내용을 입력하세요:", subject) || subject;
                    handleSlotEdit(dayIndex, subjectIndex, newValue); // 수정된 값 적용
                  }}
                >
                  {subject}
                </div>
              ))}
          </div>
        ))}
      </div>
      <button onClick={fetchSchedules}>초기화</button>
    </div>
  );
}
