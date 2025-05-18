export default function AddGarmentForm() {
  return (
    <>
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="add-name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
        {/* <span className="modal__error add-name-error"></span> */}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="add-imageUrl"
          placeholder="Image URL"
          required
        />
        {/* <span className="modal__error add-imageUrl-error"></span> */}
      </label>
      <fieldset className="modal__radios">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="hot"
            name="weather"
          />
          <span className="modal__radio_visible"></span>
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="warm"
            name="weather"
          />
          <span className="modal__radio_visible"></span>
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio"
            id="cold"
            name="weather"
          />
          <span className="modal__radio_visible"></span>
          Cold
        </label>
      </fieldset>
    </>
  );
}
