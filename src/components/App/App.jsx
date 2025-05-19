import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../Modal/ModalWithForm.jsx";
import ItemModal from "../Modal/ItemModal.jsx";
import weatherApi from "../../utils/weatherApi";
import {
  apiSettings,
  location,
  defaultClothingItems,
} from "../../utils/constants.js";
import AddGarmentForm from "../Forms/AddGarmentModal.jsx";

function App() {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [weatherData, setWeatherData] = useState(undefined);
  const [modalActive, setModalActive] = useState({});

  const mobileMenuHandler = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleOpenModal = (type, data) => {
    setModalActive({ type, data });
  };

  const closeModal = () => {
    setModalActive({});
  };

  useEffect(() => {
    weatherApi(apiSettings, location)
      .then((data) => setWeatherData(data))
      .catch((error) =>
        console.error(`Error fetching API data, error: ${error}`)
      );
  }, []);

  return (
    <section className="page">
      <div className="page__content">
        <Header
          location={weatherData?.location}
          handleOpenModal={handleOpenModal}
          isMobileMenuOpened={isMobileMenuOpened}
          mobileMenuHandler={mobileMenuHandler}
        />
        <Main
          weather={weatherData}
          handleCardClick={handleOpenModal}
          cardsData={defaultClothingItems}
          isMobileMenuOpened={isMobileMenuOpened}
        />
        {modalActive.type === "form" && (
          <ModalWithForm {...modalActive.data} onClose={closeModal}>
            <AddGarmentForm />
          </ModalWithForm>
        )}
        {modalActive.type === "card" && (
          <ItemModal item={modalActive.data} onClose={closeModal} />
        )}
        <Footer />
      </div>
    </section>
  );
}

export default App;
