import { useEffect, useRef, useState } from "react";

import "./modal.css";

function ModalWithForm({
  children,
  title,
  buttonText,
  modalName,
  closeHandler,
}) {
  const [mount, setMount] = useState(false);
  //to the future validations check
  const [isValid, setIsValid] = useState(true);
  const modalRef = useRef("");
  const formRef = useRef("");

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") closeHandler();
    };
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);

  const handleMouseClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeHandler();
    }
  };
  return (
    <div
      className={`modal ${mount && "modal_opened"}`}
      onMouseDown={handleMouseClose}
    >
      <div className={`modal_type_${modalName}`} ref={modalRef}>
        <button
          className="modal__button modal__button_type_close modal__button_theme_gray"
          type="button"
          onClick={closeHandler}
        ></button>
        <form className="modal__form" name={modalName} ref={formRef}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`modal__button modal__button_type_submit ${
              !isValid && "modal__button_disabled"
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
