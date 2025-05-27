import { useEffect, useRef, useState } from "react";
import useCloseModal from "../../utils/useCloseModal.js";
import "./modal.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  modalName,
  onClose,
  onSubmit,
}) {
  const [mountedModal, setMountedModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef();

  const handleInput = () => {
    setIsFormValid(formRef.current.checkValidity());
  };

  useEffect(() => {
    setMountedModal(true);
  }, []);

  useCloseModal(onClose);

  return (
    <div className={`modal ${mountedModal && "modal_opened"}`}>
      <div className={`modal_type_${modalName}`}>
        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          type="button"
          onClick={onClose}
        />
        <form
          onSubmit={onSubmit}
          className="modal__form"
          name={modalName}
          ref={formRef}
          onInput={handleInput}
        >
          <h2 className="modal__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`modal__button modal__button_type_submit ${
              !isFormValid && "modal__button_disabled"
            }`}
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
