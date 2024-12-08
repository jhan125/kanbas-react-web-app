import { FaPlus } from "react-icons/fa6"; 
import { IoIosSearch } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5"; 
import { useNavigate, useParams } from "react-router-dom";

export default function QuizControls({
    addQuiz,
  
  }:{
    addQuiz: () => void;
  }) {
    const navigate = useNavigate();
    const { cid } = useParams();

    return (
      <div id="wd-quizzes-controls" className="d-flex text-nowrap">
        <div className="input-group me-3" style={{ width: "250px" }}>
          <span className="input-group-text bg-white border-end-0">
            <IoIosSearch />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search for Quiz"
          />
        </div>
        <div className="ms-auto">
          <button id="wd-add-quiz-btn" 
                  className="btn btn-lg btn-danger me-1"
                  onClick ={addQuiz}
                  >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px"}} />
            Quiz
          </button>
          <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1">
            <IoEllipsisVertical className="position-relative me-2" style={{ bottom: "1px" }} />
        </button>
        </div>
      </div>
    );
  }
    