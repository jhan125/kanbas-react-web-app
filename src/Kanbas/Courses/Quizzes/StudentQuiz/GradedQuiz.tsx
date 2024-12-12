import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as quizClient from "../client";
import * as userClient from "../../../Account/client";


export default function GradedQuiz() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizAndAnswers = async () => {
      try {
        // Fetch quiz details
        const fetchedQuiz = await quizClient.findQuizById(qid as string);
        setQuiz(fetchedQuiz);
        setQuestions(fetchedQuiz.questions || []);

        // Fetch user answers
        const result = await quizClient.getAnswersForQuiz(qid as string, currentUser._id as string);
        setUserAnswers(result.answers);
        setScore(result.score);
      } catch (error) {
        console.error("Error fetching quiz or user answers:", error);
      }
    };

    fetchQuizAndAnswers();
  }, [qid, currentUser._id]);

  return (
    <div className="container mt-4">
      <div>
        <h3>
          <strong>{quiz.title}</strong>
        </h3>
      </div>

      {/* <div className="d-flex">
        <strong>Score:</strong>&nbsp;
        <span>
          {score} / {quiz.points}
        </span>
      </div> */}

      <div className="d-flex bg-light border p-2 rounded mt-3">
        <strong style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'green' }}>Score:</strong>&nbsp;
        <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'green' }}>
          {score} / {quiz.points}
        </span>
      </div>

      <br />

      <h3>
        <strong>Graded Quiz</strong>
      </h3>
      <hr />

      <div className="flex-questions-container mt-4">
        <ul className="list-group" style={{ margin: "0px" }}>
          {questions.length > 0 ? (
            questions.map((question, index) => {
              const userAnswer = userAnswers[question._id]; // User's answer
              const isCorrect = userAnswer === question.correctAnswer; // Check correctness

              return (
                <li
                  className="list-group-item"
                  key={index}
                  style={{
                    backgroundColor: userAnswer
                      ? isCorrect
                        ? "#d4edda" // Green for correct
                        : "#f8d7da" // Red for incorrect
                      : "#f5f5f5", // Default background if unanswered
                  }}
                >
                  <div className="p-2 mb-2" style={{ width: "100%" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="m-0">Question {index + 1}</h5>
                      <div className="d-flex align-items-center">
                        <h5 className="m-0 me-3">{question.points} points</h5>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div>
                        <h6>{question.question}</h6>
                      </div>

                      {question.questionType === "Fill In the Blank" ? (
                        <input
                          className="form-control"
                          type="text"
                          value={userAnswer || ""}
                          disabled
                        />
                      ) : (
                        <ul className="list-group" style={{ marginBottom: "10px" }}>
                          {question.answers.map((answer: string, answerIndex: number) => (
                            <li
                              key={answerIndex}
                              className="list-group-item"
                              style={{ borderColor: "white" }}
                            >
                              <input
                                type="radio"
                                name={`choice${question._id}`}
                                id={`${question._id}-${answerIndex}`}
                                checked={userAnswer === answer}
                                disabled
                              />
                              <label
                                htmlFor={`${question._id}-${answerIndex}`}
                                style={{
                                  color:
                                    userAnswer === answer && !isCorrect
                                      ? "red" // Mark incorrect answer in red
                                      : "black",
                                }}
                              >
                                {answer}
                              </label>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Display feedback icons */}
                      {score !== null && (
                        <div>
                          {isCorrect ? (
                            <span style={{ color: "green" }}>✔ Correct</span>
                          ) : (
                            <span style={{ color: "red" }}>✘ Incorrect</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>No questions available.</p>
          )}
        </ul>
      </div>

      <button
        className="btn btn-md btn-secondary mt-3"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
      >
        Back to Quiz List
      </button>

      {userClient.isFaculty(currentUser) && (
        <button
          className="btn btn-primary btn-secondary mt-3 float-end"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
        >
          Back to Quiz Details
        </button>
      )}

    </div>
  );
}