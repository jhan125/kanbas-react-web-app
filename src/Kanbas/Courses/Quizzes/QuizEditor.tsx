import QuizEditorButtons from "./QuizEditorButtons";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuizzes, addQuizzes } from "./QuizReducer";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import WysiwygEditor from "./WysiwygEditor";
import * as client from "./client";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const initialQuiz = location.state?.quiz;
    const { quizzes } = useSelector((state: any) => state.QuizReducer);
    const [quiz, setQuiz] = useState(
        quizzes.find((quiz: any) => quiz._id == qid) || initialQuiz
    );

    const saveQuiz = async (publish: boolean) => {
        const updatedQuizData = { ...quiz, published: publish };
        if (qid === "new") {
            const createdQuiz = await client.createQuiz(cid as string, updatedQuizData);
            dispatch(addQuizzes(createdQuiz));
            if (publish) {
                quiz.published = publish;
                navigateToQuizList();
            } else {
                navigateToQuizDetail(createdQuiz._id); 
            }
        } else {
            const updatedQuiz = await client.updateQuiz(updatedQuizData, qid as string);
            dispatch(updateQuizzes(updatedQuiz));
            if (publish) {
                navigateToQuizList();
            } else {
                navigateToQuizDetail(qid as string);
            }
        }
    };

    const formatDateForInput = (dateInput: any) => {
        if (!dateInput) return '';
        const date = new Date(dateInput);
        return date.toISOString().split('T')[0];
      }

    const navigateToQuizList = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/`);
    };

    const navigateToQuizDetail = (id: string) => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${id}`);
    }

    return (
        <div className="container mt-4">
            <div>
                <QuizEditorButtons/>
            </div>
            <br />
            <input className="form-control"
                type="text"
                id="quizTitle"
                value={quiz.title} 
                onChange={(e) => setQuiz((a: any) => ({ ...a, title: e.target.value }))}
            />
            <form>
                <div className="mb-3 pt-4">
                    <h5>Quiz Instructions:</h5>
                    <WysiwygEditor/>
                </div>
                <div className="row mb-3">
                    <div className="col-md-10">
                        <div className="mb-3 row">
                            <label htmlFor="quiztype" className="col-sm-4 col-form-label text-end">Quiz Type</label>
                            <div className="col-sm-8">
                                <select id="assignmentGroup" className="form-select"
                                    value={quiz.quizType}
                                    onChange={(e) => setQuiz((a: any) => ({ ...a, quizType: e.target.value }))}
                                >
                                    <option value="Graded Quiz">Graded Quiz</option>
                                    <option value="Practice Quiz">Practice Quiz</option> 
                                    <option value="Graded Survey">Graded Survey</option>
                                    <option value="Ungraded Survey">Ungraded Survey</option> 
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="assignmentGroup" className="col-sm-4 col-form-label text-end">Assignment Group</label>
                            <div className="col-sm-8">
                                <select id="assignmentGroup" className="form-select"
                                    value={quiz.assignmentGroup}
                                    onChange={(e) => setQuiz((a: any) => ({ ...a, assignmentGroup: e.target.value }))}
                                >
                                    <option value="Quizzes">Quizzes</option>
                                    <option value="Exams">Exams</option> 
                                    <option value="Assignments">Assignments</option>
                                    <option value="Project">Project</option> 
                                </select>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="points" className="col-sm-4 col-form-label text-end">Points</label>
                            <div className="col-sm-8">
                                <input className="form-control"
                                type="number"
                                id="points"
                                value={quiz.points}
                                onChange={(e) => setQuiz((a: any) => ({ ...a, points: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="entryOption" className="col-sm-4 col-form-label text-end"><strong>Options</strong></label>
                            <div className="col-sm-8">
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="shuffle-answers" 
                                        checked={quiz.shuffleAnswers} 
                                        onChange={(e) => setQuiz((a: any) => ({ ...a, shuffleAnswers: e.target.checked }))}/>
                                    <label className="form-check-label" htmlFor="shuffle-answers">
                                        Shuffle Answers
                                    </label>
                                </div>
                                <div className="form-check mb-3 d-flex align-items-center">
                                    <input className="form-check-input me-2" type="checkbox" id="time-limit" />
                                    <label className="form-check-label me-2" htmlFor="time-limit">
                                        Time Limit
                                    </label>
                                    <input className="form-control me-2"
                                            type="number"
                                            id="timeLimit"
                                            style={{ width: '70px', height: '30px'}}
                                            value={quiz.timeLimit}
                                            onChange={(e) => setQuiz((a: any) => ({ ...a, timeLimit: parseInt(e.target.value) || 0 }))} />
                                    Minutes
                                </div>
                                <div className="form-check mb-3 d-flex align-items-center">
                                    <input className="form-check-input me-2" type="checkbox" id="multipleattempts" />
                                    <label className="form-check-label me-2" htmlFor="multipleattempts">
                                        Multiple Attempts
                                    </label>
                                    <input className="form-control me-2"
                                            type="number"
                                            id="multipleattempts"
                                            style={{ width: '70px', height: '30px'}}
                                            value={quiz.multipleAttempts}
                                            onChange={(e) => setQuiz((a: any) => ({ ...a, multipleAttempts: parseInt(e.target.value) || 0 }))}/>
                                    Times
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" 
                                        type="checkbox" 
                                        id="show-correct-answers" 
                                        checked={quiz.showCorrectAnswers} 
                                        onChange={(e) => setQuiz((a: any) => ({ ...a, showCorrectAnswers : e.target.checked }))}/>
                                    <label className="form-check-label" htmlFor="show-correct-answers">
                                        Show Correct Answers
                                    </label>
                                </div>
                                <div className="form-check mb-3 d-flex align-items-center">
                                    <input className="form-check-input me-2" type="checkbox" id="access-code" />
                                    <label className="form-check-label me-2" htmlFor="access-code">
                                        Access Code
                                    </label>
                                    <input className="form-control me-2"
                                            type="string"
                                            id="accesscode"
                                            style={{ width: '100px', height: '30px'}}
                                            value={quiz.accessCode}
                                            onChange={(e) => setQuiz((a: any) => ({ ...a, accessCode: e.target.value.toString() }))}
                                    />
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="show-correct-answers" 
                                        checked={quiz.oneQuestionAtTime} 
                                        onChange={(e) => setQuiz((a: any) => ({ ...a, oneQuestionAtTime: e.target.checked}))}/>
                                    <label className="form-check-label" htmlFor="show-correct-answers">
                                        One Question at a Time
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="show-correct-answers" 
                                        checked={quiz.webcamRequired} 
                                        onChange={(e) => setQuiz((a: any) => ({ ...a, webcamRequired: e.target.checked}))}/>
                                    <label className="form-check-label" htmlFor="show-correct-answers">
                                        Webcam Required
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" id="show-correct-answers" 
                                        checked={quiz.lockQuestionsAfterAnswering} 
                                        onChange={(e) => setQuiz((a: any) => ({ ...a, lockQuestionsAfterAnswering: e.target.checked}))}/>
                                    <label className="form-check-label" htmlFor="show-correct-answers">
                                        Lock Questions After Answering
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="assignTo" className="col-sm-4 col-form-label text-end">Assign</label>
                            <div className="col-sm-8">
                                <div className="p-2 border">
                                    <label htmlFor="assignToPeople" className="col-sm-4 col-form-label text-start">Assign to</label>
                                    <input className="form-control mb-3"
                                        type="text"
                                        id="assignTo"
                                        placeholder="Everyone"
                                    />
                                    <label htmlFor="dueDate" className="form-label">Due</label>
                                    <input className="form-control mb-3"
                                        type="date"
                                        id="dueDate"
                                        value={formatDateForInput(quiz.due)}
                                        onChange={(e) => setQuiz({ ...quiz, due: e.target.value })}
                                    />
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="availableFrom" className="form-label">Available from</label>
                                            <input className="form-control mb-3"
                                                type="date"
                                                id="availableFrom"
                                                value={formatDateForInput(quiz.available)}
                                                onChange={(e) => setQuiz({ ...quiz, available: e.target.value })}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="until" className="form-label">Until</label>
                                            <input className="form-control mb-3"
                                                type="date"
                                                id="until"
                                                value={formatDateForInput(quiz.until)}
                                                onChange={(e) => setQuiz({ ...quiz, until: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="mb-3 row">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-secondary me-1" onClick={navigateToQuizList}>
                                    Cancel
                                </button>
                                <button className="btn btn-danger me-1" onClick={ () => { saveQuiz(false) }}>
                                    Save
                                </button>
                                <button className="btn btn-danger" onClick={ () => { saveQuiz(true) }}>
                                    Save and Publish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}