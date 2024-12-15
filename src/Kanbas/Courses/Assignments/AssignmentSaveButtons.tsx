import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { useEffect, useState } from "react";

export default function AssignmentSaveButtons({
  assignmentId,
  title,
  availableFrom,
  due,
  until,
  points,
  description,
}: {
  assignmentId: string,
  title: string,
  availableFrom: string,
  due: string,
  points: number,
  description: string,
  until: string
}) {
  const { cid, aid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find((a: any) => a._id === aid);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(existingAssignment || {
    title: "",
    description: "",
    points: 0,
    due: "",
    availablFrom: "",
    until: "",
    course: cid,
  });

  // format date so it displays as "Month Day at Time" 
  const formatDateTimeForDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // invalid date

    // extract individual components
    const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC"});
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

  const createAssignment = async (assignment: any) => {
    const newAssignment = await assignmentsClient.createAssignment(cid as string, assignment);
    dispatch(addAssignment(newAssignment));
  };

  const saveAssignment = async (assignment: any) => {
    const status = await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  // Handle save button click
  const handleSave = async () => {
    if (existingAssignment) {
      saveAssignment(assignment);
    } else {
      const newAssignment = {
        _id: aid || new Date().getTime().toString(),
        title,
        course: cid || "",
        availableFrom: formatDateTimeForDisplay(availableFrom),
        due: formatDateTimeForDisplay(due),
        until: formatDateTimeForDisplay(until),
        points,
        description,
      };
      createAssignment(newAssignment);
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button
        id="wd-add-module-btn"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={handleSave}
      >
        Save
      </button>
      <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
        <button
          id="wd-add-module-btn"
          className="btn btn-lg btn-secondary me-1 float-end"
        >
          Cancel
        </button>
      </Link>
    </div>
  );
}