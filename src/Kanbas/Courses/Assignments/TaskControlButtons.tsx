import { BsGripVertical } from "react-icons/bs";
import { MdOutlineAssignment } from "react-icons/md";
import { useSelector } from "react-redux";

export default function TaskControlButtons() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";

  return (
    <div className="float-start me-3">
      <BsGripVertical
        className="me-2 fs-3" 
        style={{ color: isFaculty ? "" : "white" }} />

      <MdOutlineAssignment
        className="me-2 fs-3 text-success" />
    </div>
  );
}