import './styles.css'
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useState } from "react";

export default function KanbasNavigation() {
  // Reference: https://stackoverflow.com/questions/71336965/how-to-load-active-class-for-link-in-react
  // * Selected (active) links have a white background with red text
  // * Non selected links have a black background with white text
  const [activeLink, setActiveLink] = useState('');

  return (
    // 4.1 Styling the Kanbas Navigation Sidebar
    // Navigation sidebar stretches the whole height of the screen && does not scroll with the rest of the Dashboard 
    // disappears when the screen is narrow, but appears again when the the screen widens.
    <div id="wd-kanbas-navigation" style={{ width: 120 }}
      className="list-group rounded-0 position-fixed
          bottom-0 top-0 d-none d-md-block bg-black z-2">
      {/* 
          position-fixed: sidebar stays fixed in one place and doesn't scroll wit the rest of the screen
          bottom-0 top-0: top edge is fixed at the top of screen && bottom edge is fixed at the bottom of screen
          d-none(display: none): element is initially hidden
          d-md-block(display: block): display element when screen width reaches mid sized screens
          z-2 (z-index: 2): brings the element above other elements with a lower z-index. 
          bg-black (background-color: black)
          */}

      {/* Reference: https://getbootstrap.com/docs/5.3/components/list-group/#links-and-buttons */}

      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item bg-black border-0 text-center">
        <img src="/images/NEU.jpg" width="75px" alt="NEU logo" />
      </a>

      <a
        id="wd-account-link"
        href="#/Kanbas/Account"
        className={`list-group-item text-center border-0 
          ${activeLink === 'account' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('account')}>
        <FaRegCircleUser className={`fs-1 ${activeLink === 'account' ? 'text-danger' : 'text-white'}`} />
        <br />
        Account
      </a>

      <a
        id="wd-dashboard-link"
        href="#/Kanbas/Dashboard"
        className={`list-group-item text-center border-0 
          ${activeLink === 'dashboard' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('dashboard')}>
        <AiOutlineDashboard className={`fs-1 ${activeLink === 'dashboard' ? 'text-danger' : 'text-danger'}`} />
        <br />
        Dashboard
      </a>

      <a
        id="wd-course-link"
        href="#/Kanbas/Courses/1234/Home"
        className={`list-group-item text-center border-0 
          ${activeLink === 'courses' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('courses')}>
        <LiaBookSolid className={`fs-1 ${activeLink === 'courses' ? 'text-danger' : 'text-danger'}`} />
        <br />
        Courses
      </a>

      <a
        id="wd-calendar-link"
        href="#/Kanbas/Calendar"
        className={`list-group-item text-center border-0 
          ${activeLink === 'calendar' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('calendar')}>
        <IoCalendarOutline className={`fs-1 ${activeLink === 'calendar' ? 'text-danger' : 'text-danger'}`} />
        <br />
        Calendar
      </a>

      <a
        id="wd-inbox-link"
        href="#/Kanbas/Inbox"
        className={`list-group-item text-center border-0 
          ${activeLink === 'inbox' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('inbox')}>
        <FaInbox className={`fs-1 ${activeLink === 'inbox' ? 'text-danger' : 'text-danger'}`} />
        <br />
        Inbox
      </a>

      <a
        id="wd-labs-link"
        href="#/Labs"
        className={`list-group-item text-center border-0 
          ${activeLink === 'labs' ? 'bg-white text-danger' : 'bg-black text-white'}`}
        onClick={() => setActiveLink('labs')}>
        <IoSettingsOutline className={`fs-1 ${activeLink === 'labs' ? 'text-danger' : 'text-danger'}`} />
        <br />
        Labs
      </a>

    </div>
  );
}