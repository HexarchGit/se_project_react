import { useEffect, useRef, useState } from "react";

import("./modal.css");

function ItemModal({ item, closeHandler }) {
  const [mount, setMount] = useState(false);
  const itemRef = useRef("");

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
    if (itemRef.current && !itemRef.current.contains(event.target)) {
      closeHandler();
    }
  };

  return (
    <div
      className={`modal ${mount && "modal_opened"}`}
      onMouseDown={handleMouseClose}
    >
      <div className="modal_type_card" ref={itemRef}>
        <button
          className="modal__button modal__button_type_close modal__button_theme_white"
          onClick={closeHandler}
        ></button>
        <img src={item.link} alt={item.name} className="modal__image" />
        <div className="modal__info">
          <p className="modal__text modal__text_type_name">{item.name}</p>
          <p className="modal__text modal__text_type_weather">
            Weather: {item.weather}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
