import { BsGripVertical } from "react-icons/bs";
import { FaSortDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import AssignmentControls from "./AssignmentControls";
import TaskControlButtons from "./TaskControlButtons";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as courseClient from "../client";
import { setAssignments, addAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { useEffect } from "react";
import * as assignmentClient from "./client";

export default function Assignments(
  { courses
  }: {
    courses: any[];
  }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await courseClient.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const removeAssignment = async (assignmentId: string) => {
    await assignmentClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // invalid date

    // extract individual components
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // AM/PM for 12-hour format
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12 for midnight

    // format string
    return `${month} ${day} at ${hours}:${minutes}${ampm}`;
  };

  return (
    <div className="d-flex" id="wd-assignments">
      <div className="flex-fill">
        <div className="me-4 ms-5">
          <AssignmentControls /><br /><br /><br /><br />

          <ul id="wd-assignment-list" className="list-group rounded-0">

            <li className="wd-assignments list-group-item p-0 mb-5 fs-5 border-gray">

              <div className="wd-assignments-title p-4 ps-2 bg-secondary">

                {/* Only faculty can manage modules' sequences */}
                {currentUser.role === "FACULTY" &&
                  (<BsGripVertical className="me-2 fs-3" />)}

                <FaSortDown className="mb-3 me-2" />

                <strong className="mx-2 mb-2">ASSIGNMENTS</strong>

                {/* Only faculty can see assignments percentage */}
                {currentUser.role === "FACULTY" && (
                  <>
                    <IoEllipsisVertical className="float-end mt-2 mx-1 " />
                    <GoPlus className="float-end mt-2 mx-1" />
                    <button className="btn float-end btn-light btn-outline-secondary rounded-pill text-black mx-2">
                      40% of Total
                    </button>
                  </>
                )}
              </div>

              {/* border to the left of the line items must be rendered green  */}
              {assignments
                .filter((assignment: any) => assignment.course === cid)

                .map((assignment: any) => (
                  <ul
                    key={assignment._id}
                    className="wd-lessons list-group rounded-0"
                    style={{
                      borderLeftWidth: "thick",
                      borderLeftColor: "green",
                      borderLeftStyle: "solid",
                    }}>

                    <li
                      className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        <a
                          className="wd-assignment-link"
                          href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                          <TaskControlButtons />
                        </a>

                        <div>
                          <h4 className="mb-0">
                            <strong>
                              <a
                                className="wd-assignment-link text-dark"
                                href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                {assignment.title}
                              </a>
                            </strong>
                          </h4>

                          <div>
                            <span className="text-danger me-2">
                              Multiple Modules
                            </span>
                            |
                            <span className="text-muted m-2">
                              <strong> Not available until  </strong>
                              {/* {assignment.availableFrom} */}
                              {formatDateTime(assignment.availableFrom)}
                            </span>
                            |
                            <span className="text-muted m-2">
                              <strong> Due </strong>
                              {/* {assignment.due} */}
                              {formatDateTime(assignment.due)}
                            </span>
                            |
                            <span className="text-muted m-2">
                              {assignment.points} pts
                            </span>
                          </div>

                        </div>
                      </div>

                      {currentUser.role === "FACULTY" &&
                        (<AssignmentControlButtons
                          assignmentId={assignment._id} />)
                      }
                    </li>
                  </ul>
                ))}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}