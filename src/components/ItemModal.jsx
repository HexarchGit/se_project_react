import { useContext, useEffect, useRef, useState } from "react";
import useCloseModal from "../hooks/useCloseModal.js";
import "./styles/ItemModal.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";

function ItemModal({ item, onDelete }) {
  const [mountedModal, setMountedModal] = useState(false);
  const { handleCloseModal } = useContext(AppContext);
  const { userData } = useContext(CurrentUserContext);
  // const itemRef = useRef("");

  useEffect(() => {
    setMountedModal(true);
  }, []);

  const handleDelete = () => {
    onDelete(item);
  };

  useCloseModal(handleCloseModal);

  return (
    <div className={`modal ${mountedModal && "modal_opened"}`}>
      {/* <div className="modal_type_card" ref={itemRef}> */}
      <div className="modal_type_card">
        <button
          type="button"
          className="modal__button modal__button_type_close modal__button_theme_white"
          onClick={handleCloseModal}
        ></button>
        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__info">
          <p className="modal__text modal__text_type_name">{item.name}</p>
          <p className="modal__text modal__text_type_weather">
            Weather: {item.weather}
          </p>
        </div>
        {item.owner === userData?._id && (
          <button
            className="modal__button modal__button_type_delete"
            type="button"
            onClick={handleDelete}
          >
            Delete item
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
