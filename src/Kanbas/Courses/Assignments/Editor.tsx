import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import AssignmentsSaveButtons from "./AssignmentSaveButtons";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  // get course ID and assignment ID from URL
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get assignments from Redux store and find the current assignment by ID
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === aid);


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

  // track form inputs
  const [title, setTitle] = useState(assignment ? assignment.title : "New Assignment");
  const [description, setDescription] = useState(assignment ? assignment.description : "New Assignment Description");
  const [points, setPoints] = useState(assignment ? assignment.points : 100);
  const [dueDate, setDueDate] = useState(formatDateTime(assignment ? assignment.dueDate : ""));
  const [availableDate, setAvailableDate] = useState(formatDateTime(assignment ? assignment.availableDate : ""));
  const [availableUntil, setAvailableUntil] = useState(formatDateTime(assignment ? assignment.availableUntil : ""));

  // when click "save", updateor add an assignment based on existence of assignment
  const handleSave = () => {
    if (assignment) { // if this assignment already exists
      dispatch(
        updateAssignment({
          _id: aid,
          title,
          course: cid,
          availableDate: availableDate,
          dueDate: dueDate,
          points,
          description,
          availableUntil
        })
      );
    } else { // if not exists, add a new assignment
      const newAssignmentId = new Date().getTime().toString();
      dispatch(
        addAssignment({
          _id: newAssignmentId,
          title,
          course: cid,
          availableDate: availableDate,
          dueDate: dueDate,
          points,
          description,
          availableUntil
        })
      );
      navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignmentId}`);
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

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
              className="form-control"
              placeholder={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              readOnly={!isFaculty}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id="wd-description"
              rows={10}
              placeholder="Assignment description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                  type="number"
                  className="form-control"
                  id="wd-points"
                  placeholder={String(points)}
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
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
                          className="form-check-input"
                          disabled={!isFaculty}
                        />
                        <label htmlFor={`wd-${label.toLowerCase().replace(" ", "-")}`} className="form-check-label">
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

                  {/* <div className="border p-2">
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{
                        backgroundColor: "#F0F0F0",
                        width: "130px",
                        height: "40px",
                        borderRadius: "5px",
                      }}
                    >
                      <p className="m-3">Everyone</p>
                      <div className="m-2">
                        <RxCross2 />
                      </div>
                    </div>
                  </div> */}

                  <label
                    htmlFor="wd-due-date"
                    className="col-form-control text-start col-sm-4 p-2"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Due
                  </label>

                  <input
                    type="datetime-local"
                    id="wd-due-date"
                    className="form-control date-input"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
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
                        type="datetime-local"
                        id="wd-available-from"
                        className="form-control date-input wd-assignment-date"
                        style={{ flex: "1" }}
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
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
                        type="datetime-local"
                        id="wd-available-until"
                        value={availableUntil}
                        onChange={(e) => setAvailableUntil(e.target.value)}
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

            {/* {isFaculty &&
              <AssignmentsSaveButtons onSave={handleSave} />} */}

            {isFaculty && (
              <AssignmentsSaveButtons
                assignmentId={assignment}
                title={title}
                availableDate={availableDate}
                dueDate={dueDate}
                availableUntil={availableUntil}
                points={points}
                description={description}
              />
            )}

          </div>
        </div>
      </form>
    </div>
  );
}
