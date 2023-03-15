import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
  }

// Cобирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._popupList.forEach((input) => this._formValues[input.name] = input.value);
    return this._formValues;
  }

// Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm 
// должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners()
    this._popupForm.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues())
        this.close();
    })
  }

// Перезаписывает родительский метод close, при закрытии попапа форма должна ещё и сбрасываться.
  close() {
    super.close();
    this._popupForm.reset();
  }
}