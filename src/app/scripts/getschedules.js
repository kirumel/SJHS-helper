import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default async function getSchedules() {
  const date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");
  let grade = "";
  let clss = "";

  try {
    grade = await AsyncStorage.getItem("grade");
    clss = await AsyncStorage.getItem("clss");
  } catch (e) {
    console.warn(e);
  }

  const params = {
    KEY: "ed2cb8a263374cd1a58583f767e73a31",
    Type: "json",
    SEM: month < 8 ? 1 : 2,
    ATPT_OFCDC_SC_CODE: "C10",
    SD_SCHUL_CODE: "7150455",
    GRADE: "2",
    CLASS_NM: "3",
    ALL_TI_YMD: `${year}${month}${day}`,
  };

  const response = await axios.get("https://open.neis.go.kr/hub/hisTimetable", {
    params,
  });

  if (response.data?.RESULT?.CODE === "INFO-200") {
    return {
      status: "error",
      grade: grade,
      class: clss,
      date: `${month} / ${day}`,
    };
  }

  let schedule = response.data.hisTimetable[1].row[0];

  let todaySchedule = [];

  schedule.reduce((A, I) => {
    todaySchedule.push(I.ITRT_CNTNT);
    return I + 1;
  }, 1);

  return { status: "ok", grade: grade, class: clss, data: todaySchedule };
}
