import Modules from "../Modules";
import CourseStatus from "./Status";
import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

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
        {currentUser.role === "FACULTY" && <CourseStatus />}
      </div>
    </div>
  );
}