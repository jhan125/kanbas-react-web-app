import { Link } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

export default function CoursesNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People"
  ];
  const { cid } = useParams();
  const { pathname } = useLocation();

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => {
        const to = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={index}
            to={to}
            className={`list-group-item 
              ${
                isActive
                  ? "border-left border-black border-3 border-top-0  border-end-0 border-bottom-0 text-black"
                  : "text-danger bg-transparent border border-0"
              }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}
