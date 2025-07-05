import ModalWithForm from "./ModalWithForm";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSaveContext } from "../hooks/useSaveContext";
import "./styles/EditProfileModal.css";
import { useEffect } from "react";

export default function EditProfileModal({ data, onSubmit, loader, user }) {
  const { modalName } = data;
  const inputsNames = {
    editUserName: "",
    editUserAvatar: "",
  };
  const validator = useFormValidation(inputsNames);
  const { values, errors, isValid, handleInputChange, setInputs } = validator;

  useSaveContext(modalName, inputsNames, validator);

  useEffect(() => {
    setInputs({
      editUserName: user.name,
      editUserAvatar: user.avatar,
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
        {errors?.["editUserName"] && (
          <span className="modal__error">{` (${errors["editUserName"]})`}</span>
        )}
        <input
          type="text"
          className="modal__input"
          id="editUserName"
          name="editUserName"
          value={values["editUserName"]}
          onChange={handleInputChange}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        {errors?.["editUserAvatar"] && (
          <span className="modal__error">{` (${errors["editUserAvatar"]})`}</span>
        )}
        <input
          type="url"
          className="modal__input"
          id="editUserAvatar"
          name="editUserAvatar"
          value={values["editUserAvatar"]}
          onChange={handleInputChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}
