import { useContext, useEffect } from "react";
import ModalWithForm from "../Modal/ModalWithForm";
import "./AddItemModal.css";
import { FormContext } from "../../contexts/FormContext";
import { useFormValidation } from "../../hooks/useFormValidation";

export default function AddItemModal({
  data,
  closeModal,
  handleAddItemSubmit,
  loader,
}) {
  const { modalName } = data;
  const inputsNames = { itemName: "", imageUrl: "", weather: "" };
  const { formContext, setFormContext } = useContext(FormContext);
  const {
    values,
    errors,
    isValid,
    refValues,
    refErrors,
    refIsValid,
    handleInputChange,
    resetForm,
  } = useFormValidation(inputsNames);

  useEffect(() => {
    if (formContext?.[modalName]) {
      resetForm(
        {
          itemName: formContext[modalName]?.values["itemName"] || "",
          imageUrl: formContext[modalName]?.values["imageUrl"] || "",
          weather: formContext[modalName]?.values["weather"] || "",
        },
        {
          itemName: formContext[modalName]?.errors["itemName"],
          imageUrl: formContext[modalName]?.errors["imageUrl"],
        },
        formContext[modalName]?.valid
      );
    }
    return () => {
      setFormContext({
        [modalName]: {
          values: refValues.current,
          errors: refErrors.current,
          valid: refIsValid.current,
        },
      });
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit({
      name: values["itemName"],
      imageUrl: values["imageUrl"],
      weather: values["weather"],
    });
    resetForm(inputsNames);
  };

  return (
    <ModalWithForm
      {...data}
      isValid={isValid}
      onClose={closeModal}
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
