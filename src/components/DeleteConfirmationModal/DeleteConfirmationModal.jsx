import "./DeleteConfirmationModal.css";
import useCloseModal from "../../hooks/useCloseModal";

export default function DeleteConfirmationModal({
  onClose,
  onConfirm,
  isLoading,
}) {
  useCloseModal(onClose);

  return (
    <div className="modal modal_opened">
      <div className="modal_type_confirmation">
        <p className="modal__text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__text">This action is irreversible.</p>

        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          onClick={() => onClose()}
        />
        <button
          className="modal__button modal__button_type_confirm"
          onClick={() => onConfirm()}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="modal__button modal__button_type_cancel"
          onClick={() => onClose()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
