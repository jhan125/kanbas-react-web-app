import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state: any) => state.assignmentReducer.assignments
  );

  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState(existingAssignment?.title || "");
  const [description, setDescription] = useState(
    existingAssignment?.description || ""
  );
  const [points, setPoints] = useState(existingAssignment?.points || 100);
  const [dueDate, setDueDate] = useState(existingAssignment?.dueDate || "");
  const [availableFromDate, setAvailableFromDate] = useState(
    existingAssignment?.availableFromDate || ""
  );
  const [availableUntilDate, setAvailableUntilDate] = useState(
    existingAssignment?.availableUntilDate || ""
  );
  const generateUniqueId = () => Date.now().toString();

  const handleSave = () => {
    const assignmentData = {
      _id: aid || generateUniqueId(),
      title,
      description,
      points,
      dueDate,
      availableFromDate,
      availableUntilDate,
      course: cid,
    };

    if (aid) {
      dispatch(updateAssignment(assignmentData));
    } else {
      dispatch(addAssignment(assignmentData));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" style={{ padding: "20px" }}>
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          <b>Assignment Name</b>
        </label>
        <input
          id="wd-name"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          <b>Description</b>
        </label>
        <textarea
          id="wd-description"
          className="form-control"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col-sm-10">
          <input
            id="wd-points"
            type="number"
            className="form-control"
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-group" className="form-label">
            Assignment Group
          </label>
        </div>
        <div className="col-sm-10">
          <select id="wd-group" className="form-control">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-display-grade-as" className="form-label">
            Display Grade as
          </label>
        </div>
        <div className="col-sm-10">
          <select id="wd-display-grade-as" className="form-control">
            <option value="DISPLAY">Percentage</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-submission-type" className="form-label">
            Submission Type
          </label>
        </div>
        <div className="col-sm-10">
          <div className="form-control d-flex flex-column p-3">
            <select id="wd-submission-type" className="mb-3 form-control">
              <option value="SUBMISSION-TYPE">Online</option>
            </select>
            <div>
              <b>Online Entry Options</b>
              <div>
                <input
                  type="checkbox"
                  id="wd-text-entry"
                  style={{ marginRight: "10px" }}
                />
                <label htmlFor="wd-text-entry">Text Entry</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="wd-website-url"
                  style={{ marginRight: "10px" }}
                />
                <label htmlFor="wd-website-url">Website URL</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="wd-file-upload"
                  style={{ marginRight: "10px" }}
                />
                <label htmlFor="wd-file-upload">File Uploads</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-sm-2 text-end align-middle">
          <label htmlFor="wd-assign-to" className="form-label">
            Assign
          </label>
        </div>
        <div className="col-sm-10">
          <div className="form-control p-3">
            <b>Due</b>
            <label htmlFor="wd-due-date" className="form-label"></label>
            <input
              type="date"
              id="wd-due-date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
            <br />
            <div className="row">
              <div className="col-sm-6">
                <label
                  htmlFor="wd-available-from"
                  className="form-label"
                  style={{ marginRight: "10px" }}
                >
                  <b>Available from</b>
                </label>
                <input
                  type="date"
                  id="wd-available-from"
                  className="form-control"
                  value={availableFromDate}
                  onChange={(e) => setAvailableFromDate(e.target.value)}
                />
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="wd-available-until"
                  className="form-label"
                  style={{ marginRight: "10px" }}
                >
                  <b>Available Until</b>
                </label>
                <input
                  type="date"
                  id="wd-due-date"
                  className="form-control"
                  value={availableUntilDate}
                  onChange={(e) => setAvailableUntilDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleCancel} className="btn btn-secondary me-2">
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}