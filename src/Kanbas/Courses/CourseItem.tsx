import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { enroll, unenroll } from "../Enrollment/reducer";

export default function CourseCard({
  course,
  currentUser,
  isEnrolled,
  isStudent,
  deleteCourse,
  setCourse,
}: {
  course: any;
  currentUser: any;
  isEnrolled: boolean;
  isStudent: boolean;
  deleteCourse: (courseId: string) => void;
  setCourse: (course: any) => void;
}) {
  const dispatch = useDispatch();
  const isFaculty = currentUser.role === "FACULTY";

  return (
    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
      <div className="card rounded-3 overflow-hidden" style={{ height: "100%" }}>

        {/* Course link - to home page*/}
        <Link
          to={`/Kanbas/Courses/${course._id}/Home`}
          className="wd-dashboard-course-link text-decoration-none text-dark">

          {/* Course image - default image for course without corresponding image */}
          <img
            src={`/images/${course._id}.jpg`}
            width="100%"
            height={160}
            alt={`${course.name} course image`}
            onError={(e) => (e.currentTarget.src = "/images/reactjs.jpg")} />

          {/* Course details - name + description */}
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="wd-dashboard-course-title card-title">
              {course.name}
            </h5>
            <p className="wd-dashboard-course-description card-text" style={{ maxHeight: 100, overflow: "hidden" }}>
              {course.description}
            </p>
          </div>
        </Link>

        {/* Buttons: Go, Enroll, Unenroll, Edit, Delete */}
        <div className="button-container mt-auto p-3">

          {/* Go Button - always available */}
          <Link
            to={`/Kanbas/Courses/${course._id}/Home`}
            className="btn btn-primary">
            Go
          </Link>

          {/* For students: Enroll / Unenroll Buttons */}
          {isStudent && (
            isEnrolled ? (
              <button
                className="btn btn-danger ms-2"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(unenroll({ user: currentUser._id, course: course._id }));
                }}
              >
                Unenroll
              </button>
            ) : (
              <button
                className="btn btn-success ms-2"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(enroll({ user: currentUser._id, course: course._id }));
                }}
              >
                Enroll
              </button>
            )
          )}

          {/* For Faculty: Edit / Delete Buttons */}
          {isFaculty && (
            <>
              <button
                className="btn btn-danger float-end"
                onClick={(e) => {
                  e.preventDefault();
                  deleteCourse(course._id);
                }}>
                Delete
              </button>
              <button
                className="btn btn-warning me-2 float-end"
                onClick={(e) => {
                  e.preventDefault();
                  setCourse(course);
                }}>
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
