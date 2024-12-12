import { BsPencil } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles.css";
import { findQuizById } from "./client";
import * as userClient from "../../Account/client";
import * as quizClient from "./client";

export default function QuizDetails() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    console.log("[Quiz] Current user:", currentUser._id, " + role: ", currentUser.role);
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const quizzes = useSelector((state: any) => state.QuizReducer.quizzes);
    const isCreatingNew = qid === 'new';

    /* -----HANDLE Student Side -------*/
    const [answers, setAnswers] = useState<any>(null);
    const [maxAttempts, setMaxAttempts] = useState<boolean>(false);

    const handleNewAttempt = async () => {
        // Check if the quiz is available before proceeding
        const currentDate = new Date();
        const availableDate = new Date(quizDetails.available);
        const untilDate = new Date(quizDetails.until);

         // ONLY if Quiz is available, proceed with the attempt
        if (availableDate <= currentDate && untilDate >= currentDate) {
           
            let result = null;
            if (qid && currentUser._id) {
                console.log("qid + userid: ", qid, currentUser._id);
                result = await quizClient.newAttempt(qid, currentUser._id);
            } else {
                return;
            }
    
            if (result) {
                setMaxAttempts(false);
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/view`);
            } else {
                setMaxAttempts(true);
                return;
            }
        } else {
            // Quiz is not available or has closed, do nothing
            console.log("Quiz is not available or has closed");
        }
    }

    const checkAvailableDate = () => {
        const currentDate = new Date();
        const availableDate = new Date(quizDetails.available);
        const untilDate = new Date(quizDetails.until);
        if (availableDate > currentDate) {
            return `Not available until ${availableDate.toDateString().split(' ').slice(1).join(' ')}`;
        }
        else if (untilDate < currentDate) {
            return `Closed`;
        }
        else {
            return "Begin Quiz";
        }
    };

    /* -----HANDLE Student Side -------*/

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
        const fetchAnswers = async () => {
            if (qid && currentUser._id) {
                const fetchedAnswers = await quizClient.getAnswersForQuiz(qid, currentUser._id);
                setAnswers(fetchedAnswers);
                console.log("Fetched Answers: ", fetchedAnswers);
            }
        }
        if (userClient.isStudent(currentUser)) {
            fetchAnswers();
        }
    }, [qid, quizzes, isCreatingNew]);

    const navigateToQuizEditor = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/DetailEditor`, { state: { quiz: quizDetails } });
    };

    const navigateToQuizPreview = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`);
    };
    const navigateToStudentView = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/view`);
    };


    return (
        <>
            {/* Faculty / Admin can manage Quiz */}
            {userClient.canManageQuiz(currentUser) && (
                <div id="wd-quizdetail" className="container mt-4">
                    <div className="ms-auto" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <button id="wd-preview-btn" className="btn btn-me btn-secondary me-3" onClick={navigateToStudentView}>
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


                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-md btn-secondary mt-3 "
                            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
                        >
                            Back to Quiz List
                        </button>
                    </div>

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


                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <p className="text-center mt-2 border">
                            <span style={{
                                display: 'inline-block',
                                backgroundColor: '#f0f0f0',
                                color: '#333',
                                padding: '0.5rem 1rem',
                                borderRadius: '8px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                border: '1px solid #ccc'
                            }}>
                                {quizDetails.multipleAttempts === 0
                                    ? `${(answers?.attempt || 0)}/Unlimited Attempts`
                                    : `${(answers?.attempt || 0)}/${quizDetails.multipleAttempts} attempts`}

                            </span>
                        </p>
                        <div className="d-flex justify-content-center">
                            <button
                                onClick={handleNewAttempt}
                                className="btn btn-lg btn-danger border rounded-1 ms-2">
                                {checkAvailableDate()}
                            </button>
                        </div>

                        {maxAttempts && (
                            <p className="text-center mt-4">You already reach the max attempt.</p>
                        )}
                    </div>

                    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                        
                        {quizDetails.showCorrectAnswers && (answers?.attempt > 0) ? ( // only show graded quiz 
                            <>
                                <h3>Grade:
                                    {answers?.score !== undefined
                                        ? answers.score
                                        : " N/A"}</h3>
                                <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Graded`} className="btn btn-link">
                                    Graded Quiz
                                </a>
                            </>
                        ) : (
                            answers ? (
                                answers.finished
                                    ? <p>Quiz not graded.</p>
                                    : <p>Quiz not finished.</p>
                            ) : (
                                <p>Quiz data not available.</p>
                            )
                        )}
                    </div>
                    <hr />

                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-md btn-secondary mt-3 "
                            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
                        >
                            Back to Quiz List
                        </button>
                    </div>
                </div>

            )}
        </>
    );
}