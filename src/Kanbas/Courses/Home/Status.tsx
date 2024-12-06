import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { IoMdHome } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { TfiAnnouncement } from "react-icons/tfi";
import { GoBellFill } from "react-icons/go";
import { useSelector } from "react-redux";
import * as userClient from "../../Account/client";

export default function CourseStatus() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const facultyOrAdmin = userClient.isAdmin(currentUser) || userClient.isFaculty(currentUser);

  return (
    <div
      id="wd-course-status"
      style={{ width: "300px", marginLeft: "50px", marginRight: "35px" }}
      className="d-none d-md-block">
      <h2>Course Status</h2>

      <div className="d-flex">
        <div className="w-50 pe-1">
          {facultyOrAdmin && (
            <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
              <MdDoNotDisturbAlt className="me-2 fs-5" />
              Unpublish </button>
          )}
        </div>

        <div className="w-50">
          {facultyOrAdmin && (
            <button className="btn btn-lg btn-success w-100">
              <FaCheckCircle className="me-2 fs-5" />
              Publish </button>
          )}
        </div>

      </div>
      <br />

      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <BiImport className="me-2 fs-5" />
          Import Existing Content
        </button>
      )}

      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <LiaFileImportSolid className="me-2 fs-5" />
          Import from Commons
        </button>
      )}

      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <IoMdHome className="me-2 fs-5" />
          Choose Home Page
        </button>
      )}


      <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
        <FaChartSimple className="me-2 fs-5" />
        View Course Screen
      </button>


      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <TfiAnnouncement className="me-2 fs-5" />
          New Announcement
        </button>
      )}

      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <FaChartSimple className="me-2 fs-5" />
          New Analytics
        </button>
      )}

      {facultyOrAdmin && (
        <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
          <GoBellFill className="me-2 fs-5" />
          View Course Notifications
        </button>
      )}

    </div>
  );
}
