import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
    this._submitButton = this._popup.querySelector('.popup__submit-button');
  }

  _getInputValues() {
    this._formValues = {};
    this._popupList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setInputValues(profileData) {
    this._popupList.forEach((input) => input.value = profileData[input.name]);
  }

  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  actionProccessButtonText() {
    this._submitButton.textContent = `Сохраняем`;
  }

  actionFinalButtonText() {
    this._submitButton.textContent = `Готово`;
  }
}
