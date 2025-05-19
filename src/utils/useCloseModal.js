export default function useCloseModal(onClose) {
  const handleEscClose = (event) => {
    if (event.key === "Escape") {
      console.log("Mount off");
      onClose();
      document.removeEventListener("keydown", handleEscClose);
    }
  };
  const handleMouseClose = (event) => {
    if (event.target.classList.contains("modal")) {
      console.log("Mount off");
      onClose();
      document.removeEventListener("mousedown", handleMouseClose);
    }
  };
  console.log("Mount on");
  document.addEventListener("keydown", handleEscClose);
  document.addEventListener("mousedown", handleMouseClose);
}
