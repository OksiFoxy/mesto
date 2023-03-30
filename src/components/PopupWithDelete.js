import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { cardDelete }, formDelete) {
    super(popupSelector);
    this._deleteCallback = cardDelete;
    this._submitButton = this._popup.querySelector('.popup__submit-button');
    this._popupForm = this._popup.querySelector('.popup__form');
  }

  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }

// Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  // setEventListeners() {
  //   super.setEventListeners();
  //   this._submitButton.addEventListener('click', () =>
  //   this._deleteCallback(this._cardId, this._cardElement))
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCallback(this._cardId, this._cardElement);
    })
  }

  proccessActionButtonText() {
    this._submitButton.textContent = `Удаляем`;
  }

  finalActionButtonText() {
    this._submitButton.textContent = `Готово`;
  }
}
