import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faBowlFood,
  faCalendarDays,
  faClock,
  faUserCircle,
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
    route: "../test",
    icon: faClock,
    label: "타이머",
  },
  { route: "../test", icon: faUserCircle, label: "계정" },
  { route: "../test", icon: faCalendarDays, label: "설정" },
];

export default maintabs;
