import ModalWithForm from "./ModalWithForm";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSaveContext } from "../hooks/useSaveContext";
import "./styles/EditProfileModal.css";
import { useEffect } from "react";

export default function EditProfileModal({ data, onSubmit, loader, user }) {
  const { modalName } = data;
  const inputsNames = {
    userName: "",
    userAvatar: "",
  };
  const validator = useFormValidation(inputsNames);
  const { values, errors, isValid, handleInputChange, setInputs } = validator;

  useSaveContext(modalName, inputsNames, validator);

  useEffect(() => {
    setInputs({
      userName: user.name,
      userAvatar: user.avatar,
    });
  }, [user]);

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
