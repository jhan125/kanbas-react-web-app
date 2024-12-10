import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import DeleteConfirmationModal from "./Courses/Components/DeleteConfirmationModal";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("[Dashboard] Current user in Redux:", currentUser._id);
  // Show all enrolled courses.
  const [showUnEnrolledCourses, setShowAllCourses] = useState(false);
  // A list to store all courses that the current user is enrolled.
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  // A list to store all courses that the current user is unenrolled. This will only be set when the user click the button to show all available courses.
  const [unenrolledCourses, setUnenrolledCourses] = useState<any[]>([]);
  // A default course that could be use to added to the database.
  const [course, setCourse] = useState<any>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    img: "reactjs",
    description: "New Description",
  });

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const enrolledCourses = await userClient.findCoursesForEnrolledUser(
          currentUser
        );
        if (enrolledCourses.length > 0) {
          setEnrolledCourses(enrolledCourses);
        }
        console.log("Fetched enrolledCourses: ", enrolledCourses);
      } catch (error) {
        console.error("Error fetching enrolledCourses:", error);
      }
    };
    const fetchUnEnrolledCourses = async () => {
      try {
        const unenrolledCourses = await userClient.findCoursesForUnenrolledUser(
          currentUser
        );
        if (unenrolledCourses.length > 0) {
          setUnenrolledCourses(unenrolledCourses);
        }
        console.log("Fetched unenrolledCourses: ", unenrolledCourses);
      } catch (error) {
        console.error("Error fetching unEnrolledCourses:", error);
      }
    };
    fetchEnrolledCourses();
    if (showUnEnrolledCourses) {
      fetchUnEnrolledCourses();
    }
  }, [showUnEnrolledCourses, currentUser]);

  const createCourse = async () => {
    try {
      const newCourse = await addNewCourse(); // Wait for the course to be created
      console.log("Created new course:", newCourse);
      // await enrollNewCourse({ course: newCourse }); // Wait for enrollment to complete
      // console.log("Enrolled in new course:", newCourse);
    } catch (error) {
      console.error("Error creating and enrolling in course:", error);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setEnrolledCourses(
      enrolledCourses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };

  const addNewCourse = async () => {
    console.log("Send request to create course: ", course);
    const newCourse = await courseClient.createCourse(course);
    console.log("Created new course in function addNewCourse(): ", newCourse);
    setEnrolledCourses([...enrolledCourses, newCourse]);
    console.log("Set new course: ", newCourse);
    return newCourse;
  };

  const enrollNewCourse = async (course: any) => {
    console.log("Try to enroll new course: ", course);
    const newCourse = await userClient.enrollCourse(currentUser, course);
    console.log("Enrolled new course to currentUser: ", newCourse);
    setEnrolledCourses([...enrolledCourses, newCourse]);
    setUnenrolledCourses(
      unenrolledCourses.filter((course) => course._id !== newCourse._id)
    );
  };

  const dropCourse = async (course: any) => {
    const dropCourse = await userClient.dropCourse(currentUser, course);
    setEnrolledCourses(
      enrolledCourses.filter((course) => course._id !== dropCourse._id)
    );
    setUnenrolledCourses([dropCourse, ...unenrolledCourses]);
  };

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    console.log("Deleted course: ", status);
    setEnrolledCourses(
      enrolledCourses.filter((course) => course._id !== courseId)
    );
  };

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
  // const closeDeleteModal = () => {
  //   setShowDeleteModal(false);
  //   setCourseToDelete(null);
  // };

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
      {userClient.canManageCourse(currentUser) && (
        <div>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={createCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </div>
      )}

      {userClient.isFaculty(currentUser) && (
        <div>
          {showUnEnrolledCourses === true ? (
            <button
              className="btn btn-success float-end"
              id="wd-finish-add-new-course-click"
              onClick={() => setShowAllCourses(false)}
            >
              Finish
            </button>
          ) : (
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => setShowAllCourses(true)}
            >
              Enroll in New Courses
            </button>
          )}
          <br />
          <br />
          <hr />
        </div>
      )}




      {userClient.isStudent(currentUser) && (
        <div>
          {showUnEnrolledCourses === true ? (
            <button
              className="btn btn-success float-end"
              id="wd-finish-add-new-course-click"
              onClick={() => setShowAllCourses(false)}
            >
              Finish
            </button>
          ) : (
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => setShowAllCourses(true)}
            >
              Enroll in New Courses
            </button>
          )}
          <br />
          <br />
          <hr />
        </div>
      )}

      {showUnEnrolledCourses === false ? (
        <>
          <h2 id="wd-dashboard-published">
            Enrolled Courses ({enrolledCourses.length})
          </h2>
          <hr />
        </>
      ) : (
        <>
          <h2 id="wd-dashboard-published">
            Courses Available For Enrollment ({unenrolledCourses.length})
          </h2>
          <hr />
        </>
      )}

      <div id="wd-dashboard-enrolledCourses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {!showUnEnrolledCourses &&
            enrolledCourses.map((course) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
                key={course._id}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src={`/images/${course.image}.jpg`}
                      width="100%"
                      height={160}
                      alt={`${course.name} course`}
                      onError={(e) =>
                        (e.currentTarget.src = "/images/reactjs.jpg")
                      }
                    />

                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary">Go</button>

                      {userClient.canManageCourse(currentUser) ? (
                        <button
                          id="wd-delete-course-click"
                          className="btn btn-danger me-2 float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            // deleteCourse(course._id);
                            handleDeleteRequest(course); // Open the confirmation modal
                          }}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          id="wd-drop-course-click"
                          className="btn btn-danger me-2 float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            // dropCourse(course);
                            handleDropRequest(course);
                          }}
                        >
                          Drop
                        </button>
                      )}

                      {userClient.canManageCourse(currentUser) && (
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            ))}

          {showUnEnrolledCourses &&
            unenrolledCourses.map((course: any) => (
              <div
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <img
                    src={`/images/${course.image}.jpg`}
                    width="100%"
                    height={160}
                    alt={`${course.name} course`}
                    onError={(e) =>
                      (e.currentTarget.src = "/images/reactjs.jpg")
                    }
                  />

                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>

                    <div className="d-flex justify-content-end mt-auto">
                      <button
                        id="wd-enroll-course-click"
                        className="btn btn-success"
                        onClick={(event) => {
                          event.preventDefault();
                          enrollNewCourse({ course });
                        }}
                      >
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
