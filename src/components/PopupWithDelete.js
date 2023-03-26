import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, { cardDelete }) {
    super(popupSelector);
    this._deleteCallback = cardDelete;
  }

  open(cardId, cardElement) {
    this._cardId = cardId;
    this._cardElement = cardElement;
    super.open();
  }

// Навешиваем обработчики на кнопку подтверждения, наследуем из родителя остальные
  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener('click', () => this._deleteCallback(this._cardId, this._cardElement))
  }
}
