import { Routes, Route, Navigate } from "react-router";
import "./styles.css";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import { Provider, useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { current } from "@reduxjs/toolkit";
import store from "./store";

export default function Kanbas() {

  const [courses, setCourses] = useState<any[]>([]);
  const [unenrolledCourses, setUnenrolledCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("Current user in Redux:", currentUser);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    img: "reactjs",
    description: "New Description"
  });

  const fetchCourses = async () => {
    if (!currentUser || !currentUser._id) {
      console.warn("User is not logged in or _id is missing");
      return;
    }
    let courses = [];
    try {
      if (currentUser.role === "FACULTY") {
        courses = await courseClient.fetchAllCourses();
      } else {
        courses = await userClient.findMyCourses(currentUser);
      }
      console.log("Fetched courses:", courses); // Debug
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
    setCourses(courses);
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const fetchEnrolledCourses = async () => {
    const response = await fetch(`/api/users/${currentUser._id}/courses`);
    const courses = await response.json();
    setCourses(courses); // Assume setCourses is used for enrolled courses
  };  

  const fetchUnenrolledCourses = async () => {
    let unenrolledCourses = [];
    try {
      unenrolledCourses = await userClient.findUnenrolledCourses(currentUser);
    } catch (error) {
      console.error("Error fetching unenrolled courses:", error);
    }
    setUnenrolledCourses(unenrolledCourses);
  };
  useEffect(() => {
    fetchUnenrolledCourses();
  }, [currentUser]);

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) { return course; }
      else { return c; }
    })
    );
  };

  const addNewCourse = async () => {
    console.log("Send request to create course: ", course);
    const newCourse = await userClient.createCourse(currentUser, course);
    console.log("Created new course in function addNewCourse(): ", newCourse);
    setCourses([...courses, newCourse]);
    console.log("Set new course: ", newCourse);
    return newCourse;
  };

  const enrollNewCourse = async (course: any) => {
    console.log("Try to enroll new course: ", course);
    const newCourse = await userClient.enrollCourse(currentUser, course);
    console.log("Enrolled new course to currentUser: ", newCourse);
    setCourses([...courses, newCourse]);
    setUnenrolledCourses(unenrolledCourses.filter((course) => course._id !== newCourse._id));
    console.log("Set unenrolled course PASS");
    fetchCourses();
  }

  const dropCourse = async (course: any) => {
    const dropCourse = await userClient.dropCourse(currentUser, course);
    setCourses(courses.filter((course) => course._id !== dropCourse._id));
    setUnenrolledCourses([dropCourse, ...unenrolledCourses])
  }

  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute><Dashboard
                courses={courses}
                course={course}
                unenrolledCourses={unenrolledCourses}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
                enrollCourse={enrollNewCourse}
                dropCourse={dropCourse}
                fetchUnenrolledCourses={fetchUnenrolledCourses} />
              </ProtectedRoute>} />
            <Route path="Courses/:cid/*"
              element={<ProtectedRoute>
                <Courses
                  courses={courses} />
              </ProtectedRoute>} />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}