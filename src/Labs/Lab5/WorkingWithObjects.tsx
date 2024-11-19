import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

// declares an assignment object accessible at the route "/lab5/assignment"
export default function WorkingWithObjects() {

  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [module, setModule] = useState({
    _id: "M101",
    name: "Introduction to Rocket Propulsion",
    description: "Basic principles of rocket propulsion and rocket engines.",
    course: "RS101",
  });

  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* 3.3.1 Retrieving Objects from a Server */}
      <h4>Retrieving Assignment Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr />

      {/* 3.3.2 Retrieving Object Properties from a Server */}
      <h4>Retrieving Assignment Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr />

      {/* 3.3.3 Modifying Objects in a Server */}
      <h4>Modifying Assignment Properties</h4>

      {/* Update Assignment Title */}
      <a id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input
        className="form-control w-75"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        } />
      <hr />

      {/* Update Assignment Score */}
      <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input
        type="number"
        className="form-control w-75"
        id="wd-assignment-score"
        value={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        } />
      <hr />

      {/* Update Assignment Completed status - by checkbox */}
      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`} >
        Check / Uncheck the box to update Assignment Completed Status
      </a>
      <input
        type="checkbox"
        className="form-check-input"
        id="wd-assignment-completed"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <hr />


      {/* 3.3.4 Work with Modules */}
      <h3>Working With Modules</h3>

      <h4>Retrieving Module Objects</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr />

      <h4>Retrieving Module Name</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr />

      <h4>Retrieving Module Description</h4>
      <a id="wd-retrieve-module-description" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/description`}>
        Get Module Description
      </a><hr />

      <h4>Modifying Module Properties</h4>
      <a id="wd-update-module-name"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>
      <input className="form-control w-75" id="wd-module-name"
        value={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })} />
      <hr />

      <a id="wd-update-module-description"
        className="btn btn-primary float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Module Description
      </a>
      <input className="form-control w-75" id="wd-module-description"
        value={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })} />
      <hr />

    </div>
  );
}