import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home"
      /* Got help from TA Srikar Nallapu to modify Dr. Annunziato's code
         so the layout of each section has appropriate space and behaves responsively. */
      className="d-flex wd-flex-row-container"
      style={{ width: '100vw', height: '100vh' }}>
      <div className="flex-fill me-5 wd-flex-grow-1">
        <Modules />
      </div>
      <div className="d-none d-md-block wd-flex-grow-1">
        <CourseStatus />
      </div>
    </div>

    // previous code from Dr. Annunziato's
    /* <div id="wd-home" className="d-flex">
      <div className="flex-fill me-5">
        <Modules />
      </div>
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div> */
  );
}