import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseItem from "./Courses/CourseItem";
import DeleteConfirmationModal from "./Courses/Components/DeleteConfirmationModal";

export default function Dashboard(
  {
    courses,
    course,
    unenrolledCourses,
    setCourse,
    addNewCourse,
    deleteCourse,
    updateCourse,
    enrollCourse,
    dropCourse,
    fetchUnenrolledCourses
  }: {
    courses: any[];
    course: any;
    unenrolledCourses: any[];
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
    enrollCourse: (course: any) => void;
    dropCourse: (course: any) => void;
    fetchUnenrolledCourses: () => void;
  }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("Current user in Redux:", currentUser);

  // user roles
  const isFaculty = currentUser.role === "FACULTY";
  const isStudent = currentUser.role === "STUDENT";

  // if user.role == FACULTY
  // 1. call a function to fetch all courses, or just use the courses passed in.
  // 


  // 
  // if user.role == STUDENT
  // 
  const [showAllCourses, setShowAllCourses] = useState(false);

  const displayUnenrolledCourses = async () => {
    fetchUnenrolledCourses();
    console.log(showAllCourses);
  };

  useEffect(() => {
    if (showAllCourses) {
      displayUnenrolledCourses();
    }
  }, [showAllCourses, currentUser]);

  const createCourse = async () => {
    try {
      const newCourse = await addNewCourse(); // Wait for the course to be created
      console.log("Created new course:", newCourse);

      // await enrollCourse({ course: newCourse }); // Wait for enrollment to complete
      // console.log("Enrolled in new course:", newCourse);
    } catch (error) {
      console.error("Error creating and enrolling in course:", error);
    }
  }

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

  const [showDropModal, setShowDropModal] = useState(false);
  const [courseToDrop, setCourseToDrop] = useState<any>(null);

  // Open drop confirmation modal
  const handleDropRequest = (course: any) => {
    setCourseToDrop(course);
    setShowDropModal(true);
  };

  // Confirm drop action
  const confirmDropCourse = () => {
    if (courseToDrop) {
      dropCourse(courseToDrop); // Perform drop operation
      setShowDropModal(false); // Close modal
      setCourseToDrop(null); // Reset courseToDrop
    }
  };

  // Close modal without dropping
  const closeDropModal = () => {
    setShowDropModal(false);
    setCourseToDrop(null);
  };


  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />

      {currentUser.role === "FACULTY" &&
        <div>
          <h5>New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={createCourse} >
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
        </div>
      }

      {currentUser.role === "STUDENT" &&
        <div>
          {showAllCourses === true
            ?
            <button
              className="btn btn-success float-end"
              id="wd-finish-add-new-course-click"
              onClick={() => setShowAllCourses(false)} >
              Finish
            </button>
            :
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => setShowAllCourses(true)} >
              Enroll in New Courses
            </button>}
          <br /><br /><hr />
        </div>
      }

      {showAllCourses == false
        ?
        <>
          <h2 id="wd-dashboard-published">
            Published Courses ({courses.length})
          </h2>
          <hr />
        </>
        :
        <>
          <h2 id="wd-dashboard-published">
            Courses Available For Enrollment ({unenrolledCourses.length})
          </h2>
          <hr />
        </>
      }

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {showAllCourses == false &&
            courses.map((course) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img
                      src={`/images/${course._id}.jpg`}
                      width="100%"
                      height={160}
                      alt={`${course.name} course image`}
                      onError={(e) => (e.currentTarget.src = "/images/reactjs.jpg")} />

                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description}
                      </p>
                      <button className="btn btn-primary">
                        Go
                      </button>

                      {currentUser.role == "FACULTY"
                        ?
                        <button id="wd-delete-course-click"
                          className="btn btn-danger me-2 float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            // deleteCourse(course._id);
                            handleDeleteRequest(course); // Open the confirmation modal
                          }} >
                          Delete
                        </button>
                        :
                        <button id="wd-drop-course-click"
                          className="btn btn-danger me-2 float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            // dropCourse(course);
                            handleDropRequest(course);
                          }} >
                          Drop
                        </button>}

                      {currentUser.role === "FACULTY" &&
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }} className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      }
                    </div>
                  </Link>
                </div>
              </div>
            ))}

          {showAllCourses == true && unenrolledCourses.map((course: any) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">

                <img
                  src={`/images/${course._id}.jpg`}
                  width="100%"
                  height={160}
                  alt={`${course.name} course image`}
                  onError={(e) => (e.currentTarget.src = "/images/reactjs.jpg")} />


                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="wd-dashboard-course-title card-title">
                    {course.name}
                  </h5>
                  <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                    {course.description}
                  </p>

                  <div className="d-flex justify-content-end mt-auto">
                    <button id="wd-enroll-course-click" className="btn btn-success"
                      onClick={(event) => {
                        event.preventDefault();
                        enrollCourse({ course });
                      }}>
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        title="Confirm Deletion"
        itemName={courseToDelete?.name || "this course"}
        onDelete={confirmDeleteCourse}
        onClose={() => setShowDeleteModal(false)}
      />

      <DeleteConfirmationModal
        show={showDropModal}
        title="Confirm Drop"
        itemName={courseToDrop?.name || "this course"}
        onDelete={confirmDropCourse}
        onClose={closeDropModal}
      />
    </div>
  );
}