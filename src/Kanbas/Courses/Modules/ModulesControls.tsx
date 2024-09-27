import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ProhibitMark from "./ProhibitMark";
import { Dropdown } from 'react-bootstrap';

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">

      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module</button>

        <Dropdown className="d-inline float-end">

        <Dropdown.Toggle id="wd-publish-all-btn" className="btn btn-lg btn-secondary">
          <GreenCheckmark />
          Publish All
        </Dropdown.Toggle>

        <Dropdown.Menu>

          <Dropdown.Item href="#" id="wd-publish-all-modules-and-items-btn">
            <GreenCheckmark />
            Publish all modules and items
          </Dropdown.Item>

          <Dropdown.Item href="#" id="wd-publish-modules-only-button">
            <GreenCheckmark />
            Publish modules only
          </Dropdown.Item>

          <Dropdown.Item href="#" id="wd-unpublish-all-modules-and-items">
            <ProhibitMark />
            Unpublish all modules and items
          </Dropdown.Item>

          <Dropdown.Item href="#" id="wd-unpublish-modules-only">
            <ProhibitMark />
            Unpublish modules only
          </Dropdown.Item>

        </Dropdown.Menu>

      </Dropdown>
     

      {/* Implement the View Progress and Collapse All buttons with IDs wd-view-progress and wd-collapse-all */}

      <button id="wd-view-progress" className="btn btn-lg  btn-secondary me-1 float-end"
        type="button">
        View Progress
      </button>

      <button id="wd-collpse-all" className="btn btn-lg  btn-secondary me-1 float-end"
        type="button">
        Collapse All
      </button>

    </div>
  );
}
