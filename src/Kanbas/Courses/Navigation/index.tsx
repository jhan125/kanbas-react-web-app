import { useState } from "react";

export default function CoursesNavigation() {
  const [activeLink, setActiveLink] = useState('');

  return (

    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">

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
      </a>

    </div>
  );
}