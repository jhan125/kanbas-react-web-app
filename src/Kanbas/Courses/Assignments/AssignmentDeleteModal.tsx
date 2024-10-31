export default function AssignmentDeleteModal({
  title,
  assignmentId,
  deleteAssignment,
  onClose,
}: {
  title: string;
  assignmentId: string;
  deleteAssignment: () => void;
  onClose: () => void; // close the modal without deleting
}) {
  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          {/* header */}
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* body */}
          <div className="modal-body">
            <p>Are you sure you want to delete "{assignmentId}"?</p>
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}>
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteAssignment} >
              Yes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
