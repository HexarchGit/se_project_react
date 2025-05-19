import "./Header.css";
import logo from "../../assets/logo.svg";
import { userData } from "../../utils/constants.js";
import UserProfile from "../UserProfile/UserProfile";

function Header({
  location,
  handleOpenModal,
  isMobileMenuOpened,
  mobileMenuHandler,
}) {
  const handleAddButton = () => {
    handleOpenModal("form", {
      title: "New garment",
      buttonText: "Add garment",
      modalName: "add-garment",
    });
  };

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    location && (
      <header className="header">
        {!isMobileMenuOpened && (
          <>
            <div className="header__left-side">
              <img className="header__logo" src={logo} alt="Logo" />
              <p className="header__location">{`${currentDate}, ${location}`}</p>
            </div>
            <button
              type="button"
              className="header__button header__button_type_hamburger"
              onClick={mobileMenuHandler}
            />
          </>
        )}
        <div
          className={
            isMobileMenuOpened
              ? "header__right-side_mobile"
              : "header__right-side"
          }
        >
          {isMobileMenuOpened ? (
            <>
              <button
                type="button"
                className="header__button headel__button_type_close"
                onClick={mobileMenuHandler}
              />
              <UserProfile name={"Sergei Sushko"} link={userData.avatarLink} />
              <button
                className="header__button header__button_type_add"
                type="button"
                onClick={handleAddButton}
              >
                + Add clothes
              </button>
            </>
          ) : (
            <>
              <button
                className="header__button header__button_type_add"
                type="button"
                onClick={handleAddButton}
              >
                + Add clothes
              </button>
              <UserProfile name={"Sergei Sushko"} link={userData.avatarLink} />
            </>
          )}
        </div>
      </header>
    )
  );
}

export default Header;
