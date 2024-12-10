import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../client";
import DisplayQuestion from "./QuestionDisplay/DisplayQuestion";
import { updateQuizzes } from "../QuizReducer";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus } from "react-icons/fa";
import { RiForbidLine } from "react-icons/ri";
import { IoEllipsisVertical } from "react-icons/io5";
import * as userClient from "../../../Account/client";

export default function QuizQuestionsEditor() {
  // const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("[Quiz] Current user:", currentUser._id, " + role: ", currentUser.role);
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(qid as string);
        setQuiz(fetchedQuiz);
        setQuestions(fetchedQuiz.questions || []);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [qid]);

  console.log(quiz);
  console.log(questions);

  const deleteQuestion = async (question: any) => {
    try {
      const remainingPoints = quiz.points - question.points;
      const remainingQuestions = questions.filter((q) => q._id !== question._id);
      setQuestions(remainingQuestions);
      const updatedQuiz = {
        ...quiz,
        points: remainingPoints,
        questions: remainingQuestions,
      };
      setQuiz(updatedQuiz);
      dispatch(updateQuizzes(updatedQuiz));
      // client.updateQuiz(updatedQuiz, qid as string);
    } catch (err) {
      console.log(err)
    }
  }

  const saveQuiz = async () => {
    const newQuiz = { ...quiz, questions: questions };
    setQuiz(newQuiz);
    dispatch(updateQuizzes(newQuiz));
    client.updateQuiz(newQuiz, qid as string);
  };

  const navigateToQuestionEditor = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`); //need to modify later
  };

  const navigateToDetailEditor = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/DetailEditor`);
  };

  return (
    <div className="container mt-4">
      <div>
        {/* <QuizEditorButtons /> */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <span className="position-relative me-3">

              <strong>Points {quiz.points}</strong>
            </span>

            <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
              <RiForbidLine className="position-relative me-1" />
              <span>Not Published</span>
            </div>

            <button className="btn btn-sm btn-secondary">
              <IoEllipsisVertical />
            </button>
          </div>
          <hr />
          <div id="wd-css-navigating-with-tabs">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className={`nav-link ${pathname.includes("DetailEditor")
                  ? "active"
                  : "text-danger"}`}
                  onClick={navigateToDetailEditor}>
                  Details
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${pathname.includes("QuestionEditor")
                  ? "active"
                  : "text-danger"}`}
                  onClick={navigateToQuestionEditor}>
                  Questions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div>
        <h3>
          points: {quiz.points}
        </h3>
      </div> */}

      <br />

      <div className="col">
        <button id="wd-add-quiz-question" className="btn btn-lg btn-secondary me-1" onClick={() => { navigate(`new`) }}
          style={{ color: "black", backgroundColor: "#F5F5F5", position: "absolute", left: "45%" }}>
          <FaPlus /> New Question
        </button>
        <br /><br />

        <div className="flex-questions-container mt-4">
          <ul className="list-group" style={{ margin: "0px" }}>
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <li className="list-group-item" key={index}>
                  <div className="p-2 mb-2" style={{ backgroundColor: "#f5f5f5", width: "100%" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0">Question {index + 1}</h5>
                      <div className="d-flex align-items-center">
                        <h5 className="m-0 me-3">{question.points} points</h5>
                        <FaTrash
                          onClick={() => { deleteQuestion(question) }}
                          className="text-danger"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <DisplayQuestion
                      question={question}
                    />
                  </div>
                </li>
              ))
            ) : ""}
          </ul>
        </div>


        <div className="wd-flex-row-container float-end me-5">
          <button className="btn btn-lg btn-secondary me-1 float-end"
            style={{ color: "black", backgroundColor: "#F5F5F5" }}>
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
              style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </button>
          <button onClick={saveQuiz} className="btn btn-lg btn-danger me-5 float-end">
            <Link
              to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
              style={{ color: "white", textDecoration: "none" }}>
              Save
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

