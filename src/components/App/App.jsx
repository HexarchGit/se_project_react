import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import weatherApi from "../../utils/weatherApi";
import {
  apiWeatherSettings,
  location,
  apiDbSettings,
} from "../../utils/constants.js";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext.js";
import Profile from "../Profile/Profile.jsx";
import { userData } from "../../utils/constants.js";
import { FormContext } from "../../contexts/FormContext.js";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import Api from "../../utils/api.js";

function App() {
  // const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);
  const [modalActive, setModalActive] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [formContext, setFormContext] = useState({});
  const [clothingItems, setClothingItems] = useState();
  const apiDb = new Api(apiDbSettings);
  useEffect(() => {
    apiDb
      .getItems()
      .then((result) => {
        setClothingItems(result);
      })
      .catch((error) => console.error(`Failed to GET: ${error}`));
  }, []);

  // const mobileMenuHandler = () => {
  //   setIsMobileMenuOpened(!isMobileMenuOpened);
  // };

  const cleanFormContext = (formName) => {
    setFormContext((oldContext) => {
      const { [formName]: _, ...context } = oldContext;
      return context;
    });
  };

  const handleOpenModal = (type, data) => {
    setModalActive({ type, data });
  };

  const handleAddItemSubmit = (addItemData) => {
    cleanFormContext("add-garment");
    apiDb.addItem(addItemData).then((response) => {
      setClothingItems([...clothingItems, response]);
    });
  };

  const handleDeleteGarment = (garment) => {
    setModalActive({ type: "confirm", data: garment });
  };

  const handleConfirmation = () => {
    apiDb
      .deleteItem(modalActive.data._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== modalActive.data._id)
        );
      })
      .catch((error) => console.error(`Failed to delete: ${error}`));
  };

  const closeModal = () => {
    setModalActive({});
  };

  useEffect(() => {
    weatherApi(apiWeatherSettings, location)
      .then((data) => setWeatherData(data))
      .catch((error) =>
        console.error(`Error fetching API data, error: ${error}`)
      );
  }, []);

  return (
    <section className="page">
      <div className="page__content">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, setCurrentTempUnit }}
        >
          <Header
            location={weatherData?.location}
            userData={userData}
            handleOpenModal={handleOpenModal}
            // isMobileMenuOpened={isMobileMenuOpened}
            // mobileMenuHandler={mobileMenuHandler}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weather={weatherData}
                  handleOpenModal={handleOpenModal}
                  cardsData={clothingItems}
                  // isMobileMenuOpened={isMobileMenuOpened}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  userData={userData}
                  clothesData={clothingItems}
                  handleOpenModal={handleOpenModal}
                />
              }
            />
          </Routes>
        </CurrentTempUnitContext.Provider>

        {modalActive.type === "form" && (
          <FormContext.Provider value={{ formContext, setFormContext }}>
            <AddItemModal
              data={modalActive.data}
              closeModal={closeModal}
              handleAddItemSubmit={handleAddItemSubmit}
            />
          </FormContext.Provider>
        )}
        {modalActive.type === "card" && (
          <ItemModal
            item={modalActive.data}
            onClose={closeModal}
            onDelete={handleDeleteGarment}
          />
        )}
        {modalActive.type === "confirm" && (
          <DeleteConfirmationModal
            onClose={closeModal}
            onConfirm={handleConfirmation}
          />
        )}
        <Footer />
      </div>
    </section>
  );
}

export default App;
