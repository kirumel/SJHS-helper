import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlFood,
  faHome,
  faUserCircle,
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  {
    route: "/",
    icon: faHome,
    label: "홈",
  },
  {
    route: "/meals",
    icon: faBowlFood,
    label: "식단표",
  },
  {
    route: "/schedules",
    icon: faCalendarDays,
    label: "시간표",
  },
  {
    route: "/timer",
    icon: faClock,
    label: "타이머",
  },
  {
    route: "/cafe",
    icon: faClock,
    label: "게시판",
  },
  {
    route: "/setting",
    icon: faUserCircle,
    label: "마이",
  },
];

export default tabs;
