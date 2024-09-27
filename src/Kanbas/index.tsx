import "./styles.css";
import { Route, Routes, Navigate } from "react-router"
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kanbas() {
  return (
    <div id="wd-kanbas" className="h-100">

      {/* Fill the vertical space completely with both the sidebar and the main content */}
      <div className="d-flex h-100">

        {/* The whole sidebar must have a black background */}
        <div className="d-none d-md-block bg-black">
          <KanbasNavigation />
        </div>

        <div className="wd-main-content-offset p-3">
          <Routes>
            {/* The Kanbas Dashboard link must be the default screen when navigating to Kanbas */}
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Courses/:cid/*" element={<Courses />} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}