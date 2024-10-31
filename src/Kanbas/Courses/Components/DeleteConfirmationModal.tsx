export default function DeleteConfirmationModal({
  show,
  title,
  itemName,
  onDelete,
  onClose,
}: {
  show: boolean;
  title: string;
  itemName: string;
  onDelete: () => void;
  onClose: () => void;
}) {
  if (!show) return null; // Render nothing if `show` is false

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">

          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <p>Are you sure you want to delete "{itemName}"?</p>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
