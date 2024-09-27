import { BsGripVertical } from "react-icons/bs";
import { FaSortDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { MdOutlineAssignment } from "react-icons/md";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";

export default function Assignment() {
  return (
    <div id="wd-assignments">
      <AssignmentControls /><br /><br /><br /><br />

      <ul id="wd-assignments" className="list-group rounded-0">

        <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">

          <div className="wd-assignments-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />

            <FaSortDown className="mb-3" />
            
            <strong className="mx-2 mb-2">ASSIGNMENTS</strong>

            <IoEllipsisVertical className="float-end mt-2 mx-1 " />

            <GoPlus className="float-end mt-2 mx-1" />
        
            <button className="btn float-end btn-light btn-outline-secondary rounded-pill text-black mx-2">
              40% of Total
            </button>

          </div>

          {/* border to the left of the line items must be rendered green  */}
          <ul
            className="wd-lessons list-group rounded-0"
            style={{
              borderLeftColor: "green",
              borderLeftStyle: "solid",
            }}
          >
            <li className="wd-lesson list-group-item p-0">
              <div className="wd-lesson-content p-3 ps-1">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-2 fs-3 icon-green" />
                  A1
                  <LessonControlButtons />
                  <br />
                </a>
                <div className="px-4 mx-5">
                  <span className="text-danger">Multiple Modules | </span>
                  <strong>Not available until </strong>
                  <span>May 6 at 12:00am |</span>
                  <br />
                  <strong>Due </strong>
                  <span>May 13 at 11:59pm | 100 pts</span>
                </div>
              </div>
            </li>
          </ul>

          <ul
            className="wd-lessons list-group rounded-0"
            style={{
              borderLeftColor: "green",
              borderLeftStyle: "solid",
            }}
          >
            <li className="wd-lesson list-group-item p-0">
              <div className="wd-lesson-content p-3 ps-1">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-2 fs-3 icon-green" />
                  A2
                  <LessonControlButtons />
                  <br />
                </a>
                <div className="px-4 mx-5">
                  <span className="text-danger">Multiple Modules | </span>
                  <strong>Not available until </strong>
                  <span>May 13 at 12:00am |</span>
                  <br />
                  <strong>Due </strong>
                  <span>May 20 at 11:59pm | 100 pts</span>
                </div>
              </div>
            </li>
          </ul>

          <ul
            className="wd-lessons list-group rounded-0"
            style={{
              borderLeftColor: "green",
              borderLeftStyle: "solid",
            }}
          >
            <li className="wd-lesson list-group-item p-0">
              <div className="wd-lesson-content p-3 ps-1">
                <a
                  className="wd-assignment-link"
                  href="#/Kanbas/Courses/1234/Assignments/123"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <MdOutlineAssignment className="me-2 fs-3 icon-green" />
                  A3
                  <LessonControlButtons />
                  <br />
                </a>
                <div className="px-4 mx-5">
                  <span className="text-danger">Multiple Modules | </span>
                  <strong>Not available until </strong>
                  <span>May 20 at 12:00am |</span>
                  <br />
                  <strong>Due </strong>
                  <span>May 27 at 11:59pm | 100 pts</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  );
}