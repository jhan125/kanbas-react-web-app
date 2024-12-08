import { RiForbidLine } from "react-icons/ri";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate, useParams, useLocation } from "react-router-dom";


export default function QuizEditorButtons() {
    const { cid, qid } = useParams();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const navigateToQuestionEditor = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`); //need to modify later
    };

    const navigateToDetailEditor = () => {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/DetailEditor`);
    };
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span className="position-relative me-3"><strong>Points 0</strong></span>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                    <RiForbidLine className="position-relative me-1"/>
                    <span>Not Published</span>
                </div>
                <button className="btn btn-sm btn-secondary">
                    <IoEllipsisVertical />
                </button>
            </div>
            <hr/>
            <div id="wd-css-navigating-with-tabs">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={`nav-link ${pathname.includes("DetailEditor") ? "active" : "text-danger"}`} onClick={navigateToDetailEditor}>Details</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${pathname.includes("QuestionEditor") ? "active" : "text-danger"}`} onClick={navigateToQuestionEditor}>Questions</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
