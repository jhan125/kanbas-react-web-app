import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";

export default function AssignmentSaveButtons({
  assignmentId,
  title,
  availableDate,
  dueDate,
  availableUntil,
  points,
  description,
}: {
  assignmentId: string,
  title: string,
  availableDate: string,
  dueDate: string,
  points: number,
  description: string,
  availableUntil: string
}) {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // format date so it displays as "Month Day at Time" 
  const formatDateTimeForDisplay = (dateStr: string) => {
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

  // Handle save button click
  const handleSave = () => {
    const updatedAssignment = {
      _id: aid || new Date().getTime().toString(),
      title,
      course: cid || "",
      availableDate: formatDateTimeForDisplay(availableDate),
      dueDate: formatDateTimeForDisplay(dueDate),
      availableUntil: formatDateTimeForDisplay(availableUntil),
      points,
      description,
    };

    if (assignmentId) {
      dispatch(updateAssignment(updatedAssignment));
    } else {
      dispatch(addAssignment(updatedAssignment));
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