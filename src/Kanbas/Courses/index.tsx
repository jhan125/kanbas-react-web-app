import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";
import Users from "../Account/Users";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionEditor/index";
import Selector from "./Quizzes/QuizQuestionEditor/Selector";
import Preview from "./Quizzes/QuizQuestionEditor/QuizPreview/Preview";

export default function Courses() {
  const { cid } = useParams();
  const [courses] = useState<any[]>([]);
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  // const { currentUser } = useSelector((state: any) => state.accountReducer);
  // const isFaculty = currentUser.role === "FACULTY";

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>

        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Piazza" element={<h2>Piazza</h2>} />
            <Route path="Zoom" element={<h2>Zoom</h2>} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:aid"
              element={<AssignmentEditor />} />
            <Route path="People" element={<Users />} />
            <Route path="Grades" element={<h2>Grades</h2>} />
            <Route path="Quizzes" element={<Quizzes courses={courses} />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/DetailEditor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/QuestionEditor" element={<QuizQuestionsEditor />} />
            <Route path="Quizzes/:qid/QuestionEditor/new" element={<Selector />} />
            <Route path="Quizzes/:qid/Preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
