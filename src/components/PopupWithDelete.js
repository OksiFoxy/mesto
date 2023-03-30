import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { cardDelete }, formDelete) {
    super(popupSelector);
    this._deleteCallback = cardDelete;
    this._formDelete = formDelete;
    this._cardElement = {};
  }

  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }

// Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  setEventListeners() {
    super.setEventListeners();
    this._formDelete.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._deleteCallback(this._cardElement);
    });
  }
}
