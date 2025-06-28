import "./styles/Header.css";
import logo from "../assets/logo.svg";
import ToggleSwitch from "./ToggleSwitch.jsx";
import {
  addGarmentPopupConfig,
  signUpPopupConfig,
  signInPopupConfig,
} from "../utils/constants.js";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";

function Header({ location }) {
  const { handleOpenModal } = useContext(AppContext);
  const { userData } = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const handleAddButton = () => {
    handleOpenModal("form", addGarmentPopupConfig);
  };

  const handleSignUp = () => {
    handleOpenModal("form", signUpPopupConfig);
  };

  const handleSignIn = () => {
    handleOpenModal("form", signInPopupConfig);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const addClothButton = () => {
    return (
      <button
        className="header__button"
        type="button"
        onClick={handleAddButton}
      >
        + Add clothes
      </button>
    );
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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

  function GuestEntry() {
    return (
      <div className="header__guest">
        <button className="header__button" type="button" onClick={handleSignUp}>
          Sign up
        </button>
        <button className="header__button" type="button" onClick={handleSignIn}>
          Log in
        </button>
      </div>
    );
  }

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
        <div className="header__right-side">
          <ToggleSwitch />
          {userData ? (
            <>
              {addClothButton()}
              <Userbar name={userData.name} link={userData.avatar} />
            </>
          ) : (
            GuestEntry()
          )}
        </div>
        {isMobileMenuOpened && (
          <div className="header__right-side_mobile">
            <button
              type="button"
              className="header__button header__button_type_close"
              onClick={mobileMenuHandler}
            />
            {userData ? (
              <>
                <Userbar name={userData.name} link={userData.avatarLink} />
                {addClothButton()}
              </>
            ) : (
              GuestEntry()
            )}
            <ToggleSwitch />
          </div>
        )}
      </header>
    )
  );
}

export default Header;
