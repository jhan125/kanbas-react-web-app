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
      {/* 
      <a id="wd-course-home-link"
        href="#/Kanbas/Courses/1234/Home"
         className={`list-group-item text-center border-0 
          ${activeLink === 'home' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('home')}>
        Home
      </a>

      <a id="wd-course-modules-link"
        href="#/Kanbas/Courses/1234/Modules"
        className={`list-group-item text-center border-0 
          ${activeLink === 'modules' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('modules')}>
        Modules
      </a>

      <a id="wd-course-piazza-link"
        href="#/Kanbas/Courses/1234/Piazza"
        className={`list-group-item text-center border-0 
          ${activeLink === 'piazza' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('piazza')}>
        Piazza
      </a>

      <a id="wd-course-zoom-link"
        href="#/Kanbas/Courses/1234/Zoom"
        className={`list-group-item text-center border-0 
          ${activeLink === 'zoom' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('zoom')}>
        Zoom
      </a>

      <a id="wd-course-assignments-link"
        href="#/Kanbas/Courses/1234/Assignments"
        className={`list-group-item text-center border-0 
          ${activeLink === 'assignments' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('assignments')}>
        Assignments
      </a>

      <a id="wd-course-quizzes-link"
        href="#/Kanbas/Courses/1234/Quizzes"
        className={`list-group-item text-center border-0 
          ${activeLink === 'quizzes' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('quizzes')}>
        Quizzes
      </a>


      <a id="wd-course-grades-link"
        href="#/Kanbas/Courses/1234/Grades"
        className={`list-group-item text-center border-0 
          ${activeLink === 'grades' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('grades')}>
        Grades
      </a>

      <a id="wd-course-people-link"
        href="#/Kanbas/Courses/1234/People"
        className={`list-group-item text-center border-0 
          ${activeLink === 'people' ? 'active' : 'text-danger'}`}
        onClick={() => setActiveLink('people')}>
        People
      </a> */}

      {links.map((link, index) => {
        const to = `/Kanbas/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={index}
            to={to}
            className={`list-group-item ${isActive ? "border-left border-black border-3 border-top-0  border-end-0 border-bottom-0 text-black" : "text-danger bg-transparent border border-0"}`}
          >
            {link}
          </Link>
        );
      })}

    </div>
  );
}