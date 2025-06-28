// const userData = { name: "Sergei Sushko", avatarLink: "" };
// const apiWeatherSettings = {
//   apiKey: "34fd1d64aea98a1cc3c53b2bddbe2e60",
//   endpoint: "https://api.openweathermap.org/data/2.5/weather",
// };
const location = {
  latitude: "32.8364",
  longitude: "35.0753",
};

const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
];

const addGarmentPopupConfig = {
  title: "New garment",
  buttonText: "Add garment",
  modalName: "add-garment",
  loadingText: "Saving...",
};

const signUpPopupConfig = {
  title: "Sign Up",
  buttonText: "Sign Up",
  modalName: "user-signup",
  loadingText: "Registering...",
};

const signInPopupConfig = {
  title: "Log In",
  buttonText: "Log In",
  modalName: "user-signin",
  loadingText: "Loggin in...",
};

const editProfilePopupConfig = {
  title: "Change profile data",
  buttonText: "Save changes",
  modalName: "profile-edit",
  loadingText: "Saving...",
};

export {
  location,
  addGarmentPopupConfig,
  signUpPopupConfig,
  signInPopupConfig,
  editProfilePopupConfig,
};
