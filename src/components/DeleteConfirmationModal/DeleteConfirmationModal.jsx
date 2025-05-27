import "./DeleteConfirmationModal.css";
import useCloseModal from "../../utils/useCloseModal";

export default function DeleteConfirmationModal({ onClose, onConfirm }) {
  useCloseModal(onClose);

  const handleClose = () => {
    onClose();
  };
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal modal_opened">
      <div className="modal_type_confirmation">
        <p className="modal__text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__text">This action is irreversible.</p>

        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          onClick={handleClose}
        />
        <button
          className="modal__button modal__button_type_confirm"
          onClick={handleConfirm}
        >
          Yes, delete item
        </button>
        <button
          className="modal__button modal__button_type_cancel"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
