import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";

export default function Dashboard(
  {
    courses,
    course,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse
  }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = db;

  return (
    <div id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {/* No buttons should be available to non faculty, hide the whole ModuleControlButtons component. */}
      
      {currentUser.role === "FACULTY" && (<>
          {/* 3.1.1 Creating New Courses */}
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}>
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click">
              Update
            </button>
          </h5>
          <br />

          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />

          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </>
      )}
     
      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {courses
            .filter((course) =>
              currentUser.role === "FACULTY" || 
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              ))

            .map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course._id}>

                <Link
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  className="text-decoration-none">

                  <div className="card rounded-3 overflow-hidden">
                    <img
                      src={`/images/${course._id}.jpg`}
                      height={160}
                      alt={course.name}
                      onError={(e) => { e.currentTarget.src = "/images/reactjs.jpg"; }} />

                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                        }}>
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{ maxHeight: 53, overflow: "hidden" }}>
                        {course.description}
                      </p>

                      <Link
                        to={`/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary">
                        Go
                      </Link>

                      {currentUser.role === "FACULTY" && (
                        <>
                          {/* 3.1.2 Deleting A Course */}
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button>

                          {/* 3.1.3 Editing A Course */}
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click">
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
