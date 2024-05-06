"use client";

import React, { useState, useEffect } from "react";
import { getMeal } from "../scripts/getmeal";

interface time {
  status: string;
  date: string;
  data?: string[];
}

export default function Meals() {
  const [meals, setMeals] = useState<time[]>([]);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);

  useEffect(() => {
    async function fetchMeals() {
      const mealsData = await getMeal();
      setMeals(mealsData);
    }
    fetchMeals();
  }, []);

  const nextDate = () => {
    setCurrentDateIndex(currentDateIndex + 1);
  };

  const beforeDate = () => {
    setCurrentDateIndex(currentDateIndex - 1);
  };

  return (
    <>
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
            disabled={currentDateIndex === meals.length - 1}
          >
            &gt;
          </button>
        </div>
      </div>

      {meals.map((meal, index) =>
        index == currentDateIndex ? (
          <div className="dish" key={index}>
            <div className="dish-box">
              <h2 className="dish-date">{meal.date}</h2>
              <p className="dish-icon">🍚</p>
            </div>
            {Array.isArray(meal.data) ? (
              <div className="dish-list">
                {meal.data.map((dish, i) => (
                  <p key={i}># {dish}</p>
                ))}
              </div>
            ) : (
              <p>
                이런! 급식 정보가 없네요
                <br />
                아마 쉬는 날이 아닐까요?
              </p>
            )}
          </div>
        ) : null
      )}
    </>
  );
}
