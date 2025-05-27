import "./Header.css";
import logo from "../../assets/logo.svg";
// import Userbar from "../Userbar/Userbar.jsx";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { addGarmentPopupConfig } from "../../utils/constants.js";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({
  location,
  userData,
  handleOpenModal,
  // isMobileMenuOpened,
  // mobileMenuHandler,
}) {
  function Userbar({ name = "", link = "" }) {
    return (
      <div className="header__userbar">
        <Link to="/profile" className="header__link">
          <div className="header__tooltip">{name}</div>
        </Link>
        {link ? (
          <img
            className="header__avatar header__avatar_image"
            src={link}
            alt="Avatar"
          />
        ) : (
          <div className="header__avatar header__avatar_default">
            {name?.[0]?.toUpperCase()}
          </div>
        )}
      </div>
    );
  }

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleAddButton = () => {
    handleOpenModal("form", addGarmentPopupConfig);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    location && (
      <header className="header">
        <div className="header__left-side">
          <Link to="/" className="header__link">
            <img className="header__logo" src={logo} alt="Logo" />
          </Link>
          <p className="header__location">{`${currentDate}, ${location}`}</p>
        </div>
        <button
          type="button"
          className="header__button header__button_type_hamburger"
          onClick={mobileMenuHandler}
        />
        <div
          className="header__right-side"
          // className={
          //   isMobileMenuOpened
          //     ? "header__right-side_mobile"
          //     : "header__right-side"
          // }
        >
          <ToggleSwitch />
          <button
            className="header__button header__button_type_add"
            type="button"
            onClick={handleAddButton}
          >
            + Add clothes
          </button>
          <Userbar name={userData.name} link={userData.avatarLink} />
        </div>
        {isMobileMenuOpened && (
          <div className="header__right-side_mobile">
            <button
              type="button"
              className="header__button header__button_type_close"
              onClick={mobileMenuHandler}
            />
            <Userbar name={userData.name} link={userData.avatarLink} />
            <button
              className="header__button header__button_type_add"
              type="button"
              onClick={handleAddButton}
            >
              + Add clothes
            </button>
            <ToggleSwitch />
          </div>
        )}
      </header>
    )
  );
}

export default Header;
