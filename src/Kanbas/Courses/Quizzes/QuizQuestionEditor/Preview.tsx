import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PiWarningCircle, PiPencil } from "react-icons/pi";
import { useNavigate } from "react-router";
import * as client from "../client";
import QuizEditorButtons from "../QuizEditorButtons";
import DisplayQuestion from "./DisplayQuestion";
import { updateQuizzes } from "../QuizReducer";

export default function Preview() {
  const location = useLocation();
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [score, setScore] = useState<number | null>(null);
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

  const handleAnswerChange = (questionId: string, answer: string) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer,
    });
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    questions.forEach((question) => {
      const userAnswer = userAnswers[question._id];

      if (question.questionType === "Multiple Choice" || question.questionType === "True False") {
        if (userAnswer === question.correctAnswer) {
            calculatedScore += question.points;
        }
      } else if (question.questionType === "Fill In The Blank") {
        if (question.answers.includes(userAnswer)) {
            calculatedScore += question.points;
        }
      }
    });

    setScore(calculatedScore);
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


  return (
    <div className="container mt-4">
      
      <div><h3><strong>{quiz.title}</strong></h3></div>
      <div className="alert alert-danger" role="alert"><PiWarningCircle /> This is a preview of the published version of the quiz</div>
      <div className="d-flex">Started:&nbsp;<StartTimeDisplay/></div>
      <h3><strong>Quiz Instructions</strong></h3>
        <hr />

      <div className="flex-questions-container">
            <ul className="list-group">
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <li className="list-group-item mb-3" key={index}>
                    <div className="p-2 mb-2" style={{ backgroundColor: "#f5f5f5", width:"100%"}}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0">Question {index + 1}</h5>
                        <div className="d-flex align-items-center">
                          <h5 className="m-0 me-3">{question.points} points</h5>
                        </div>
                      </div>
                    </div>
                    <div>
                    
                    <div>
                        <div className="mt-3"><h5>{question.title}</h5></div>
                        <div><h6>{question.question}</h6></div>
                                
                        {question.questionType === "Fill In the Blank" ? (
                            <input
                            className="form-control"
                            type="text"
                            placeholder="Enter your answer here"
                            onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          />
                        ) : (
                            <ul className="list-group" style={{ marginBottom: "50px" }}>
                            {question.answers.length > 0 ? (question.answers.map((answer: string, index:number) => (

                                <li className="list-group-item" style={{ borderColor: "white" }}>
                                    <input
                                        type="radio"
                                        name={"choice" + question._id}
                                        id={question._id + index}
                                        style={{ marginRight: "10px", marginBottom: "15px" }}
                                        onChange={() => handleAnswerChange(question._id, answer)}
                                    />

                                    <label htmlFor={question._id + index}> {answer} </label>
                                </li>
                            ))): ""}
                        </ul>
                        )}
                        
                        
                    </div>

                    </div>
                  </li>
                ))
              ) : ""}
            </ul>
        </div>
        <div className="d-flex justify-content-end align-items-center" style={{borderWidth: "1px",borderStyle: "solid",borderColor: "black", width: "100%", height: "55px"}}>
          <div className="d-flex me-3">Quiz saved at&nbsp;<DateTimeDisplay/></div>
          <button className="btn btn-md btn-secondary me-2"
              onClick={handleSubmit}>
                Submit Quiz
          </button>
        </div>
        {score !== null && (
          <div className="alert alert-success mt-2" role="alert">
            Your score: {score} / {quiz.points}
          </div>
        )}
        <br/><br/><br/>

        <div className="p-2 mb-2" style={{ backgroundColor: "#f5f5f5", width:"100%"}}>
          <button style={{ background: "none", border: "none", color: "red",  cursor: "pointer", padding: "0"}}>
            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`} 
                    style={{ color: "black", textDecoration: "none" }}>
                <PiPencil style={{transform: "scaleX(-1)"}}/> Keep Editing This Quiz
              </Link>
            </button>
        </div>
      </div>
  );
}

