"use client";

import React, { useState, useEffect } from "react";
import getschedules from "../scripts/getschedules";

interface ScheduleItem {
  status: string;
  grade: string;
  class: string;
  date: string;
  data?: any[];
}

export default function Meals() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  let date = new Date();
  let getday = date.getDate();

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

  const nextDate = () => {
    setCurrentDateIndex(currentDateIndex + 1);
  };

  const beforeDate = () => {
    setCurrentDateIndex(currentDateIndex - 1);
  };

  return (
    <div>
      <div className="left-buttonuse buttonuse">
        <div className="button-box">
          <button
            className="dish-button"
            onClick={beforeDate}
            disabled={currentDateIndex === 0}
          >
            &lt;
          </button>
        </div>
      </div>
      <div className="right-buttonuse buttonuse">
        <div className="button-box">
          <button
            className="dish-button"
            onClick={nextDate}
            disabled={currentDateIndex === schedules.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>
      {schedules.map((schedule, index) =>
        index === currentDateIndex ? (
          <div className="dish" key={index}>
            <div className="dish-box">
              <h2 className="dish-date">시간표</h2>
              <p className="dish-icon">✏️</p> {/* 이모지가 추가된 부분 */}
            </div>
            {Array.isArray(schedule.data) ? (
              <div className="dish-list">
                {schedule.data.map((a, i) => (
                  <p key={i}>{a}</p>
                ))}
              </div>
            ) : (
              <div className="dish-list">
                <p>
                  이런! 시간표 정보가 없네요
                  <br />
                  아마 쉬는 날이 아닐까요?
                </p>
              </div>
            )}
          </div>
        ) : null,
      )}
    </div>
  );
}
