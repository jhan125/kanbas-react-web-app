import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Link, useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { PiWarningCircle, PiPencil } from "react-icons/pi";
import { useNavigate } from "react-router";
import * as client from "../client";
import "../styles.css";

export default function StudentQuizPage() {
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
      } else if (question.questionType === "Fill In the Blank") {
        if (question.answers.includes(userAnswer)) {
          calculatedScore += question.points;
        }
      }
    });

    setScore(calculatedScore);
  };


  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // invalid date

    // extract individual components
    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // AM/PM for 12-hour format
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12 for midnight

    // format string
    return `${month} ${day} at ${hours}:${minutes}${ampm}`;
  };


  return (
    <div className="container mt-4">

      <div><h3><strong>{quiz.title}</strong></h3></div>

      <br />

      <span className="text-muted m-2">
        <strong> Due  </strong>
        {formatDateTime(quiz.due)}
      </span>
      |
      <span className="text-muted m-2">
        {quiz.points} pts
      </span>
      |
      <span className="text-muted m-2">
        {quiz.questions.length} Questions
      </span>
      <hr />

    </div>
  );
}