import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as client from "./client";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kanbas/Account/${link}`}
          id="wd-link"
          className={`border border-0 list-group-item
                ${
                  pathname.includes(link) ? "active text-black" : "text-danger"
                }`}
        >
          {" "}
          {link}{" "}
        </Link>
      ))}

      {currentUser &&
        (client.isAdmin(currentUser) || client.isFaculty(currentUser)) && (
          <Link
            to={`/Kanbas/Account/Users`}
            className={`list-group-item text-danger border border-0 ${active(
              "Users"
            )}`}
          >
            Users
          </Link>
        )}
    </div>
  );
}
