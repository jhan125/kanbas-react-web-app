import { IoEllipsisVertical } from "react-icons/io5";
import { RiForbidLine } from "react-icons/ri";
import { FaRegSquareCheck } from "react-icons/fa6";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuizzes, setQuizzes } from "./QuizReducer";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as client from "./client";

export default function QuizMenuButtons(
    {   
        quizId, 
        deleteQuiz, 
        editQuiz,
        published
    } : 
    {
        quizId: string;
        deleteQuiz: (quizId: string) => void;
        editQuiz: (quizId: string) => void;
        published: boolean;
    }
) {
    const { quizzes } = useSelector((state: any) => state.QuizReducer);
    const [quiz, setQuiz] = useState(
        quizzes.find((quiz: any) => quiz._id == quizId)
    );

    const [showMenu, setShowMenu] = useState(false);
    const [isPublished, setIsPublished] = useState(published);
    const dispatch = useDispatch();

    const handleTogglePublish = async() => {
        const updatedQuizData = {...quiz, published: !isPublished};
        const currentPublished = await client.updateQuiz(updatedQuizData,quizId as string)
        dispatch(updateQuizzes(currentPublished));
        setIsPublished(!isPublished);
    };

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <div className="float-end mt-3">
            {isPublished ? (
                <FaRegSquareCheck className="text-success fs-4 me-2" onClick={handleTogglePublish} />
            ) : (
                <RiForbidLine className="text-danger fs-4 me-2" onClick={handleTogglePublish} />
            )}
            <IoEllipsisVertical className="fs-4" onClick={toggleMenu} />
            {showMenu && (
                <ul className="dropdown-menu show">
                    <li><button className="dropdown-item" onClick={() => editQuiz(quizId)}>Edit</button></li>
                    <li><button className="dropdown-item" onClick={() => deleteQuiz(quizId)}>Delete</button></li>
                    <li><button className="dropdown-item" onClick={handleTogglePublish}>
                        {isPublished ? 'Unpublish' : 'Publish'}
                    </button></li>
                </ul>
            )}
        </div>
    );
}