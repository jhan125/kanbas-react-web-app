import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import AssignmentDeleteModal from "./AssignmentDeleteModal";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function AssignmentControlButtons({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const dispatch = useDispatch();

  // manage modal visibility and assignment to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // open the modal and set target assignment for deletion
  const handleDeleteClick = () => {
    setDeleteTargetId(assignmentId);
    setShowDeleteModal(true);
  };

  // confirm deletion, dispatch action, and close modal
  const confirmDeleteAssignment = () => {
    if (deleteTargetId) {
      dispatch(deleteAssignment(deleteTargetId));
      setShowDeleteModal(false);
      setDeleteTargetId(null); // reset the target ID after deletion
    }
  };

  // close the modal without deleting
  const closeModal = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null); // reset the target ID when closing
  };

  return (
    <div className="float-end">

      {/* after clicking "Trash icon" - trigger delete modal */}
      <FaTrash className="me-3" onClick={handleDeleteClick} />
      <GreenCheckmark />
      <IoEllipsisVertical />

      {/* Render the delete modal conditionally */}
      {showDeleteModal && (
        <AssignmentDeleteModal
          title="Delete Assignment"
          assignmentId={deleteTargetId ?? ""}
          deleteAssignment={confirmDeleteAssignment} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}