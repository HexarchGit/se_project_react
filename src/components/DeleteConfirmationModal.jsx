import "./styles/DeleteConfirmationModal.css";
import useCloseModal from "../hooks/useCloseModal";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function DeleteConfirmationModal({ onConfirm, isLoading }) {
  const { handleCloseModal } = useContext(AppContext);
  useCloseModal(handleCloseModal);

  return (
    <div className="modal modal_opened">
      <div className="modal_type_confirmation">
        <p className="modal__text">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__text">This action is irreversible.</p>

        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          onClick={() => handleCloseModal()}
        />
        <button
          className="modal__button modal__button_type_confirm"
          onClick={() => onConfirm()}
        >
          {isLoading ? "Deleting..." : "Yes, delete item"}
        </button>
        <button
          className="modal__button modal__button_type_cancel"
          onClick={() => handleCloseModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
