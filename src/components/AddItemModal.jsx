import ModalWithForm from "./ModalWithForm";
import "./styles/AddItemModal.css";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSaveContext } from "../hooks/useSaveContext";

export default function AddItemModal({ data, onSubmit, loader }) {
  const { modalName } = data;
  const inputsNames = { itemName: "", imageUrl: "", weather: "" };
  const validator = useFormValidation(inputsNames);
  const { values, errors, isValid, handleInputChange, setInputs } = validator;

  useSaveContext(modalName, inputsNames, validator);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
    setInputs(inputsNames);
  };

  return (
    <ModalWithForm
      {...data}
      isValid={isValid}
      onSubmit={handleSubmit}
      loader={loader}
    >
      <label className="modal__label">
        Name*
        {errors?.["itemName"] && (
          <span className="modal__error">{` (${errors["itemName"]})`}</span>
        )}
        <input
          type="text"
          className="modal__input"
          id="itemName"
          name="itemName"
          value={values["itemName"]}
          onChange={handleInputChange}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Image*
        {errors?.["imageUrl"] && (
          <span className="modal__error">{` (${errors["imageUrl"]})`}</span>
        )}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          value={values["imageUrl"]}
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
            checked={values["weather"] === "hot"}
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
            checked={values["weather"] === "warm"}
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
            checked={values["weather"] === "cold"}
            required
          />
          <span className="modal__radio_visible"></span>
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
