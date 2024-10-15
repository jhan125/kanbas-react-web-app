import "./styles.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const assignmentName = pathname.split("/")[5];
  const assignments = db.assignments.filter(
    (assignment) => assignment._id === assignmentName
  );

  return (
    <div className="container mt-4" id="wd-assignments-editor">

      <form>

        <div className="row mb-3">
          <label htmlFor="wd-name" className="col-form-label">
            Assignment Name
          </label>
          {assignments.map((assignment) => (
            <div className="col-sm-10">
              <input
                type="text"
                id={`wd-title-${assignment._id}`}
                value={assignment.title}
                className="form-control"
              />
            </div>
          ))}
        </div>
        
        <div className="mb-3 row">
          <div className="col-sm-10">
            <div id="wd-description" className="p-3 border">
              <p>
                The assignment is
                <span className="text-danger"> available online</span>
              </p>
              <p>
                Submit a link to the landing page of your Web application
                running on Netlify.
              </p>
              <p>The landing page should include the following:</p>
              <ul>
                <li>Your full name and section</li>
                <li>Links to each of the lab assignments</li>
                <li>Link to the Kanbas application</li>
                <li>Links to all relevant source code repositories</li>
              </ul>
              <p>
                The Kanbas application should include a link to navigate back to
                the landing page.
              </p>
            </div>
          </div>
        </div> 

        {/* <div className="mb-3 row">
          <div className="col-sm-10">
            {assignments.map((assignment) => (
              <div id="wd-description" className="p-3 border" key={assignment._id}>
                <p>{assignment.description}</p>
              </div>
            ))}
          </div>
        </div> */}

        <div className="row mb-3">
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
                  id="wd-points"
                  defaultValue={100}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-group"
                className="col-form-label col-sm-4 text-end">
                Assignment Group
              </label>
              <div className="col-sm-8 dflex">
                <select id="wd-group" className="form-select">
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
                className="col-form-label col-sm-4 text-end"
              >
                Display Grade as
              </label>
              <div className="col-sm-8">
                <select id="wd-display-grade-as" className="form-select">
                  <option selected value="P0">Percentage</option>
                  <option value="O1">Option1</option>
                  <option value="O2">Option2</option>
                  <option value="O3">Option3</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label
                htmlFor="wd-submission-type"
                className="col-form-label col-sm-4 text-end ">
                Submission Type
              </label>
              <div className="col-sm-8">
                <div className="p-3 border">
                  <select
                    id="wd-submission-type"
                    className="form-select mb-3"
                  >
                    <option selected value="Online">Online</option>
                    <option value="O1">Option1</option>
                    <option value="O2">Option2</option>
                    <option value="O3">Option3</option>
                  </select>

                  <div>
                    <label
                      className="col-form-label col-sm-4 mb-3"
                      style={{ fontWeight: 'bold' }}>
                      Online Entry Options
                    </label>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-text-entry"
                        className="form-check-input" />
                      <label htmlFor="wd-text-entry" className="form-check-label">
                        Text Entry
                      </label>
                    </div>
                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        id="wd-website-url"
                        className="form-check-input" />
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
                        className="form-check-input" />
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
                        className="form-check-input" />
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
                        className="form-check-input" />
                      <label
                        htmlFor="wd-file-upload"
                        className="form-check-label">
                        File Uploads
                      </label>
                    </div>
                  </div>
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
                    className="col-form-control text-start col-sm-4"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Assign to
                  </label>

                  <input
                    type="text"
                    id="wd-assign-to"
                    value="Everyone"
                    className="form-control mb-3" />

                  <label
                    htmlFor="wd-due-date"
                    className="form-label"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                    Due
                  </label>

                  <input
                    type="date"
                    id="wd-due-date"
                    value="2024-05-13"
                    className="form-control mb-3" />

                  <div className="row mb-3">
                    <div className="col-sm-6">
                      <label
                        htmlFor="wd-available-from"
                        className="form-label"
                        style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                        Available from
                      </label>
                      <input
                        type="date"
                        id="wd-available-from"
                        value="2024-05-06"
                        className="form-control mb-3"
                        style={{ flex: "1" }} />
                    </div>

                    <div className="col-sm-6">
                      <label
                        htmlFor="wd-available-until"
                        className="form-label mb-2"
                        style={{ whiteSpace: "nowrap", fontWeight: "bold" }}>
                        Until
                      </label>
                      <input
                        type="date"
                        id="wd-available-until"
                        value="2024-05-20"
                        className="form-control"
                        style={{ flex: "1" }}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="row mb-3">
              <div className="d-flex justify-content-end">

                <Link
                  to={`/Kanbas/Courses/${cid}/Assignments`}
                  className="btn btn-secondary me-2"
                >
                  Cancel
                </Link>

                <Link
                  to={`/Kanbas/Courses/${cid}/Assignments`}
                  className="btn btn-primary me-2"
                >
                  Save
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}