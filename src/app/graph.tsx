"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  scales,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const LineChart = () => {
  const data = {
    labels: ["1학기 중간", "1학기 기말", "2학기 중간", "2학기 기말"],
    datasets: [
      {
        fill: true,
        label: "",
        backgroundColor: "rgba(138, 156, 255)",
        borderColor: "#8a9bff",
        borderRadius: 10,
        data: [89, 88, 65, 73],
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default LineChart;
