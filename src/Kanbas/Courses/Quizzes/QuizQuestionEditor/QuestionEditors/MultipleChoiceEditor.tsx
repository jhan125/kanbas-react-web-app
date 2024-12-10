import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { PiTrashLight } from "react-icons/pi";
import WysiwygEditor from "./WysiwygEditor";
import * as client from "../../client";
import { updateQuizzes } from "../../QuizReducer";

type SelectorProps = {
    question: any;
    setQuestion: React.Dispatch<React.SetStateAction<any>>;
};

export default function MultipleChoiceEditor({ question, setQuestion }: SelectorProps) {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        setQuestion({
            ...question,
            questionType: "Multiple Choice",
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
        console.log(quiz);
    }, [qid]);

    const handleQuestionChange = (content: string) => {
        setQuestion({
            ...question,
            question: content
        });
    };

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
        const updatedAnswers = question.answers.filter((_: string, i: number) => i !== index);
        setQuestion({
            ...question,
            answers: updatedAnswers,
        });
    };

    const addQuestionToQuiz = async () => {
        if (quiz) {
            const updatedQuiz = {
                ...quiz,
                points: quiz.points + question.points,
                questions: quiz.questions ? [...quiz.questions, question] : [question]
            };
            setQuiz(updatedQuiz);
            dispatch(updateQuizzes(updatedQuiz));
            // client.updateQuiz(updatedQuiz, qid as string);
            await client.updateQuiz(updatedQuiz, qid as string);
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`);
        }
    };

    const cancelUpdate = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`);
    };

    return (
        <div id="wd-question-editor">
            <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "20px", width: "800px" }}>
                Enter your question and multiple answers, then select the one correct answer.
            </label>
            <br />
            <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "20px" }}>
                <b>Question:</b>
            </label>
            <br />
            <div style={{ width: "800px", height: "400px", marginLeft: "20px" }}>
                <WysiwygEditor
                    value={question.question}
                    onChange={handleQuestionChange}
                />
            </div>

            <label htmlFor="wd-name" className="mb-2" style={{ marginLeft: "20px" }}><b>Answers:</b></label>
            <br />

            <div className="col-sm-10" style={{ marginLeft: "20px" }}>
                {question.answers.map((answer: string, index: number) => (
                    <div key={index} className="form-check d-flex align-items-center">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="gridRadios"
                            id={index.toString()}
                            onChange={() => setQuestion({ ...question, correctAnswer: question.answers[index] })}
                        />
                        <input
                            className="form-control mb-2 ms-3"
                            style={{ width: "250px", height: "50px", color: question.correctAnswer === question.answers[index] ? "green" : "black" }}
                            onChange={(e) => handleAnswerChange(index, e.target.value)}
                            placeholder={answer || `option ${index + 1}`}
                            value={answer || ""}
                        />
                        <PiTrashLight
                            onClick={() => deleteAnswerOption(index)}
                            className="fs-4 ms-4"
                            style={{ cursor: "pointer", color: "grey", marginRight: "330px", float: "right" }} />
                    </div>
                ))}
                <button
                    onClick={addAnswerOption}
                    className="text-danger mt-2"
                    style={{ background: "none", border: "none", color: "red", float: "left", cursor: "pointer", padding: "0" }} >
                    <BsPlus className="fs-5" />
                    Add another answer
                </button>
            </div><br /><br />


            <hr />
            <div className="col">
                <div className="wd-flex-row-container float-none">
                    <button id="wd-add-quiz-group" className="btn btn-lg btn-secondary me-4 float-end"
                        type="button" style={{ color: "black", backgroundColor: "#F5F5F5" }}
                        onClick={cancelUpdate}>
                        Cancel
                    </button>
                    <button onClick={addQuestionToQuiz} id="wd-add-quiz" className="btn btn-lg btn-danger me-5 float-end">
                        Update Question
                    </button>
                </div>
            </div>
        </div>
    );
}

export { };