import ModalWithForm from "./ModalWithForm";
import { useFormValidation } from "../hooks/useFormValidation.js";
import { useSaveContext } from "../hooks/useSaveContext.js";
import "./styles/RegisterModal.css";
import { signInPopupConfig } from "../utils/constants.js";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.js";

export default function RegisterModal({ data, onSubmit, loader }) {
  const { handleOpenModal } = useContext(AppContext);
  const { modalName } = data;
  const inputsNames = {
    userEmail: "",
    userPassword: "",
    userName: "",
    userAvatar: "",
  };
  const validator = useFormValidation(inputsNames);
  const { values, errors, isValid, handleInputChange, setInputs } = validator;

  useSaveContext(modalName, inputsNames, validator);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
    setInputs(inputsNames);
  };

  const handleSignIn = () => {
    handleOpenModal("form", signInPopupConfig);
  };

  const alternativeButton = () => {
    return (
      <button
        type="button"
        className="modal__button modal__button_type_alternative"
        onClick={handleSignIn}
      >
        or Log In
      </button>
    );
  };

  return (
    <ModalWithForm
      {...data}
      isValid={isValid}
      onSubmit={handleSubmit}
      loader={loader}
      alternativeButton={alternativeButton}
    >
      <label className="modal__label">
        Email*
        {errors?.["userEmail"] && (
          <span className="modal__error">{` (${errors["userEmail"]})`}</span>
        )}
        <input
          type="email"
          className="modal__input"
          id="userEmail"
          name="userEmail"
          value={values["userEmail"]}
          onChange={handleInputChange}
          placeholder="Email"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Password*
        {errors?.["userPassword"] && (
          <span className="modal__error">{` (${errors["userPassword"]})`}</span>
        )}
        <input
          type="password"
          className="modal__input"
          id="userPassword"
          name="userPassword"
          value={values["userPassword"]}
          onChange={handleInputChange}
          placeholder="Password"
          required
        />
      </label>
      <label className="modal__label">
        Name*
        {errors?.["userName"] && (
          <span className="modal__error">{` (${errors["userName"]})`}</span>
        )}
        <input
          type="text"
          className="modal__input"
          id="userName"
          name="userName"
          value={values["userName"]}
          onChange={handleInputChange}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        {errors?.["userAvatar"] && (
          <span className="modal__error">{` (${errors["userAvatar"]})`}</span>
        )}
        <input
          type="url"
          className="modal__input"
          id="userAvatar"
          name="userAvatar"
          value={values["userAvatar"]}
          onChange={handleInputChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}
