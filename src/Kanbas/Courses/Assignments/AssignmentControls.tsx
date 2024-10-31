import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentsControls() {
  const { cid } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  const handleAddAssignment = () => {
    const newAssignmentId = new Date().getTime().toString();
    navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignmentId}`);
  };

  return (
    <div id="wd-assignments-controls" className="text-nowrap btn-secondary">
      <div className="d-flex justify-content-between align-items-center w-100">

        {/* search input icon */}
        <div className="position-relative flex-grow-1 me-3">
          <CiSearch
            className="search-icon position-absolute"
            style={{ top: "50%", transform: "translateY(-50%)", left: "10px" }} />

          <input
            type="search"
            id="wd-search-assignment"
            placeholder="Search..."
            aria-label="Search"
            className="search-input"
            style={{ paddingLeft: "35px" }}
          />
        </div>

        {/* Faculty: show +Group +Assignment buttons */}
        {isFaculty && (
          <>
            <button
              id="wd-add-group"
              className="btn btn-lg btn-light position-relative"
              onClick={() => console.log("Add Group clicked")}>
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }} />
              Group
            </button>

            <button
              id="wd-add-assignment"
              className="btn btn-lg btn-light position-relative"
              onClick={handleAddAssignment} >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }} />
              Assignment
            </button>
          </>
        )}
      </div>
    </div>
  );
}