import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as userClient from "../../Account/client";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  useEffect(() => {
    if (!cid) {
      console.error("No course ID provided.");
      return;
    }
    const fetchModules = async () => {
      const modules = await coursesClient.findModulesByCourseID(cid);
      console.log("Fetched modules: ", modules);
      if (modules) {
        dispatch(setModules(modules));
      }
    };
    fetchModules();
  }, [cid, dispatch]);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { 
      name: moduleName, 
      course: cid,
      lessons: [],
    };
    const module = await coursesClient.createCourseModule(cid, newModule);
    dispatch(addModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <div>
      {userClient.canManageCourse(currentUser) ? (
        <div id="wd-modules" className="me-4 ms-5">
          <ModulesControls
            setModuleName={setModuleName}
            moduleName={moduleName}
            addModule={createModuleForCourse}
          />
          <br />
          <br />
          <br />
          <br />
        </div>
      ) : (
        <div id="wd-modules-controls" className="text-nowrap">
          <button
            id="wd-collapse-all"
            className="btn btn-lg btn-secondary me-4 float-end"
          >
            Collapse All
          </button>
          <br />
          <br />
          <br />
          <br />
        </div>
      )}

      <ul id="wd-modules" className="list-group rounded-0 ms-4 me-4">
        {modules.map((module: any) => (
          <li
            className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            key={module._id}
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />

              {!module.editing && module.name}

              {module.editing && userClient.canManageCourse(currentUser) && (
                <input
                  className="form-control w-50 d-inline-block"
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                  defaultValue={module.name}
                />
              )}

              {userClient.canManageCourse(currentUser) && (
                <ModuleControlButtons
                  moduleId={module._id}
                  moduleName={module.name}
                  deleteModule={(moduleId) => {
                    removeModule(moduleId);
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1" key={lesson._id}>
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    {userClient.canManageCourse(currentUser) && <LessonControlButtons />}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
