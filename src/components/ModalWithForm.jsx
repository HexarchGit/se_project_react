import { useContext, useEffect, useRef, useState } from "react";
import useCloseModal from "../hooks/useCloseModal.js";
import "./styles/modal.css";
import { AppContext } from "../contexts/AppContext.js";

function ModalWithForm({
  children,
  title,
  buttonText,
  modalName,
  onSubmit,
  isValid,
  loader,
  alternativeButton = null,
}) {
  const { handleCloseModal } = useContext(AppContext);
  const [mountedModal, setMountedModal] = useState(false);
  const formRef = useRef();

  const { isLoading, loadingText } = loader;

  useEffect(() => {
    setMountedModal(true);
  }, []);

  useCloseModal(handleCloseModal);

  return (
    <div className={`modal ${mountedModal && "modal_opened"}`}>
      <div className={`modal_type_${modalName}`}>
        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          type="button"
          onClick={handleCloseModal}
        />
        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={modalName}
          ref={formRef}
        >
          <h2 className="modal__title">{title}</h2>
          {children}
          <div className="modal__buttons">
            <button
              type="submit"
              className={`modal__button modal__button_type_submit ${
                !isValid && "modal__button_disabled"
              }`}
              disabled={!isValid}
            >
              {isLoading ? loadingText : buttonText}
            </button>
            {alternativeButton && alternativeButton()}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
