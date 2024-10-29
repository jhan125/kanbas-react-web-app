import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ProhibitMark from "./ProhibitMark";
import { Dropdown } from 'react-bootstrap';
import ModuleEditor from "./ModuleEditor";
import { useSelector } from "react-redux";

export default function ModulesControls(
  {
    moduleName,
    setModuleName,
    addModule
  }: {
    moduleName: string;
    setModuleName: (title: string) => void;
    addModule: () => void;
  }) {
  // Access the current user's role from Redux state
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-modules-controls" className="text-nowrap">

      {/* Only show these buttons if the user has the FACULTY role */}
      {currentUser.role === "FACULTY" && (
        <>
          <button
            className="btn btn-lg btn-danger me-1 float-end"
            id="wd-add-module-btn"
            data-bs-toggle="modal" data-bs-target="#wd-add-module-dialog" >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }} />
            Module
          </button>

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

          {/* 3.3.1 Creating a Module */}

          <ModuleEditor
            dialogTitle="Add Module"
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={addModule} />
        </>
      )}

      <button id="wd-collpse-all" className="btn btn-lg  btn-secondary me-1 float-end"
        type="button">
        Collapse All
      </button>

    </div>
  );
}
