import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PiWarningCircle, PiPencil } from "react-icons/pi";
import { useNavigate } from "react-router";
import * as quizClient from "../client";
import * as userClient from "../../../Account/client";
import "./QuizView.css";

export default function QuizOneAtATime() {
  const location = useLocation();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await quizClient.findQuizById(qid as string);
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

  const handleAnswerChange = async (questionId: string, answer: string) => {
    setUserAnswers((prevUserAnswers: any) => ({
      ...prevUserAnswers,
      [questionId]: answer,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    questionId: string // Pass questionId explicitly
  ) => {
    const { value } = e.target;
    // const answerUpdate = { questionId: name, updateAnswer: value };
    // if (qid) {
    //   quizClient.addAnswerToMap(qid, currentUser._id, answerUpdate);
    // }
    // Use the questionId directly instead of relying on the name attribute
    setUserAnswers((prevUserAnswers: any) => ({
      ...prevUserAnswers,
      [questionId]: value,
    }));
  };
  const handleSubmit = async () => {
    if (!qid || !currentUser._id) return; // Guard clause

    try {
      // Save each answer to the server before submitting
      for (const questionId in userAnswers) {
        const answerPayload = {
          questionId: questionId,
          updateAnswer: userAnswers[questionId] // matches backend naming
        };

        console.log("Submitting answer for questionId:", questionId, "Payload:", answerPayload);
        // Add this log inside the frontend's handleSubmit:
        console.log("Payload being sent:", JSON.stringify(answerPayload));


        await quizClient.addAnswerToMap(qid, currentUser._id, answerPayload);
      }

      // After all answers are saved, finalize attempt and score
      const result = await quizClient.submitQuiz(qid, currentUser._id);

      console.log("Final submission result:", result);

      if (result) {
        navigate(`/Kanbas/Courses/${cid}/quizzes/${qid}/Graded`);
      } else {
        console.error("Error submitting quiz");
      }
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };


  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short', // 'Jan', 'Feb', etc.
      day: 'numeric', // '1', '2', etc.
      hour: 'numeric',
      minute: '2-digit',
      hour12: true, // 12-hour time format
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(date);

    const month = parts.find(part => part.type === 'month')?.value || '';
    const day = parts.find(part => part.type === 'day')?.value || '';
    const hour = parts.find(part => part.type === 'hour')?.value || '';
    const minute = parts.find(part => part.type === 'minute')?.value || '';
    const ampm = parts.find(part => part.type === 'dayPeriod')?.value || '';

    return `${month} ${day} at ${hour}:${minute}${ampm}`;
  };

  const DateTimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000); // Update every second

      return () => clearInterval(interval); // Clean up the interval on unmount
    }, []);

    const formattedDate = formatDate(currentTime);

    return <div>{formattedDate}</div>;
  };


  const StartTimeDisplay = () => {
    const [startTime] = useState(new Date());

    const formattedDate = formatDate(startTime);

    return <div>{formattedDate}</div>;
  };


  const renderQuestion = (question: any, index: number, answers: any) => {
    if (!question) {
      return <p className="unknown-type">Question data is missing</p>;
    }

    return (
      <div key={question._id} className="question-card">
        <div className="question-header">
          <div className="question-title">Question {index + 1}</div>
          <div className="question-points">{question.points || 0} pts</div>
        </div>
        <p className="question-text">
          {question.question || "No question text available"}
        </p>
        {(() => {
          switch (question.questionType) {
            case "Multiple Choice":
              return (
                <ul className="options-list">
                  {question.answers
                    .map((answer: string, index: number) => (
                      <li
                        key={`${question._id}-choice-${index}`}
                        className="option-item"
                      >
                        <input
                          onChange={() => handleAnswerChange(question._id, answer)}
                          type="radio"
                          name={question._id}
                          id={`option-${index}`}
                          value={answer}
                          className="radio-input"
                        />
                        <label htmlFor={`option-${index}`}>{answer}</label>
                      </li>
                    ))}
                </ul>
              );
            case "True False":
              return (
                <ul className="options-list">
                  <li className="option-item">
                    <input
                      onChange={(e) => handleInputChange(e, question._id)} // Explicitly pass questionId
                      type="radio"
                      name={question._id}
                      value="True"
                      className="radio-input"
                    />
                    True
                  </li>
                  <li className="option-item">
                    <input
                      onChange={(e) => handleInputChange(e, question._id)} // Explicitly pass questionId
                      type="radio"
                      name={question._id}
                      value="False"
                      className="radio-input"
                    />
                    False
                  </li>
                </ul>
              );
            case "Fill In the Blank":
              return (
                <div>
                  <input
                    onChange={(e) => handleInputChange(e, question._id)} // Explicitly pass questionId
                    type="text"
                    name={question._id}
                    placeholder="Type your answer here"
                    className="fill-blank-input"
                  />
                </div>
              );
            default:
              return <p className="unknown-type">Unknown question type</p>;
          }
        })()}
      </div>
    );
  };


  return (
    <div className="container mt-4">

      <div><h3><strong>{quiz.title}</strong></h3></div>

      {userClient.isFaculty(currentUser) && (
        <div className="alert alert-danger" role="alert"><PiWarningCircle />
          This is a preview of the published version of the quiz
        </div>
      )}

      <div className="d-flex">
        Started:&nbsp;
        <StartTimeDisplay />
      </div>
      <br />

      <h3><strong>Quiz Instructions</strong></h3>
      <hr />

      <div className="flex-questions-container mt-4">
        {quiz.oneQuestionAtTime ? (
          <div>
            {currentQuestion
              ? (
                renderQuestion(currentQuestion, currentQuestionIndex, currentQuestion.answers)
              )
              : (
                <p className="unknown-type">No question available</p>
              )}
            <div className="action-buttons">
              <button
                className="action-button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                Previous
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button
                  className="action-button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                >
                  Next
                </button>
              ) : (
                <div>
                  <button onClick={handleSubmit}
                    className="action-button">
                    Submit Quiz
                  </button>

                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            {questions.map((question, index) => renderQuestion(question, index, currentQuestion.answers))}
            <div> 
              <button className="action-button float-end"
                onClick={handleSubmit}>
                Submit Quiz
              </button>
            </div>

          </div>
        )}
      </div>


      <br /><br /><br />
    </div>
  );
}