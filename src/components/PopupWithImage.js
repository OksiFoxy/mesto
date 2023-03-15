import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._fullImage = this._popup.querySelector('.popup__full-image');
    this._fullImageTitle = this._popup.querySelector('.popup__full-name');
  }

// Переделанный openFullImage
  open(link, name) {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._fullImageTitle.textContent = name;
    super.open();
  }
}
