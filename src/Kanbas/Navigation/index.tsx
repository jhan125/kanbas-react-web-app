import "./styles.css";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export default function KanbasNavigation() {
  // Reference: https://stackoverflow.com/questions/71336965/how-to-load-active-class-for-link-in-react
  // * Selected (active) links have a white background with red text
  // * Non selected links have a black background with white text
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kanbas/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kanbas/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kanbas/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  return (
    // 4.1 Styling the Kanbas Navigation Sidebar
    // Navigation sidebar stretches the whole height of the screen && does not scroll with the rest of the Dashboard
    // disappears when the screen is narrow, but appears again when the the screen widens.
    <div
      id="wd-kanbas-navigation"
      style={{ width: 120 }}
      className="list-group rounded-0 position-fixed
          bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center" rel="noreferrer"
      >
        <img src="/images/NEU.jpg" width="75px" alt="NEU logo" />
      </a>

      <Link
        key="/Kanbas/Account"
        to="/Kanbas/Account"
        className={`list-group-item text-center border-0 bg-black
        ${
          pathname.includes("Account")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 
          ${pathname.includes("Account") ? "text-danger" : "text-white"}`}
        />
        <br />
        Account
      </Link>

      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          className={`list-group-item bg-black text-center border-0
          ${
            pathname.includes(link.label)
              ? "text-danger bg-white"
              : "text-white bg-black"
          }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </Link>
      ))}
    </div>
  );
}
