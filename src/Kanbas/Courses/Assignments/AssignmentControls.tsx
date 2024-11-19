import { FaPlus } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "./styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addAssignment } from "./reducer";
import * as courseClient from "../client";

export default function AssignmentsControls() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  const addNewAssignment = async () => {
    if (!cid) return;

    const newAssignment = {
        _id: new Date().getTime().toString(),
        title: "New Assignment",
        course: cid,
        description: "New Description",
        points: 100,
        due: "2025-05-01",
        availableFrom: "2025-05-09",
        until: "2025-05-10",
    }
    const assignment = await courseClient.createAssignmentForCourse(cid, newAssignment);

    navigate(`/Kanbas/Courses/${cid}/Assignments/${newAssignment._id}`);
    dispatch(addAssignment(assignment));
  }

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
              onClick={addNewAssignment} >
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