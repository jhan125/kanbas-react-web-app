import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as client from "../client";
import QuizEditorButtons from "../QuizEditorButtons";
import DisplayQuestion from "./DisplayQuestion";
import { updateQuizzes } from "../QuizReducer";

export default function QuizQuestionsEditor() {
  const location = useLocation();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const newQuiz = {...quiz, questions: questions};
      setQuiz(newQuiz);
      dispatch(updateQuizzes(newQuiz));
      client.updateQuiz(newQuiz, qid as string);
  };

  return (
    <div className="container mt-4">
      <div>
          <QuizEditorButtons/>
      </div>
      <div><h3>points: {quiz.points}</h3></div>
      <br/><br/>
      <div className="col">
        <button id="wd-add-quiz-question" className="btn btn-lg btn-secondary me-1" onClick={() => {navigate(`new`)}}
            style={{ color: "black", backgroundColor: "#F5F5F5", position: "absolute", left: "45%" }}>
            <FaPlus/> New Question 
        </button><br/><br/><br/>
        <hr />

      <div className="flex-questions-container">
            <ul className="list-group" style={{ margin: 15 }}>
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <li className="list-group-item" key={index}>
                    <div className="p-2 mb-2" style={{ backgroundColor: "#f5f5f5", width:"100%"}}>
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
                      <DisplayQuestion question={question} />
                    </div>
                  </li>
                ))
              ) : ""}
            </ul>
        </div>

        <div className="wd-flex-row-container float-end me-5">
          <button className="btn btn-lg btn-secondary me-1 float-end"
              style={{ color: "black", backgroundColor: "#F5F5F5" }}>
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`} 
                style={{ color: "black", textDecoration: "none" }}>
                Cancel
              </Link>
          </button>
          <button onClick={saveQuiz} className="btn btn-lg btn-danger me-5 float-end">
              <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`} 
                style={{ color: "white", textDecoration: "none" }}>
                Save
              </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

