import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as client from "../../client";
import { useDispatch } from "react-redux";
import { updateQuizzes } from "../../QuizReducer";
import WysiwygEditor from "./WysiwygEditor";

type SelectorProps = {
  question: any;
  setQuestion: React.Dispatch<React.SetStateAction<any>>;
};

export default function TrueFalseEditor({ question, setQuestion }: SelectorProps) {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>();

  useEffect(() => {
    setQuestion({
      ...question,
      questionType: "True False",
      answers: ["True", "False"],
    });
  }, [setQuestion]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const fetchedQuiz = await client.findQuizById(qid as string);
        setQuiz(fetchedQuiz);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [qid]);

  // This function updates the question text
  const handleQuestionChange = (content: string) => {
    setQuestion({
      ...question,
      question: content
    });
  };

  const addQuestionToQuiz = () => {
    if (quiz) {
      const updatedQuiz = {
        ...quiz,
        points: quiz.points + question.points,
        questions: quiz.questions ? [...quiz.questions, question] : [question]
      };
      setQuiz(updatedQuiz);
      dispatch(updateQuizzes(updatedQuiz));
      client.updateQuiz(updatedQuiz, qid as string);
    }
  };

  return (
    <div>
      <label htmlFor="wd-question" className="mb-2" style={{ marginLeft: "20px" }}>
        Enter your question text, then select if True or False is the correct answer.
      </label>
      <br />
      <label htmlFor="wd-question" className="mb-2" style={{ marginLeft: "20px" }}>
        <b>Question:</b>
      </label>
      <br />
      <div style={{ width: "800px", height: "400px", marginLeft: "20px" }}>
        <WysiwygEditor
          value={question.question}
          onChange={handleQuestionChange}
        />
      </div>
      
      <label htmlFor="wd-question" className="mb-2" style={{ marginLeft: "20px" }}>
        <b>Answers:</b>
      </label>
      <br />

      <div className="col-sm-10" style={{ marginLeft: "20px" }}>
        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            name="gridRadios"
            id="t"
            checked={question.correctAnswer === "True"}
            onChange={() => setQuestion({ ...question, correctAnswer: "True" })} />
          <label
            htmlFor="t"
            style={{
              width: "250px", height: "40px",
              marginTop: "20px",
              color: question.correctAnswer === "True"
                ? "green"
                : "black"
            }}>
            True
          </label>
        </div>
        <div className="form-check d-flex align-items-center">
          <input
            className="form-check-input"
            type="radio"
            name="gridRadios" id="f"
            checked={question.correctAnswer === "False"}
            onChange={() => setQuestion({ ...question, correctAnswer: "False" })} />
          <label
            htmlFor="f"
            style={{
              width: "250px", height: "40px",
              marginTop: "20px",
              color: question.correctAnswer === "False"
                ? "green"
                : "black"
            }}>
            False
          </label>
        </div>

      </div>

      <hr />
      <div className="col">
        <div className="wd-flex-row-container float-none">
          <button id="wd-add-quiz-group" className="btn btn-lg btn-secondary me-4 float-end"
            type="button" style={{ color: "black", backgroundColor: "#F5F5F5" }}>
            <Link key={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`}
              style={{ color: "black", textDecoration: "none" }}>
              Cancel
            </Link>
          </button>
          <button onClick={addQuestionToQuiz} id="wd-add-quiz" className="btn btn-lg btn-danger me-5 float-end">
            <Link key={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`}
              style={{ color: "white", textDecoration: "none" }}>
              Update Question
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

