import { BsCalendar2Range } from "react-icons/bs";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { PiTrashLight } from "react-icons/pi";
import WysiwygEditor from "../WysiwygEditor";
import * as client from "../client";
import { updateQuizzes } from "../QuizReducer";

type SelectorProps = {
    question: any;
    setQuestion: React.Dispatch<React.SetStateAction<any>>;
};

export default function FillInBlanksEditor({ question, setQuestion }: SelectorProps) {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>();

    useEffect(() => {
        setQuestion({
        ...question,
        questionType: "Fill In the Blank", 
        answers: ["", "", "", ""], 
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
    
    const handleAnswerChange = (index: number, value: string) => {
        const updatedAnswers = [...question.answers];
        updatedAnswers[index] = value;
        setQuestion({
            ...question,
            answers: updatedAnswers,
        });
    };

    const addAnswerOption = () => {
        setQuestion({
            ...question,
            answers: [...question.answers, ""],
        });
    };

    const deleteAnswerOption = (index: number) => {
        const updatedAnswers = question.answers.filter((_:string, i:number) => i !== index);
        setQuestion({
            ...question,
            answers: updatedAnswers,
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
        <div id="wd-assignments-editor" className="ms-5">
        <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "350px", width: "800px" }}>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</label>
        <br/>
        <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "350px" }}><b>Question:</b></label>
        <br />
        <div style={{ width: "800px", height: "400px", marginLeft: "350px" }}>
        <WysiwygEditor
          // onChange={() => {}} 
        />
      </div>
        <br />
        <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "350px" }}><b>Answers:</b></label>
        <br />

        <div className="col-sm-10" style={{ marginLeft: "350px" }}>
            {question.answers.map((answer: string, index: number) => (
                <div className="form-check d-flex align-items-center">
                    <label
                        htmlFor={index.toString()}
                    > Acceptable Answer: </label>
                    <input
                        className="form-control mb-3 ms-3"
                        id={index.toString()}
                        style={{ width: "250px", height: "50px" }}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder={question.answers[index] || ""}
                    />
                    <PiTrashLight onClick={() => deleteAnswerOption(index)} className="fs-4 ms-auto" style={{ cursor: "pointer", color: "grey", marginRight: "330px", float: "right"  }} />
                </div>
            ))}
            <button onClick={addAnswerOption} className="text-danger mt-2" style={{ background: "none", border: "none", color: "red", float: "right", cursor: "pointer", padding: "0", marginRight: "330px" }} >
                    <BsPlus className="fs-5" /> Add another answer
            </button>
        </div><br/><br/>

        <hr />
        <div className="col" style={{ marginRight: "500px" }}>
            <div className="wd-flex-row-container float-end me-5">
            <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1 float-end"
                type="button" style={{ color: "black", backgroundColor: "#F5F5F5" }}>
                <Link key={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`} to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`} 
                    style={{ color: "black", textDecoration: "none" }}>
                    Cancel
                </Link>
            </button>
            <button onClick={addQuestionToQuiz} id="wd-add-assignment" className="btn btn-lg btn-danger me-5 float-end">
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

export {};