import { useContext, useEffect, useState } from "react";
import ModalWithForm from "../Modal/ModalWithForm";
import "./AddItemModal.css";
import { FormContext } from "../../contexts/FormContext";

export default function AddItemModal({
  data,
  closeModal,
  handleAddItemSubmit,
}) {
  const { modalName } = data;
  const { formContext, setFormContext } = useContext(FormContext);
  const [nameinput, setNameInput] = useState({
    value: formContext?.[modalName]?.["itemName"]?.value || "",
    error: formContext?.[modalName]?.["itemName"]?.error || "",
  });
  const [imageUrlinput, setImageUrlInput] = useState({
    value: formContext?.[modalName]?.["imageUrl"]?.value || "",
    error: formContext?.[modalName]?.["imageUrl"]?.error || "",
  });
  const [weatherinput, setWeatherInput] = useState("");

  useEffect(() => {
    return () => {
      setFormContext({
        [modalName]: {
          itemName: nameinput,
          imageUrl: imageUrlinput,
        },
      });
    };
  }, []);

  const handleInputChange = (event) => {
    if (event.target.name === "itemName")
      setNameInput({
        value: event.target.value,
        error: event.target.validationMessage,
      });
    if (event.target.name === "imageUrl")
      setImageUrlInput({
        value: event.target.value,
        error: event.target.validationMessage,
      });
    if (event.target.name === "weather") setWeatherInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit({
      name: nameinput.value,
      imageUrl: imageUrlinput.value,
      weather: weatherinput,
    });
    closeModal();
  };
  return (
    <ModalWithForm {...data} onClose={closeModal} onSubmit={handleSubmit}>
      <label className="modal__label">
        Name*
        {nameinput.error && (
          <span className="modal__error">{` (${nameinput.error})`}</span>
        )}
        <input
          type="text"
          className="modal__input"
          id="itemName"
          name="itemName"
          value={nameinput.value}
          onChange={handleInputChange}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Image*
        {imageUrlinput.error && (
          <span className="modal__error">{` (${imageUrlinput.error})`}</span>
        )}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          value={imageUrlinput.value}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
      </label>
      <fieldset className="modal__radios">
        <legend className="modal__legend">Select the weather type*:</legend>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="hot"
            name="weather"
            onChange={handleInputChange}
            value="hot"
            checked={weatherinput === "hot"}
            required
          />
          <span className="modal__radio_visible"></span>
          Hot
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="warm"
            name="weather"
            onChange={handleInputChange}
            value="warm"
            checked={weatherinput === "warm"}
            required
          />
          <span className="modal__radio_visible"></span>
          Warm
        </label>
        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="cold"
            name="weather"
            onChange={handleInputChange}
            value="cold"
            checked={weatherinput === "cold"}
            required
          />
          <span className="modal__radio_visible"></span>
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
