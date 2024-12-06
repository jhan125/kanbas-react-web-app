import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import AssignmentDeleteModal from "./AssignmentDeleteModal";
import { deleteAssignment } from "./reducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as assignmentsClient from "./client";

export default function AssignmentControlButtons({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const dispatch = useDispatch();

  // manage modal visibility and assignment to delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // open the modal and set target assignment for deletion
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // confirm deletion, dispatch action, and close modal
  const confirmDeleteAssignment = async () => {
    try {
      // delete from backend
      await assignmentsClient.deleteAssignment(assignmentId);
      console.log("Successfully deleted assignment: ", assignmentId);
      // update redux store
      dispatch(deleteAssignment(assignmentId));
      setShowDeleteModal(false);
    } catch(error) {
      console.error("Error in deleting assignment: ", error);
    }
  };

  // close the modal without deleting
  const closeModal = () => {
    setShowDeleteModal(false);
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
          assignmentId={assignmentId}
          deleteAssignment={confirmDeleteAssignment} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}