import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import CourseItem from "./Courses/CourseItem";
import DeleteConfirmationModal from "./Courses/Components/DeleteConfirmationModal";

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

  // get current user and enrollments from Redux
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user roles
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";

  // show enrolled or all available courses for students
  const [showEnrollments, setShowEnrollments] = useState(true);

  // check if a student is enrolled in a course
  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );

  // state for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<any>(null);

  // open delete confirmation modal
  const handleDeleteRequest = (course: any) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  // confirm delete action
  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      deleteCourse(courseToDelete._id);
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  // close modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };


  return (
    <div id="wd-dashboard" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 id="wd-dashboard-title">
          Dashboard
        </h1>
        <hr />

        {/* For students: add a blue Enrollment Button at Top Right screen*/}
        {isStudent && (
          <button
            type="button"
            className="btn btn-primary mb-3 float-end"
            onClick={() => setShowEnrollments(!showEnrollments)}>
            {showEnrollments
              ? "Show All Available Courses"
              : "Show Enrolled Courses"}
          </button>
        )}
      </div>
      <hr />

      {/* For Faculty: show add and update courses buttons */}
      {isFaculty && (
        <>
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
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            } />
          <hr />
        </>
      )}

      {/* course count based on user role */}
      <h2 id="wd-dashboard-courses">
        {isFaculty
          ? `Published Courses (${courses.length})`
          : showEnrollments
            ? `Enrolled Courses (${courses.filter((course) => isEnrolled(course._id)).length})`
            : `Available Courses (${courses.length})`}
      </h2>
      <hr />

      {/* show courses based on enrollments */}
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses
          .filter(
            (course) =>
              isFaculty || (showEnrollments ? isEnrolled(course._id) : true)
          )
          .map((course) => (
            <CourseItem
              key={course._id}
              course={course}
              currentUser={currentUser}
              isEnrolled={isEnrolled(course._id)}
              isStudent={isStudent}
              deleteCourse={() => handleDeleteRequest(course)}
              setCourse={setCourse}
            />
          ))}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        title="Confirm Deletion"
        itemName={courseToDelete?.name || "this course"}
        onDelete={confirmDeleteCourse}
        onClose={() => setShowDeleteModal(false)}
      />
    </div>
  );
}