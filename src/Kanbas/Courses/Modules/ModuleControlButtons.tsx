import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { useState } from "react";
import DeleteConfirmationModal from "../Components/DeleteConfirmationModal";

export default function ModuleControlButtons(
  {
    moduleId,
    moduleName,
    deleteModule,
    editModule,
  }: {
    moduleId: string;
    moduleName: string;
    deleteModule: (moduleId: string) => void;
    editModule: (moduleId: string) => void;
  }) {

  // manage the visibility of the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // open delete confirmation modal
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // confirm deletion and close modal
  const confirmDeleteModule = () => {
    deleteModule(moduleId); 
    setShowDeleteModal(false);
  };

  // close modal without deleting
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="float-end">

       {/* Edit Icon */}
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3" />

      {/* Delete Icon - Opens Confirmation Modal */}
      <FaTrash
        className="text-danger me-3"
        onClick={handleDeleteClick} />

      <GreenCheckmark />
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        title="Confirm Deletion"
        itemName={moduleName}
        onDelete={confirmDeleteModule}
        onClose={closeDeleteModal}
      />
    </div>
  );
}