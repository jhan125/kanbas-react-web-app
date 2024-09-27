import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import "./styles.css";

export default function AssignmentControls() {
  return (
    <div id="wd-assignments-controls" className="text-nowrap btn-secondary">
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="position-relative flex-grow-1 me-3">

          {/* Search for Assignment text field must render as shown including 
              placeholder text, magnifying glass, and justified to the left. */}
          <CiSearch
            className="search-icon position-absolute"
            style={{ top: "50%", transform: "translateY(-50%)", left: "10px" }} />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
            className="search-input"
            style={{ paddingLeft: "35px" }}
          />
        </div>

        {/* Group and Assignment buttons must be justified to the right.
            Use the same colors used in the Modules and Home Screen. */}
        <button id="wd-add-group" className="btn btn-lg btn-light position-relative">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }} />
          Group
        </button>

        <button id="wd-add-assignment" className="btn btn-lg btn-light position-relative">
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }} />
          Assignment
        </button>

      </div>
    </div>
  );
}