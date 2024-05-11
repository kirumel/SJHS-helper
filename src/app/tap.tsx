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
    route: "/test",
    icon: faClock,
    label: "타이머",
  },
  {
    route: "/intro",
    icon: faUserCircle,
    label: "계정",
  },
];

export default tabs;
