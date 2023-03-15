export default class Popup {
  constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._EscClose = this._handleEscClose.bind(this)
  }

  open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._EscClose);
  }

  close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._EscClose);
  }

  _handleEscClose(evt) {
      if (evt.key === `Escape`) {
          this.close();
      }
  }
// Тут работает оверлей, но не кнопка
  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
          this.close();
        }
      });
  }
// Проверка кнопки, тут работает
//   setEventListeners() {
//     this._buttonClose = this._popup.querySelector('.popup__close');
//     this._buttonClose.addEventListener('mousedown', () => this.close()); //Тут работает
//   }
}
