import "./styles/ToggleSwitch.css";
import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext.js";
import { useContext } from "react";

export default function ToggleSwitch() {
  const { currentTempUnit, setCurrentTempUnit } = useContext(
    CurrentTempUnitContext
  );

  const handleChangeTempUnit = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };
  return (
    <label className="toggler">
      <p
        className={`toggler__text ${
          currentTempUnit === "F" ? "toggler__active" : ""
        }`}
      >
        F
      </p>
      <p
        className={`toggler__text ${
          currentTempUnit !== "F" ? "toggler__active" : ""
        }`}
      >
        C
      </p>
      <input
        type="checkbox"
        className="toggler__input"
        onChange={handleChangeTempUnit}
      />
      <span className="toggler__switch" />
    </label>
  );
}
