import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  {
    route: "/",
    icon: faHome,
    label: "홈",
  },
  {
    route: "/meals",
    icon: faSearch,
    label: "식단표",
  },
  {
    route: "/login",
    icon: faUserCircle,
    label: "계정",
  },
];

export default tabs;
