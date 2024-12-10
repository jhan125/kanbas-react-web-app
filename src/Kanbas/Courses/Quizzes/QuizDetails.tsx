import { BsPencil } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles.css";
import { findQuizById } from "./client";
import * as userClient from "../../Account/client";

export default function QuizDetails() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    console.log("[Quiz] Current user:", currentUser._id, " + role: ", currentUser.role);
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const quizzes = useSelector((state: any) => state.QuizReducer.quizzes);
    const isCreatingNew = qid === 'new';

    const formatDateForInput = (dateInput: any) => {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        return date.toISOString().split('T')[0];
    }

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


    const defaultQuizDetails = {
        title: isCreatingNew ? "New Quiz" : "Loading Quiz...",
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        points: 0,
        questions: [],
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: 1,
        showCorrectAnswers: false,
        accessCode: "None",
        oneQuestionAtTime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        due: formatDateForInput(new Date()),
        available: formatDateForInput(new Date()),
        until: formatDateForInput(new Date()),
        published: false,
    };

    const [quizDetails, setQuizDetails] = useState(defaultQuizDetails);
    console.log(quizDetails);

    useEffect(() => {
        if (!isCreatingNew) {
            const foundQuiz = quizzes.find((quiz: any) => quiz._id === qid);
            if (foundQuiz) {
                setQuizDetails(foundQuiz);
            } else {
                setQuizDetails(defaultQuizDetails)
            }
        }
    }, [qid, quizzes, isCreatingNew]);

    const navigateToQuizEditor = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/DetailEditor`, { state: { quiz: quizDetails } });
    };
    const navigateToQuizPreview = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
    };

    return (
        <>
            {/* Faculty / Admin can manage Quiz */}
            {userClient.canManageQuiz(currentUser) && (
                <div id="wd-quizdetail" className="container mt-4">
                    <div className="ms-auto" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <button id="wd-preview-btn" className="btn btn-me btn-secondary me-3" onClick={navigateToQuizPreview}>
                            Preview
                        </button>
                        <button id="wd-add-group-btn" className="btn btn-me btn-secondary me-1" onClick={navigateToQuizEditor}>
                            <BsPencil className="position-relative me-2" style={{ bottom: "1px" }} />
                            Edit
                        </button>
                        <hr />
                    </div>


                    <table className="table table-details">
                        <thead>
                            <tr>
                                <th><h3>{quizDetails.title}</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Quiz Type</td>
                                <td>{quizDetails.quizType}</td>
                            </tr>
                            <tr>
                                <td>Points</td>
                                <td>{quizDetails.points}</td>
                            </tr>
                            <tr>
                                <td>Assignment Group</td>
                                <td>{quizDetails.assignmentGroup}</td>
                            </tr>
                            <tr>
                                <td>Shuffle Answers:</td>
                                <td>{quizDetails.shuffleAnswers ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Time Limit</td>
                                <td>{quizDetails.timeLimit}</td>
                            </tr>
                            <tr>
                                <td>Multiple Attempts</td>
                                <td>{quizDetails.multipleAttempts}</td>
                            </tr>
                            <tr>
                                <td>Show Correct Answers</td>
                                <td>{quizDetails.showCorrectAnswers ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Access Code</td>
                                <td>{quizDetails.accessCode}</td>
                            </tr>
                            <tr>
                                <td>One Question at a Time</td>
                                <td>{quizDetails.oneQuestionAtTime ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Webcam Required</td>
                                <td>{quizDetails.webcamRequired ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                                <td>Lock Questions After Answering</td>
                                <td>{quizDetails.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
                            </tr>
                        </tbody>
                    </table><hr />
                    <table className="simple-table">
                        <thead>
                            <tr>
                                <th>Due</th>
                                <th>For</th>
                                <th>Avaliable from</th>
                                <th>Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            <td>{formatDateForInput(quizDetails.due)}</td>
                            <td>Everyone</td>
                            <td>{formatDateForInput(quizDetails.available)}</td>
                            <td>{formatDateForInput(quizDetails.until)}</td>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Faculty / Admin can't manage Quiz but can Take Quiz */}
            {userClient.isStudent(currentUser) && (
                <div className="container mt-4">

                    <div><h3><strong>{quizDetails.title}</strong></h3></div>
                    <hr />

                    <span className="text-justify m-2">
                        <strong> Due  </strong>
                        {formatDateTime(quizDetails.due)}
                    </span>

                    <span className="text-justify m-2">
                        <strong> Points  </strong>
                        {quizDetails.points}
                    </span>

                    <span className="text-justify m-2">
                        <strong> Questions  </strong>
                        {quizDetails.questions.length}
                    </span>

                    <span className="text-justify m-2">
                        <strong> Available  </strong>
                        {formatDateTime(quizDetails.available)} -  {formatDateTime(quizDetails.until)}
                    </span>

                    <span className="text-justify m-2">
                        <strong> Time Limit  </strong>
                        {quizDetails.timeLimit}
                    </span>

                    <hr />

                    <button
                        id="wd-add-quiz-question"
                        className="btn btn-lg btn-secondary me-1"
                        onClick={navigateToQuizPreview}
                        style={{ color: "white", backgroundColor: "#c83630", position: "absolute", left: "45%", marginTop: "20px" }}>
                        Take the Quiz
                    </button>

                </div>
            )}
        </>
    );
}