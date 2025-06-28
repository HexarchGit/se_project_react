import { useContext, useEffect } from "react";
import { FormContext } from "../contexts/FormContext";

export function useSaveContext(
  modalName,
  inputsNames,
  { refValues, refErrors, refIsValid, setInputs }
) {
  const { formContext, setFormContext } = useContext(FormContext);
  useEffect(() => {
    if (formContext?.[modalName]) {
      const inputs = {};
      const errors = {};
      for (const inputName in inputsNames) {
        inputs[inputName] = formContext[modalName]?.values[inputName] || "";
        errors[inputName] = formContext[modalName]?.errors[inputName] || "";
      }
      setInputs(inputs, errors, formContext[modalName]?.valid);
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
}
