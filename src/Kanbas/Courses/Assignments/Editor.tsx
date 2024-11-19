import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  // get course ID and assignment ID from URL
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState(existingAssignment || {
    title: "",
    description: "",
    points: 0,
    due: "",
    availableFrom: "",
    until: "",
    course: cid,
  });

  const formatDateTime = (dateStr: string) => {
    // parse date string in the format "Month Day at Time" 
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // Handle invalid date

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month (MM)
    const day = date.getDate().toString().padStart(2, '0');           // Day (DD)
    const year = date.getFullYear();                                  // Year (YYYY)

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');    // Minutes (MM)
    const ampm = hours >= 12 ? 'PM' : 'AM';                           // AM/PM

    hours = hours % 12;                                               // Convert to 12-hour format
    hours = hours ? hours : 12;                                       // Adjust 0 to 12 for midnight

    // Construct the final format "MM/DD/YYYY, HH:MM AM/PM"
    // return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`;
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const createAssignment = async (assignment: any) => {
    const newAssignment = await assignmentsClient.createAssignment
      (cid as string, assignment);
    dispatch(addAssignment(newAssignment));
  };

  const saveAssignment = async (assignment: any) => {
    const status = await assignmentsClient.updateAssignment
      (assignment);
    dispatch(updateAssignment(assignment));
  };

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setAssignment({ ...assignment, [name]: value });
  };

  // Handle save button click
  const handleSave = () => {
    try {
      if (existingAssignment) {
        saveAssignment(assignment);
        console.log("updated assignment: ", assignment)
      } else {
        const newAssignment = {
          ...assignment, // Spread the existing `assignment` state
          _id: aid || new Date().getTime().toString(),
          title: assignment.title,
          course: cid || "",
          availableFrom: assignment.availableFrom ? formatDateTime(assignment.availableFrom) : "",
          due: assignment.due ? formatDateTime(assignment.due) : "",
          until: assignment.until ? formatDateTime(assignment.until) : "",
          points: assignment.points,
          description: assignment.description,
        };
        createAssignment(newAssignment);
        console.log("created assignment: ", assignment)
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error when saving assignment: ", error);
    }
  }

  return (
    <div className="container mt-4" id="wd-assignments-editor">

      <form>

        <div className="mb-3 row">
          <label
            htmlFor="wd-name"
            className="col-form-label">
            Assignment Name
          </label>
          <div className="col-sm-10">
            <input
              id="wd-assigment-name"
              name="title"
              className="form-control"
              placeholder={assignment.title}
              value={assignment.title}
              onChange={handleChange}
              readOnly={!isFaculty}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-10">
            <textarea
              name="description"
              className="form-control"
              id="wd-description"
              rows={10}
              placeholder="Assignment description..."
              value={assignment.description}
              onChange={handleChange}
              readOnly={!isFaculty} />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-10">
            <div className="row mb-3">
              <label
                htmlFor="wd-points"
                className="col-sm-4 col-form-label text-end">
                Points
              </label>
              <div className="col-sm-8">
                <input
                  name="points"
                  type="number"
                  className="form-control"
                  id="wd-points"
                  placeholder={"Enter points"}
                  value={assignment.points}
                  onChange={handleChange}
                  readOnly={!isFaculty}
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-group"
                className="col-sm-4 col-form-label text-end">
                Assignment Group
              </label>
              <div className="col-sm-8">
                <select
                  id="wd-group"
                  className="form-select"
                  disabled={!isFaculty}>
                  <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="O1">Option1</option>
                  <option value="O2">Option2</option>
                  <option value="O3">Option3</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-display-grade-as"
                className="col-sm-4 col-form-label text-end">
                Display Grade as
              </label>
              <div className="col-sm-8">
                <select
                  id="wd-display-grade-as"
                  className="form-select"
                  disabled={!isFaculty}>
                  <option selected value="Percentage">Percentage</option>
                  <option value="Points">Points</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-submission-type"
                className="col-form-label col-sm-4 text-end">
                Submission Type
              </label>
              <div className="col-sm-8">
                <div className="p-3 border">
                  <select
                    id="wd-submission-type"
                    className="form-select mb-3"
                    disabled={!isFaculty}>
                    <option selected value="Online">Online</option>
                    <option value="O1">Option1</option>
                    <option value="O2">Option2</option>
                    <option value="O3">Option3</option>
                  </select>

                  <div>
                    <label
                      className="col-form-label col-sm-4 mb-3"
                      style={{ fontWeight: 'bold' }}
                    >
                      Online Entry Options
                    </label>
                    {["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"].map((label, index) => (
                      <div className="form-check mb-3" key={index}>
                        <input
                          type="checkbox"
                          id={`wd-${label.toLowerCase().replace(" ", "-")}`}
                          name={label.replace(" ", "")} // e.g., 'TextEntry', 'WebsiteURL'
                          className="form-check-input"
                          disabled={!isFaculty}
                        />
                        <label
                          htmlFor={`wd-${label.toLowerCase().replace(" ", "-")}`}
                          className="form-check-label">
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {/* <div>
                    <label
                      className="col-form-label col-sm-4 mb-3"
                      style={{ fontWeight: 'bold' }}>
                      Online Entry Options
                    </label>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-text-entry"
                        className="form-check-input" 
                        disabled={!isFaculty}/>
                      <label htmlFor="wd-text-entry" className="form-check-label">
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-website-url"
                        className="form-check-input" 
                        disabled={!isFaculty}/>
                      <label
                        htmlFor="wd-website-url"
                        className="form-check-label">
                        Website URL
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-media-recordings"
                        className="form-check-input" 
                        disabled={!isFaculty}/>
                      <label
                        htmlFor="wd-media-recordings"
                        className="form-check-label">
                        Media Recordings
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-student-annotation"
                        className="form-check-input" 
                        disabled={!isFaculty}/>
                      <label
                        htmlFor="wd-student-annotation"
                        className="form-check-label">
                        Student Annotation
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-file-upload"
                        className="form-check-input" 
                        disabled={!isFaculty}/>
                      <label
                        htmlFor="wd-file-upload"
                        className="form-check-label">
                        File Uploads
                      </label>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="row mb-3 mt-3">
              <label className="col-form-label text-end col-sm-4">
                Assign
              </label>
              <div className="col-sm-8">
                <div className="border p-2">
                  <label
                    htmlFor="wd-assign-to"
                    className="col-form-control text-start col-sm-4 p-2"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Assign to
                  </label>

                  <input
                    type="text"
                    id="wd-assign-to"
                    placeholder="Everyone"
                    className="form-control text-start col-sm-4 p-2"
                    readOnly={!isFaculty} />

                  <label
                    htmlFor="wd-due-date"
                    className="col-form-control text-start col-sm-4 p-2"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Due
                  </label>

                  <input
                    name="due"
                    type="datetime-local"
                    id="wd-due-date"
                    className="form-control date-input"
                    value={assignment.due}
                    onChange={handleChange}
                    readOnly={!isFaculty} />

                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <label
                        htmlFor="wd-available-from"
                        className="col-form-control text-start col-sm-4 p-2"
                        style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                        Available from
                      </label>
                      <input
                        name="availableFrom"
                        type="datetime-local"
                        id="wd-available-from"
                        className="form-control date-input wd-assignment-date"
                        style={{ flex: "1" }}
                        value={assignment.availableFrom}
                        onChange={handleChange}
                        readOnly={!isFaculty} />
                    </div>

                    <div className="col-sm-6">
                      <label
                        htmlFor="wd-available-until"
                        className="col-form-control text-start col-sm-4 p-2"
                        style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                        Until
                      </label>
                      <input
                        name="until"
                        type="datetime-local"
                        id="wd-available-until"
                        value={assignment.until}
                        onChange={handleChange}
                        className="form-control date-input"
                        style={{ flex: "1" }}
                        readOnly={!isFaculty}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            {isFaculty && (
              <div id="wd-modules-controls" className="text-nowrap">
                <button
                  type="button"
                  id="wd-add-module-btn"
                  className="btn btn-lg btn-danger me-1 float-end"
                  onClick={handleSave}
                >
                  Save
                </button>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                  <button
                    type="button"
                    id="wd-add-module-btn"
                    className="btn btn-lg btn-secondary me-1 float-end"
                  >
                    Cancel
                  </button>
                </Link>
              </div>
            )}

          </div>
        </div>
      </form>
    </div>
  );
}