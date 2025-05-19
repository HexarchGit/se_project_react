import { useEffect, useRef, useState } from "react";
import useCloseModal from "./useCloseModal";

import "./modal.css";

function ItemModal({ item, onClose }) {
  const [mount, setMount] = useState(false);
  const itemRef = useRef("");

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    useCloseModal(onClose);
  }, []);

  return (
    <div className={`modal ${mount && "modal_opened"}`}>
      <div className="modal_type_card" ref={itemRef}>
        <button
          className="modal__button modal__button_type_close modal__button_theme_white"
          onClick={onClose}
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
