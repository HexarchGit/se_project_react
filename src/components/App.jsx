import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./styles/App.css";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Profile from "./Profile.jsx";
import Footer from "./Footer.jsx";
import AddItemModal from "./AddItemModal.jsx";
import ItemModal from "./ItemModal.jsx";
import DeleteConfirmationModal from "./DeleteConfirmationModal.jsx";
import RegisterModal from "./RegisterModal.jsx";
import LoginModal from "./LoginModal.jsx";
import EditProfileModal from "./EditProfileModal.jsx";

import weatherApi from "../utils/weatherApi.js";
import { getApiDb } from "../utils/apiDb.js";
import { location } from "../utils/constants.js";
import { signup, signin, checkAuth } from "../utils/auth.js";
import { setToken, getToken, removeToken } from "../utils/token.js";

import { CurrentTempUnitContext } from "../contexts/CurrentTempUnitContext.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { FormContext } from "../contexts/FormContext.js";
import { AppContext } from "../contexts/AppContext.js";

import { useFormContextCleaner } from "../hooks/useCleanFormContext.js";

function App() {
  const WEATHER_API_ENDPOINT =
    import.meta.env.VITE_WEATHER_API_ENDPOINT ||
    "https://api.openweathermap.org/data/2.5/weather";
  const WEATHER_API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY || "34fd1d64aea98a1cc3c53b2bddbe2e60";
  const apiDb = getApiDb();
  const [weatherData, setWeatherData] = useState([]);
  const [modalActive, setModalActive] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [formContext, setFormContext] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [userData, setUserData] = useState(null);
  const cleanFormContext = useFormContextCleaner(setFormContext);
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsAuthChecked(true);
      return;
    }
    checkAuth(jwt)
      .then((response) => {
        setIsLoggedIn(true);
        setUserData(response);
        setIsAuthChecked(true);
      })
      .catch((error) => {
        console.error(`Initial auth check failed: ${error}`);
        removeToken();
        setIsAuthChecked(true);
      });
  }, []);

  useEffect(() => {
    apiDb
      .getItems()
      .then((result) => {
        setClothingItems(result.reverse());
      })
      .catch((error) => console.error(`Failed to GET: ${error}`));
  }, []);

  useEffect(() => {
    weatherApi(
      { endpoint: WEATHER_API_ENDPOINT, apiKey: WEATHER_API_KEY },
      location
    )
      .then((data) => setWeatherData(data))
      .catch((error) =>
        console.error(`Error fetching API data, error: ${error}`)
      );
  }, []);

  const updateCards = (updatedCard) => {
    setClothingItems((cards) =>
      cards.map((item) => (item._id === updatedCard._id ? updatedCard : item))
    );
  };

  const handleOpenModal = (type, data) => {
    setModalActive({ type, data });
  };

  const handleCloseModal = () => {
    setModalActive({});
  };

  const handleAddItemSubmit = async (submitData) => {
    cleanFormContext("add-garment");
    setIsLoading(true);
    const addItemData = {
      name: submitData["itemName"],
      imageUrl: submitData["imageUrl"],
      weather: submitData["weather"],
    };
    try {
      const response = await apiDb.addItem(getToken(), addItemData);
      setClothingItems((prev) => [response, ...prev]);
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to add item: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async ({ email, password }) => {
    const { token } = await signin({
      email,
      password,
    });
    setToken(token);
    setIsLoggedIn(true);
    const user = await checkAuth(token);
    setUserData(user);
    handleCloseModal();
  };

  const handleRegisterSubmit = async (submitData) => {
    cleanFormContext("user-signup");
    setIsLoading(true);
    const signupData = {
      name: submitData["userName"],
      email: submitData["userEmail"],
      password: submitData["userPassword"],
      avatar: submitData["userAvatar"],
    };
    try {
      await signup(signupData);
      await handleSignIn(signupData);
    } catch (error) {
      console.error(`Failed to register and/or signin after: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (submitData) => {
    cleanFormContext("user-signin");
    setIsLoading(true);
    const signinData = {
      email: submitData["signinUserEmail"],
      password: submitData["signinUserPassword"],
    };
    try {
      await handleSignIn(signinData);
    } catch (error) {
      console.error(`Failed to sign in: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setUserData(null);
    navigate("/");
  };

  const handleDeleteGarment = (garment) => {
    setModalActive({ type: "confirm", data: garment });
  };

  const handleConfirmation = async () => {
    setIsLoading(true);
    try {
      await apiDb.deleteItem(getToken(), modalActive.data._id);
      setClothingItems((prev) =>
        prev.filter((item) => item._id !== modalActive.data._id)
      );
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to delete: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSubmit = async (submitData) => {
    setIsLoading(true);
    const editData = {
      name: submitData["editUserName"] || user.name,
      avatar: submitData["editUserAvatar"] || user.avatar,
    };
    try {
      const user = await apiDb.updateUserProfile(getToken(), editData);
      setUserData(user);
      handleCloseModal();
    } catch (error) {
      console.error(`Failed to update user profile: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardLike = (id, isLiked) => {
    const token = getToken();
    isLiked
      ? apiDb
          .removeCardLike(token, id)
          .then((card) => updateCards(card))
          .catch((error) => console.error(`Failed remove like: ${error}`))
      : apiDb
          .addCardLike(token, id)
          .then((card) => updateCards(card))
          .catch((error) => console.error(`Failed add like: ${error}`));
  };

  return (
    <section className="page">
      <div className="page__content">
        <AppContext.Provider
          value={{ handleCloseModal, handleOpenModal, handleCardLike }}
        >
          <CurrentUserContext.Provider
            value={{ userData, isLoggedIn, isAuthChecked }}
          >
            <CurrentTempUnitContext.Provider
              value={{ currentTempUnit, setCurrentTempUnit }}
            >
              <Header location={weatherData?.location} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main weather={weatherData} cardsData={clothingItems} />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        clothesData={clothingItems}
                        onLogOut={handleLogOut}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </CurrentTempUnitContext.Provider>
            {modalActive.type === "card" && (
              <ItemModal
                item={modalActive.data}
                onDelete={handleDeleteGarment}
              />
            )}
          </CurrentUserContext.Provider>
          {modalActive.type === "form" && (
            <FormContext.Provider value={{ formContext, setFormContext }}>
              {modalActive.data.modalName === "add-garment" && (
                <AddItemModal
                  data={modalActive.data}
                  onSubmit={handleAddItemSubmit}
                  loader={{
                    isLoading,
                    loadingText: modalActive.data.loadingText,
                  }}
                />
              )}
              {modalActive.data.modalName === "user-signup" && (
                <RegisterModal
                  data={modalActive.data}
                  onSubmit={handleRegisterSubmit}
                  loader={{
                    isLoading,
                    loadingText: modalActive.data.loadingText,
                  }}
                />
              )}
              {modalActive.data.modalName === "user-signin" && (
                <LoginModal
                  data={modalActive.data}
                  onSubmit={handleLoginSubmit}
                  loader={{
                    isLoading,
                    loadingText: modalActive.data.loadingText,
                  }}
                />
              )}
              {modalActive.data.modalName === "profile-edit" && (
                <EditProfileModal
                  data={modalActive.data}
                  onSubmit={handleEditSubmit}
                  loader={{
                    isLoading,
                    loadingText: modalActive.data.loadingText,
                  }}
                  user={userData}
                />
              )}
            </FormContext.Provider>
          )}
          {modalActive.type === "confirm" && (
            <DeleteConfirmationModal
              onConfirm={handleConfirmation}
              isLoading={isLoading}
            />
          )}
          <Footer />
        </AppContext.Provider>
      </div>
    </section>
  );
}

export default App;
