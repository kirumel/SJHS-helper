import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faBowlFood,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const maintabs = [
  {
    route: "../devcomment",
    icon: faCircleInfo,
    label: "앱 정보",
  },
  {
    route: "../meals",
    icon: faBowlFood,
    label: "식단표",
  },
  {
    route: "../schedules",
    icon: faCalendarDays,
    label: "시간표",
  },
  {
    route: "/funnel-register",
    icon: faClock,
    label: "타이머",
  },
];

export default maintabs;
